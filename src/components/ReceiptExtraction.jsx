import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Save, AlertCircle, Plus, Trash2, RefreshCw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import JobMatcher from './JobMatcher';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { updateItemLibraryFromReceipt } from '@/utils/itemLibraryUtils';
import { autoCategorizeItem } from '@/utils/jobCostingUtils';

const ReceiptExtraction = ({ extractedData, onSaveComplete, onCancel }) => {
  const [formData, setFormData] = useState({
    vendor_name: extractedData.vendor || '',
    receipt_date: extractedData.date || '',
    total_amount: extractedData.total || '',
  });
  
  // Initialize with empty line item if none extracted (OCR usually fails at tabular data without complex logic)
  const [lineItems, setLineItems] = useState([
    { item_name: '', quantity: 1, unit_cost: 0, total_cost: 0 }
  ]);
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLineItemChange = (index, field, value) => {
    const newItems = [...lineItems];
    newItems[index][field] = value;
    
    // Auto-calc totals if qty or unit cost changes
    if (field === 'quantity' || field === 'unit_cost') {
      const qty = parseFloat(newItems[index].quantity) || 0;
      const cost = parseFloat(newItems[index].unit_cost) || 0;
      newItems[index].total_cost = (qty * cost).toFixed(2);
    }
    
    setLineItems(newItems);
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { item_name: '', quantity: 1, unit_cost: 0, total_cost: 0 }]);
  };

  const removeLineItem = (index) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  const calculateTotal = () => {
    const sum = lineItems.reduce((acc, item) => acc + (parseFloat(item.total_cost) || 0), 0);
    setFormData(prev => ({ ...prev, total_amount: sum.toFixed(2) }));
  };

  const handleSave = async () => {
    if (!formData.vendor_name || !formData.total_amount) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please ensure Vendor Name and Total Amount are filled."
      });
      return;
    }

    setSaving(true);
    try {
      // 1. Save Receipt Header
      const { data: receiptData, error: receiptError } = await supabase
        .from('receipts')
        .insert([{
          vendor_name: formData.vendor_name,
          receipt_date: formData.receipt_date || null,
          total_amount: parseFloat(formData.total_amount),
          original_file_url: extractedData.url,
          extracted_data: extractedData,
          confidence_score: extractedData.confidence,
          job_id: selectedJob ? selectedJob.id : null,
          customer_id: selectedJob ? selectedJob.customers?.id : null,
          status: selectedJob ? 'matched' : 'unmatched'
        }])
        .select()
        .single();

      if (receiptError) throw receiptError;

      // 2. Save Line Items & Job Costs
      const validLineItems = lineItems.filter(item => item.item_name.trim() !== '');
      
      if (validLineItems.length > 0) {
        // Receipt Lines
        const lineItemsToInsert = validLineItems.map(item => ({
          receipt_id: receiptData.id,
          item_name: item.item_name,
          quantity: parseFloat(item.quantity),
          unit_cost: parseFloat(item.unit_cost),
          total_cost: parseFloat(item.total_cost)
        }));

        await supabase.from('receipt_line_items').insert(lineItemsToInsert);

        // Update Item Library
        const { added, updated } = await updateItemLibraryFromReceipt(
          receiptData.id, 
          validLineItems, 
          formData.vendor_name, 
          formData.receipt_date
        );

        // *** JOB COSTING UPDATE ***
        if (selectedJob) {
          const jobCostsToInsert = validLineItems.map(item => ({
             job_id: selectedJob.id,
             receipt_id: receiptData.id,
             cost_category: autoCategorizeItem(item.item_name),
             description: `${item.item_name} (${formData.vendor_name})`,
             amount: parseFloat(item.total_cost),
             cost_date: formData.receipt_date || new Date()
          }));
          
          await supabase.from('job_costs').insert(jobCostsToInsert);
        }

        toast({
          title: "Library Updated",
          description: `${added} new items added, ${updated} items updated in library.`
        });
      }

      toast({
        title: "Receipt Saved",
        description: selectedJob ? "Receipt linked and costs applied to job." : "Receipt saved as unmatched."
      });

      onSaveComplete();
    } catch (err) {
      console.error('Save error:', err);
      toast({
        variant: "destructive",
        title: "Error Saving",
        description: err.message
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Left Column: Edit Details */}
      <div className="space-y-6 flex flex-col h-full max-h-[80vh]">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Verify Details</h3>
              <p className="text-sm text-gray-500">Confirm extracted information and add line items.</p>
            </div>

            <div className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
              <div className="grid gap-2">
                <Label htmlFor="vendor_name">Vendor Name</Label>
                <Input 
                  id="vendor_name" 
                  name="vendor_name" 
                  value={formData.vendor_name} 
                  onChange={handleChange} 
                  placeholder="e.g. Home Depot"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="receipt_date">Date</Label>
                  <Input 
                    id="receipt_date" 
                    name="receipt_date" 
                    type="date"
                    value={formData.receipt_date} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="total_amount">Total Amount ($)</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="total_amount" 
                      name="total_amount" 
                      type="number" 
                      step="0.01"
                      value={formData.total_amount} 
                      onChange={handleChange} 
                    />
                    <Button variant="outline" size="icon" onClick={calculateTotal} title="Sum Line Items">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="text-xs text-gray-500 flex items-center gap-1 bg-yellow-50 p-2 rounded text-yellow-700 border border-yellow-200">
                  <AlertCircle className="w-3 h-3" />
                  OCR Confidence: {Math.round(extractedData.confidence)}%
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Line Items</h4>
                <Button variant="ghost" size="sm" onClick={addLineItem} className="text-maroon hover:text-maroon/80">
                  <Plus className="w-4 h-4 mr-1" /> Add Item
                </Button>
              </div>
              
              <div className="space-y-3">
                {lineItems.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-1">
                      {idx === 0 && <Label className="text-xs text-gray-500">Item Name</Label>}
                      <Input 
                        placeholder="Item Name" 
                        value={item.item_name}
                        onChange={(e) => handleLineItemChange(idx, 'item_name', e.target.value)}
                        className="h-8"
                      />
                    </div>
                    <div className="w-16 space-y-1">
                      {idx === 0 && <Label className="text-xs text-gray-500">Qty</Label>}
                      <Input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => handleLineItemChange(idx, 'quantity', e.target.value)}
                        className="h-8"
                      />
                    </div>
                    <div className="w-24 space-y-1">
                      {idx === 0 && <Label className="text-xs text-gray-500">Unit Cost</Label>}
                      <Input 
                        type="number" 
                        step="0.01"
                        value={item.unit_cost}
                        onChange={(e) => handleLineItemChange(idx, 'unit_cost', e.target.value)}
                        className="h-8"
                      />
                    </div>
                    <div className="w-24 space-y-1">
                      {idx === 0 && <Label className="text-xs text-gray-500">Total</Label>}
                      <Input 
                        type="number" 
                        step="0.01"
                        value={item.total_cost}
                        readOnly
                        className="h-8 bg-gray-50"
                      />
                    </div>
                    <div className="pt-1">
                       {idx === 0 && <div className="h-4"></div>}
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500" onClick={() => removeLineItem(idx)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Matching</h3>
              <JobMatcher 
                extractedText={extractedData.text} 
                onSelectJob={setSelectedJob} 
              />
            </div>
          </div>
        </ScrollArea>

        <div className="flex gap-3 pt-4 border-t bg-white mt-auto">
          <Button 
            className="flex-1 bg-maroon hover:bg-maroon/90" 
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Receipt & Update Job Costs
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
        </div>
      </div>

      {/* Right Column: PDF/Image Preview */}
      <div className="bg-gray-100 rounded-lg border overflow-hidden flex flex-col h-[600px] lg:h-auto">
        <div className="p-3 bg-white border-b text-sm font-medium text-gray-600 flex justify-between">
          <span>Receipt Preview</span>
        </div>
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
            <img 
              src={extractedData.url} 
              alt="Receipt Original" 
              className="max-w-full h-auto shadow-lg"
            />
        </div>
      </div>
    </div>
  );
};

export default ReceiptExtraction;