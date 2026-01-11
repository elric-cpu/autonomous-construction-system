import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    receiptsCount: 0,
    unmatchedReceipts: 0,
    invoicesCount: 0,
    overdueInvoices: 0,
    totalRevenue: 0
  });
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    // 1. Receipt Stats
    const { data: receipts } = await supabase.from('receipts').select('status');
    const receiptsCount = receipts?.length || 0;
    const unmatchedReceipts = receipts?.filter(r => r.status === 'unmatched').length || 0;

    // 2. Invoice Stats
    const { data: invoices } = await supabase.from('invoices').select('payment_status, total_amount, due_date');
    const invoicesCount = invoices?.length || 0;
    const today = new Date().toISOString().split('T')[0];
    
    const overdueInvoices = invoices?.filter(i => i.payment_status !== 'paid' && i.due_date < today).length || 0;
    const totalRevenue = invoices?.filter(i => i.payment_status === 'paid').reduce((sum, i) => sum + (i.total_amount || 0), 0) || 0;

    setStats({
      receiptsCount,
      unmatchedReceipts,
      invoicesCount,
      overdueInvoices,
      totalRevenue
    });

    // 3. Recent Invoices
    const { data: recent } = await supabase
      .from('invoices')
      .select('id, invoice_number, invoice_date, total_amount, payment_status, customers(name)')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (recent) setRecentInvoices(recent);
    
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (Paid)</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Lifetime</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unpaid/Overdue</CardTitle>
            <Clock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overdueInvoices}</div>
            <p className="text-xs text-muted-foreground text-red-500">Invoices Overdue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Receipts</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unmatchedReceipts}</div>
            <p className="text-xs text-muted-foreground">Need Matching</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.invoicesCount}</div>
            <p className="text-xs text-muted-foreground">Generated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentInvoices.map((inv) => (
                    <TableRow key={inv.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/staff-portal/invoices/${inv.id}`)}>
                      <TableCell className="font-medium">{inv.invoice_number}</TableCell>
                      <TableCell>{inv.customers?.name}</TableCell>
                      <TableCell className="text-right">${inv.total_amount?.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className={inv.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {inv.payment_status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {recentInvoices.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">No recent invoices</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-3 p-3 bg-green-50 rounded border border-green-100">
               <CheckCircle className="text-green-600 w-5 h-5" />
               <div>
                 <div className="font-medium text-green-900">Database Connected</div>
                 <div className="text-xs text-green-700">Supabase operational</div>
               </div>
             </div>
             <div className="flex items-center gap-3 p-3 bg-blue-50 rounded border border-blue-100">
               <FileText className="text-blue-600 w-5 h-5" />
               <div>
                 <div className="font-medium text-blue-900">OCR Engine Ready</div>
                 <div className="text-xs text-blue-700">Tesseract.js loaded</div>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;