import { supabase } from '@/lib/customSupabaseClient';

export const generateInvoiceNumber = async () => {
  try {
    // 1. Get company settings for prefix
    const { data: settings } = await supabase
      .from('company_settings')
      .select('invoice_prefix')
      .single();

    const prefix = settings?.invoice_prefix || 'INV';
    const year = new Date().getFullYear();

    // 2. Get the latest invoice number
    const { data: latestInvoice } = await supabase
      .from('invoices')
      .select('invoice_number')
      .ilike('invoice_number', `${prefix}-${year}-%`)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    let nextNumber = 1;

    if (latestInvoice?.invoice_number) {
      // Extract number part: INV-2024-005 -> 005
      const parts = latestInvoice.invoice_number.split('-');
      if (parts.length >= 3) {
        const lastSeq = parseInt(parts[2], 10);
        if (!isNaN(lastSeq)) {
          nextNumber = lastSeq + 1;
        }
      }
    }

    // Format: INV-2024-001
    return `${prefix}-${year}-${nextNumber.toString().padStart(3, '0')}`;
  } catch (error) {
    console.error('Error generating invoice number:', error);
    // Fallback
    return `INV-${Date.now()}`;
  }
};

export const calculateDueDate = (dateString, terms) => {
  const date = new Date(dateString);
  let days = 30; // Default Net 30

  if (terms === 'Net 15') days = 15;
  if (terms === 'Net 60') days = 60;
  if (terms === 'Due on Receipt') days = 0;

  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const updateInvoiceStatus = async (invoiceId) => {
  // 1. Get total amount and all payments
  const { data: invoice } = await supabase
    .from('invoices')
    .select('total_amount')
    .eq('id', invoiceId)
    .single();

  const { data: payments } = await supabase
    .from('invoice_payments')
    .select('amount_paid')
    .eq('invoice_id', invoiceId);

  if (!invoice) return;

  const totalPaid = payments?.reduce((sum, p) => sum + (parseFloat(p.amount_paid) || 0), 0) || 0;
  const totalAmount = parseFloat(invoice.total_amount) || 0;

  let newStatus = 'unpaid';
  if (totalPaid >= totalAmount && totalAmount > 0) {
    newStatus = 'paid';
  } else if (totalPaid > 0) {
    newStatus = 'partially_paid';
  }

  // Update status
  await supabase
    .from('invoices')
    .update({ 
      payment_status: newStatus,
      status: newStatus === 'paid' ? 'paid' : undefined // Optionally update main status too if fully paid
    })
    .eq('id', invoiceId);
    
  return newStatus;
};