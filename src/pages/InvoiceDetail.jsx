import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, Download, Send, CreditCard, Printer } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import InvoiceTemplate from '@/components/InvoiceTemplate';
import RecordPaymentModal from '@/components/RecordPaymentModal';

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [invoice, setInvoice] = useState(null);
  const [lineItems, setLineItems] = useState([]);
  const [payments, setPayments] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    // 1. Fetch Invoice
    const { data: inv } = await supabase
      .from('invoices')
      .select(`
        *,
        customers (name, email, address, phone),
        jobs (job_name)
      `)
      .eq('id', id)
      .single();

    if (inv) {
      setInvoice(inv);
      
      // 2. Fetch Lines
      const { data: lines } = await supabase
        .from('invoice_line_items')
        .select('*')
        .eq('invoice_id', id);
      setLineItems(lines || []);

      // 3. Fetch Payments
      const { data: pay } = await supabase
        .from('invoice_payments')
        .select('*')
        .eq('invoice_id', id)
        .order('payment_date', { ascending: false });
      setPayments(pay || []);
    }

    // 4. Fetch Company
    const { data: comp } = await supabase.from('company_settings').select('*').single();
    setCompany(comp);
    
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('invoice-template');
    const opt = {
      margin: 0.5,
      filename: `${invoice.invoice_number}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleMarkSent = async () => {
    await supabase.from('invoices').update({ status: 'sent' }).eq('id', id);
    setInvoice({ ...invoice, status: 'sent' });
    toast({ title: "Updated", description: "Invoice marked as Sent." });
  };

  if (loading) return <div className="p-8 text-center">Loading Invoice...</div>;
  if (!invoice) return <div className="p-8 text-center">Invoice not found</div>;

  const totalPaid = payments.reduce((sum, p) => sum + (p.amount_paid || 0), 0);
  const percentPaid = Math.min((totalPaid / invoice.total_amount) * 100, 100);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/staff-portal')}>
               <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">{invoice.invoice_number}</h1>
            <Badge variant={invoice.payment_status === 'paid' ? 'default' : 'secondary'} className="capitalize">
              {invoice.payment_status.replace('_', ' ')}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" /> PDF
            </Button>
            {invoice.status === 'draft' && (
              <Button variant="outline" onClick={handleMarkSent}>
                <Send className="w-4 h-4 mr-2" /> Mark Sent
              </Button>
            )}
            {invoice.payment_status !== 'paid' && (
              <Button onClick={() => setShowPaymentModal(true)} className="bg-green-600 hover:bg-green-700">
                <CreditCard className="w-4 h-4 mr-2" /> Record Payment
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Invoice View */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
               {/* Wrapper for PDF generation */}
               <div className="overflow-x-auto">
                 <InvoiceTemplate 
                   invoice={invoice} 
                   company={company} 
                   lineItems={lineItems} 
                   payments={payments}
                 />
               </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">Payment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex justify-between text-sm font-bold">
                  <span>${totalPaid.toFixed(2)} Paid</span>
                  <span>${(invoice.total_amount - totalPaid).toFixed(2)} Due</span>
                </div>
                <Progress value={percentPaid} className="h-2" />
                
                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-sm">History</h4>
                  {payments.length === 0 ? (
                    <div className="text-sm text-gray-500">No payments recorded.</div>
                  ) : (
                    payments.map(p => (
                      <div key={p.id} className="text-sm border-b pb-2">
                        <div className="flex justify-between">
                          <span className="font-medium">${p.amount_paid.toFixed(2)}</span>
                          <span className="text-gray-500">{p.payment_date}</span>
                        </div>
                        <div className="text-xs text-gray-400 capitalize">{p.payment_method}</div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Status</span>
                  <span className="capitalize">{invoice.status}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Created</span>
                  <span>{new Date(invoice.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Due Date</span>
                  <span className={new Date(invoice.due_date) < new Date() && invoice.payment_status !== 'paid' ? 'text-red-500 font-bold' : ''}>
                    {invoice.due_date}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Job</span>
                  <span>{invoice.jobs?.job_name}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <RecordPaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)}
        invoice={{ ...invoice, paid_amount_temp: totalPaid }} 
        onPaymentRecorded={fetchData}
      />
    </div>
  );
};

export default InvoiceDetail;