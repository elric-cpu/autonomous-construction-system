import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { generateInvoiceNumber, calculateDueDate } from '@/utils/invoiceUtils';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const CreateInvoiceModal = ({ isOpen, onClose, estimate }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: '',
    tax_rate: 0,
    notes: ''
  });
  const [invoiceNumber, setInvoiceNumber] = useState('');

  useEffect(() => {
    const init = async () => {
      if (isOpen && estimate) {
        setLoading(true);
        // 1. Generate Number
        const num = await generateInvoiceNumber();
        setInvoiceNumber(num);

        // 2. Fetch Company Settings for defaults
        const { data: settings } = await supabase.from('company_settings').select('*').single();
        
        const dueDate = calculateDueDate(new Date().toISOString(), settings?.payment_terms || 'Net 30');
        
        setFormData({
          invoice_date: new Date().toISOString().split('T')[0],
          due_date: dueDate,
          tax_rate: settings?.tax_rate || 0,
          notes: `Thank you for your business. Please include invoice number ${num} on your check.`
        });
        setLoading(false);
      }
    };
    init();
  }, [isOpen, estimate]);

  const handleCreate = async () => {
    setLoading(true);
    try {
      // 1. Fetch estimate lines if not passed fully
      const { data: lineItems } = await supabase
        .from('estimate_line_items')
        .select('*')
        .eq('estimate_id', estimate.id);

      // 2. Calc Totals
      const subtotal = parseFloat(estimate.total_amount) || 0; // Assuming estimate total is pre-tax usually, simplified here
      const taxAmount = subtotal * (parseFloat(formData.tax_rate) / 100);
      const totalAmount = subtotal + taxAmount;

      // 3. Insert Invoice
      const { data: invoice, error: invError } = await supabase
        .from('invoices')
        .insert({
          invoice_number: invoiceNumber,
          job_id: estimate.job_id,
          customer_id: estimate.customer_id,
          estimate_id: estimate.id,
          invoice_date: formData.invoice_date,
          due_date: formData.due_date,
          subtotal: subtotal,
          tax_rate: formData.tax_rate,
          tax_amount: taxAmount,
          total_amount: totalAmount,
          status: 'draft',
          notes: formData.notes
        })
        .select()
        .single();

      if (invError) throw invError;

      // 4. Insert Line Items
      if (lineItems && lineItems.length > 0) {
        const invLines = lineItems.map(item => ({
          invoice_id: invoice.id,
          item_id: item.item_id,
          item_name: item.item_name,
          description: item.description,
          quantity: item.quantity,
          unit_cost: item.unit_cost,
          total_cost: item.total_cost
        }));
        
        await supabase.from('invoice_line_items').insert(invLines);
      }

      toast({ title: "Success", description: `Invoice ${invoiceNumber} created!` });
      onClose();
      navigate(`/staff-portal/invoices/${invoice.id}`);

    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (!estimate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Invoice from Estimate</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Invoice Number</Label>
              <Input value={invoiceNumber} disabled className="bg-gray-100" />
            </div>
            <div>
              <Label>Tax Rate (%)</Label>
              <Input 
                type="number" 
                value={formData.tax_rate}
                onChange={e => setFormData({...formData, tax_rate: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Invoice Date</Label>
              <Input 
                type="date" 
                value={formData.invoice_date}
                onChange={e => setFormData({...formData, invoice_date: e.target.value})}
              />
            </div>
            <div>
              <Label>Due Date</Label>
              <Input 
                type="date" 
                value={formData.due_date}
                onChange={e => setFormData({...formData, due_date: e.target.value})}
              />
            </div>
          </div>
          <div>
            <Label>Notes</Label>
            <Input 
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreate} disabled={loading} className="bg-maroon hover:bg-maroon/90">
            {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
            Create Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceModal;