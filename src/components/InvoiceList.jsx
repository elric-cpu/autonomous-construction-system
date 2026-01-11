import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Eye, WifiOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { withCache } from '@/utils/apiCache';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const InvoiceList = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cachedData, setCachedData] = useState(false);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
        fetchInvoices();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchInvoices = async () => {
    setLoading(true);
    
    // We only cache the full list (empty search), searching goes to network usually
    // unless we implement client side filtering on cached full list.
    // For now, let's cache the full fetch and filter client side if search is small?
    // Actually, network first for search is better.
    
    const cacheKey = search ? `invoices_search_${search}` : 'invoices_list_all';
    
    const { data, error, fromCache } = await withCache(cacheKey, async () => {
        let query = supabase
          .from('invoices')
          .select(`
            id, invoice_number, invoice_date, due_date, total_amount, status, payment_status,
            customers (name),
            jobs (job_name)
          `)
          .order('created_at', { ascending: false });

        if (search) {
          query = query.ilike('invoice_number', `%${search}%`);
        }
        
        // Limit for performance if not searching
        if (!search) query = query.limit(200);

        const { data: res, error: err } = await query;
        if(err) throw err;
        return res;
    }, 5); // 5 min TTL

    if (!error && data) {
        setInvoices(data);
        setCachedData(fromCache);
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'partially_paid': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  // Row Renderer
  const Row = useCallback(({ index, style }) => {
    const inv = invoices[index];
    if (!inv) return null;

    return (
      <div 
        style={style} 
        className="flex items-center border-b hover:bg-gray-50 text-sm px-4"
      >
        <div className="w-[15%] font-medium">{inv.invoice_number}</div>
        <div className="w-[20%] truncate pr-2">{inv.customers?.name}</div>
        <div className="w-[15%] truncate pr-2">{inv.jobs?.job_name || '-'}</div>
        <div className="w-[10%]">{inv.invoice_date}</div>
        <div className="w-[10%]">{inv.due_date}</div>
        <div className="w-[10%]">${inv.total_amount?.toFixed(2)}</div>
        <div className="w-[10%]">
             <Badge variant="outline" className={getStatusColor(inv.payment_status)}>
                 {inv.payment_status === 'unpaid' && inv.status === 'sent' ? 'Sent' : inv.payment_status}
             </Badge>
        </div>
        <div className="w-[10%] text-right">
             <Button variant="ghost" size="sm" onClick={() => navigate(`/staff-portal/invoices/${inv.id}`)}>
               <Eye className="w-4 h-4 mr-1" /> View
             </Button>
        </div>
      </div>
    );
  }, [invoices, navigate]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="relative w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search invoice number..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => fetchInvoices()} variant="outline">Refresh</Button>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden flex flex-col h-[600px]">
        {cachedData && <div className="bg-gray-100 text-xs text-center py-1 text-gray-500 flex items-center justify-center gap-1"><WifiOff className="w-3 h-3"/> Showing cached data</div>}
        
        {/* Header */}
        <div className="flex items-center bg-gray-50 border-b font-medium text-sm text-gray-500 py-3 px-4">
          <div className="w-[15%]">Invoice #</div>
          <div className="w-[20%]">Customer</div>
          <div className="w-[15%]">Job</div>
          <div className="w-[10%]">Date</div>
          <div className="w-[10%]">Due Date</div>
          <div className="w-[10%]">Total</div>
          <div className="w-[10%]">Status</div>
          <div className="w-[10%] text-right">Actions</div>
        </div>

        {/* List */}
        <div className="flex-grow">
          {loading ? (
             <div className="text-center py-12 text-gray-500">Loading invoices...</div>
          ) : invoices.length === 0 ? (
             <div className="text-center py-12 text-gray-500">No invoices found.</div>
          ) : (
            <AutoSizer>
                {({ height, width }) => (
                <List
                    height={height}
                    itemCount={invoices.length}
                    itemSize={60}
                    width={width}
                >
                    {Row}
                </List>
                )}
            </AutoSizer>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;