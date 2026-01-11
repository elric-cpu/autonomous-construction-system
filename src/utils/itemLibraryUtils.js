import { supabase } from '@/lib/customSupabaseClient';

// Helper to update library from receipt items
export const updateItemLibraryFromReceipt = async (receiptId, lineItems, vendorName, receiptDate) => {
  if (!lineItems || lineItems.length === 0) return { added: 0, updated: 0 };

  let added = 0;
  let updated = 0;

  for (const item of lineItems) {
    if (!item.item_name) continue;

    try {
      // 1. Check if item exists
      const { data: existingItem } = await supabase
        .from('items')
        .select('*')
        .eq('item_name', item.item_name)
        .single();

      const unitCost = parseFloat(item.unit_cost) || 0;

      if (existingItem) {
        // Update existing item
        const newCount = (existingItem.purchase_count || 0) + 1;
        const newMin = Math.min(existingItem.min_unit_cost || unitCost, unitCost);
        const newMax = Math.max(existingItem.max_unit_cost || unitCost, unitCost);
        
        // Simple moving average calculation could be improved, but this works for now
        // Weighted average: ((old_avg * old_count) + new_cost) / new_count
        const oldTotal = (existingItem.average_unit_cost || 0) * (existingItem.purchase_count || 0);
        const newAvg = (oldTotal + unitCost) / newCount;

        await supabase
          .from('items')
          .update({
            last_unit_cost: unitCost,
            average_unit_cost: newAvg,
            min_unit_cost: newMin,
            max_unit_cost: newMax,
            last_purchased_date: receiptDate,
            purchase_count: newCount,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingItem.id);
        
        // Add history entry
        await supabase.from('item_price_history').insert({
          item_id: existingItem.id,
          vendor_name: vendorName,
          unit_cost: unitCost,
          purchase_date: receiptDate,
          receipt_id: receiptId
        });

        updated++;
      } else {
        // Create new item
        const { data: newItem, error } = await supabase
          .from('items')
          .insert({
            item_name: item.item_name,
            category: 'Uncategorized', // Default
            vendor_name: vendorName, // Preferred vendor (last used)
            last_unit_cost: unitCost,
            average_unit_cost: unitCost,
            min_unit_cost: unitCost,
            max_unit_cost: unitCost,
            last_purchased_date: receiptDate,
            purchase_count: 1
          })
          .select()
          .single();

        if (!error && newItem) {
          // Add history entry
          await supabase.from('item_price_history').insert({
            item_id: newItem.id,
            vendor_name: vendorName,
            unit_cost: unitCost,
            purchase_date: receiptDate,
            receipt_id: receiptId
          });
          added++;
        }
      }
    } catch (err) {
      console.error(`Error processing item ${item.item_name}:`, err);
    }
  }

  return { added, updated };
};

// Search algorithm for suggestions
export const searchItemLibrary = async (keyword) => {
  if (!keyword || keyword.length < 2) return [];

  const { data, error } = await supabase
    .from('items')
    .select('*')
    .ilike('item_name', `%${keyword}%`)
    .order('purchase_count', { ascending: false }) // Prefer frequently used
    .limit(10);

  if (error) {
    console.error('Error searching items:', error);
    return [];
  }

  return data;
};

// Check for price variance
export const checkPriceVariance = (item, currentPrice) => {
  if (!item || !item.average_unit_cost) return false;
  
  const avg = parseFloat(item.average_unit_cost);
  const current = parseFloat(currentPrice);
  
  if (avg === 0) return false;

  const variance = Math.abs((current - avg) / avg);
  return variance > 0.1; // 10% variance trigger
};