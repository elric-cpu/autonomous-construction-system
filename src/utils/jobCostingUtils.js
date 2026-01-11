import { supabase } from '@/lib/customSupabaseClient';

export const getJobCostingSummary = async (jobId) => {
  try {
    // 1. Fetch Estimates (Budget)
    const { data: estimates } = await supabase
      .from('estimates')
      .select('total_amount')
      .eq('job_id', jobId)
      .eq('status', 'accepted'); // Only count accepted estimates as budget

    const totalEstimatedRevenue = estimates?.reduce((sum, e) => sum + (parseFloat(e.total_amount) || 0), 0) || 0;
    
    // Simplistic estimated cost assumption (e.g. 70% of revenue) if no detailed budget exists
    // In a real app, you'd query estimate_line_items and sum their base costs if stored separately from markup
    const totalEstimatedCost = totalEstimatedRevenue * 0.7; 

    // 2. Fetch Actual Costs (Receipts + Manual Entries)
    const { data: costs } = await supabase
      .from('job_costs')
      .select('amount, cost_category')
      .eq('job_id', jobId);
      
    const costsTotal = costs?.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0) || 0;

    // 3. Fetch Labor Costs
    const { data: labor } = await supabase
      .from('job_labor')
      .select('total_labor_cost')
      .eq('job_id', jobId);

    const laborTotal = labor?.reduce((sum, l) => sum + (parseFloat(l.total_labor_cost) || 0), 0) || 0;

    const totalActualCost = costsTotal + laborTotal;

    // 4. Fetch Actual Revenue (Invoices)
    const { data: revenue } = await supabase
      .from('job_revenue')
      .select('amount')
      .eq('job_id', jobId);

    const totalActualRevenue = revenue?.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0) || 0;

    // 5. Calculations
    const grossProfit = totalActualRevenue - totalActualCost;
    const profitMargin = totalActualRevenue > 0 ? (grossProfit / totalActualRevenue) * 100 : 0;
    
    const costVariance = totalActualCost - totalEstimatedCost;
    const costVariancePercent = totalEstimatedCost > 0 ? (costVariance / totalEstimatedCost) * 100 : 0;
    
    let status = 'On Budget';
    if (costVariancePercent > 5) status = 'Over Budget'; // >5% over
    if (costVariancePercent < -5) status = 'Under Budget'; // >5% under

    return {
      totalEstimatedCost,
      totalActualCost,
      costVariance,
      costVariancePercent,
      totalEstimatedRevenue,
      totalActualRevenue,
      grossProfit,
      profitMargin,
      status
    };
  } catch (error) {
    console.error("Error calculating job costing:", error);
    return null;
  }
};

export const getCostBreakdown = async (jobId) => {
  // Fetch costs again to group by category
  const { data: costs } = await supabase
    .from('job_costs')
    .select('amount, cost_category')
    .eq('job_id', jobId);

  const { data: labor } = await supabase
    .from('job_labor')
    .select('total_labor_cost')
    .eq('job_id', jobId);

  const breakdown = {
    Materials: 0,
    Labor: 0,
    Equipment: 0,
    Subcontractor: 0,
    Other: 0
  };

  costs?.forEach(c => {
    const cat = c.cost_category ? (c.cost_category.charAt(0).toUpperCase() + c.cost_category.slice(1)) : 'Other';
    const amount = parseFloat(c.amount) || 0;
    if (breakdown[cat] !== undefined) {
      breakdown[cat] += amount;
    } else {
      breakdown.Other += amount;
    }
  });

  const laborCost = labor?.reduce((sum, l) => sum + (parseFloat(l.total_labor_cost) || 0), 0) || 0;
  breakdown.Labor += laborCost; // Add specific labor table costs to the category

  return breakdown;
};

// Helper to determine cost category from item name
export const autoCategorizeItem = (itemName) => {
  const lower = itemName.toLowerCase();
  if (lower.includes('labor') || lower.includes('installation') || lower.includes('hours')) return 'labor';
  if (lower.includes('rental') || lower.includes('equipment') || lower.includes('excavator')) return 'equipment';
  if (lower.includes('sub') || lower.includes('contractor') || lower.includes('plumber') || lower.includes('electrician')) return 'subcontractor';
  return 'materials'; // Default
};