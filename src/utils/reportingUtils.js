import { supabase } from '@/lib/customSupabaseClient';

// Helper to format Date for Supabase (YYYY-MM-DD)
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export const getCompanyFinancialReport = async (startDate, endDate) => {
  try {
    const start = formatDate(startDate);
    const end = formatDate(endDate);

    // Run queries in parallel for better performance
    const [invoicesRes, costsRes, laborRes] = await Promise.all([
      supabase
        .from('invoices')
        .select('total_amount, invoice_date, status, payment_status')
        .gte('invoice_date', start)
        .lte('invoice_date', end),
      
      supabase
        .from('job_costs')
        .select('amount, cost_date, cost_category')
        .gte('cost_date', start)
        .lte('cost_date', end),

      supabase
        .from('job_labor')
        .select('total_labor_cost, work_date')
        .gte('work_date', start)
        .lte('work_date', end)
    ]);

    const invoices = invoicesRes.data || [];
    const costs = costsRes.data || [];
    const labor = laborRes.data || [];

    // Aggregations
    const totalRevenue = invoices.reduce((sum, inv) => sum + (Number(inv.total_amount) || 0), 0);
    const materialCosts = costs.reduce((sum, c) => sum + (Number(c.amount) || 0), 0);
    const laborCosts = labor.reduce((sum, l) => sum + (Number(l.total_labor_cost) || 0), 0);
    const totalCosts = materialCosts + laborCosts;
    const grossProfit = totalRevenue - totalCosts;
    const profitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

    // Monthly Trends for Chart
    const monthlyData = {};
    
    // Initialize months in range
    let cur = new Date(startDate);
    const endD = new Date(endDate);
    while (cur <= endD) {
        const key = cur.toISOString().slice(0, 7); // YYYY-MM
        if (!monthlyData[key]) monthlyData[key] = { name: key, revenue: 0, costs: 0 };
        cur.setMonth(cur.getMonth() + 1);
    }

    // Populate data
    invoices.forEach(inv => {
        const key = inv.invoice_date.slice(0, 7);
        if (monthlyData[key]) monthlyData[key].revenue += Number(inv.total_amount);
    });

    costs.forEach(c => {
        const key = c.cost_date.slice(0, 7);
        if (monthlyData[key]) monthlyData[key].costs += Number(c.amount);
    });
    
    labor.forEach(l => {
        const key = l.work_date.slice(0, 7);
        if (monthlyData[key]) monthlyData[key].costs += Number(l.total_labor_cost);
    });

    return {
        totalRevenue,
        totalCosts,
        grossProfit,
        profitMargin,
        chartData: Object.values(monthlyData).sort((a,b) => a.name.localeCompare(b.name))
    };

  } catch (err) {
    console.error('Financial Report Error:', err);
    return null;
  }
};

export const getVendorAnalysisReport = async (startDate, endDate) => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  const { data: receipts } = await supabase
    .from('receipts')
    .select('vendor_name, total_amount, receipt_date')
    .gte('receipt_date', start)
    .lte('receipt_date', end);

  const vendorMap = {};

  receipts?.forEach(r => {
      const vName = r.vendor_name || 'Unknown';
      if (!vendorMap[vName]) vendorMap[vName] = { name: vName, totalSpent: 0, count: 0 };
      vendorMap[vName].totalSpent += Number(r.total_amount);
      vendorMap[vName].count += 1;
  });

  // Optimize sort
  const vendorList = Object.values(vendorMap).sort((a,b) => b.totalSpent - a.totalSpent);
  return vendorList;
};

export const getJobPerformanceReport = async () => {
   // Select only necessary fields
   const { data: jobs } = await supabase
        .from('jobs')
        .select('id, job_name, customers(name), status')
        .eq('status', 'active');
   
   return jobs || [];
};