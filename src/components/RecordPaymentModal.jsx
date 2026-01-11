import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { updateInvoiceStatus } from '@/utils/invoiceUtils';
import { useToast } from '@/components/ui/use-toast';

const RecordPaymentModal = ({ isOpen, onClose, invoice, onPaymentRecorded }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    method: 'check',
    notes: ''
  });

  const remaining = invoice ? (invoice.total_amount - (invoice.paid_amount_temp || 0)) : 0;

  const handleRecord = async () => {
    if (!payment.amount || parseFloat(payment.amount) <= 0) {
      toast({ variant: "destructive", title: "Invalid Amount" });
      return;
    }

    setLoading(true);
    try {
      // 1. Insert Payment
      const { error } = await supabase.from('invoice_payments').insert({
        invoice_id: invoice.id,
        payment_date: payment.date,
        amount_paid: parseFloat(payment.amount),
        payment_method: payment.method,
        notes: payment.notes
      });

      if (error) throw error;

      // 2. Update Invoice Status
      await updateInvoiceStatus(invoice.id);

      toast({ title: "Payment Recorded", description: `$${payment.amount} added to invoice.` });
      if (onPaymentRecorded) onPaymentRecorded();
      onClose();
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (!invoice) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Payment for {invoice.invoice_number}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="p-3 bg-gray-50 rounded border text-sm flex justify-between">
             <span>Total Due: <strong>${invoice.total_amount?.toFixed(2)}</strong></span>
             {/* Note: In a real app we'd pass the calculated remaining balance explicitly */}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
               <Label>Date</Label>
               <Input type="date" value={payment.date} onChange={e => setPayment({...payment, date: e.target.value})} />
             </div>
             <div>
               <Label>Amount ($)</Label>
               <Input 
                 type="number" 
                 value={payment.amount} 
                 onChange={e => setPayment({...payment, amount: e.target.value})}
                 placeholder="0.00"
                />
             </div>
          </div>

          <div>
            <Label>Payment Method</Label>
            <Select value={payment.method} onValueChange={val => setPayment({...payment, method: val})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="check">Check</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Notes / Reference #</Label>
            <Input value={payment.notes} onChange={e => setPayment({...payment, notes: e.target.value})} placeholder="e.g. Check #1024" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleRecord} disabled={loading} className="bg-green-600 hover:bg-green-700">
            {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
            Record Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecordPaymentModal;