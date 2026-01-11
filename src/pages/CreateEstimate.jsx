import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Save, FilePlus, ChevronLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import PricingSuggestions from '@/components/PricingSuggestions';
import SEO from '@/components/SEO';

const CreateEstimate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  
  const [items, setItems] = useState([
    { id: '1', item_name: '', description: '', quantity: 1, unit_cost: 0, total_cost: 0 }
  ]);
  
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Fetch active jobs
    const fetchJobs = async () => {
      const { data } = await supabase
        .from('jobs')
        .select('id, job_name, customers(name)')
        .eq('status', 'active');
      if (data) setJobs(data);
    };
    fetchJobs();
  }, []);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    
    if (field === 'quantity' || field === 'unit_cost') {
      const qty = parseFloat(newItems[index].quantity) || 0;
      const cost = parseFloat(newItems[index].unit_cost) || 0;
      newItems[index].total_cost = (qty * cost).toFixed(2);
    }
    
    setItems(newItems);
  };

  const openSuggestions = (index) => {
    setActiveItemIndex(index);
    setIsSuggestionOpen(true);
  };

  const handleSuggestionSelect = (suggestedItem) => {
    if (activeItemIndex !== null) {
      handleItemChange(activeItemIndex, 'item_name', suggestedItem.item_name);
      handleItemChange(activeItemIndex, 'unit_cost', suggestedItem.average_unit_cost);
      handleItemChange(activeItemIndex, 'description', `Vendor: ${suggestedItem.vendor_name}`);
    }
    setIsSuggestionOpen(false);
  };

  const addNewItem = () => {
    setItems([...items, { id: Date.now(), item_name: '', description: '', quantity: 1, unit_cost: 0, total_cost: 0 }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + (parseFloat(item.total_cost) || 0), 0).toFixed(2);
  };

  const handleSaveEstimate = async () => {
    if (!selectedJobId) {
      toast({ variant: "destructive", title: "Job Required", description: "Please select a job for this estimate." });
      return;
    }

    setSaving(true);
    try {
      // 1. Create Estimate
      const selectedJob = jobs.find(j => j.id === selectedJobId);
      
      const { data: estimate, error } = await supabase
        .from('estimates')
        .insert({
          job_id: selectedJobId,
          // customer_id would come from job selection, simplified here
          total_amount: calculateTotal(),
          status: 'draft'
        })
        .select()
        .single();

      if (error) throw error;

      // 2. Create Line Items
      const lineItems = items
        .filter(i => i.item_name.trim() !== '')
        .map(i => ({
          estimate_id: estimate.id,
          item_name: i.item_name,
          description: i.description,
          quantity: parseFloat(i.quantity),
          unit_cost: parseFloat(i.unit_cost),
          total_cost: parseFloat(i.total_cost)
        }));

      if (lineItems.length > 0) {
        const { error: lineError } = await supabase.from('estimate_line_items').insert(lineItems);
        if (lineError) throw lineError;
      }

      toast({ title: "Success", description: "Estimate saved successfully." });
      navigate('/staff-portal');
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SEO title="Create Estimate | Staff Portal" />
      <div className="min-h-screen bg-gray-50 pb-20">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/staff-portal')}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">New Estimate</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm text-gray-500">Total Estimate</div>
                <div className="text-xl font-bold text-maroon">${calculateTotal()}</div>
              </div>
              <Button onClick={handleSaveEstimate} disabled={saving} className="bg-maroon hover:bg-maroon/90">
                {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4 mr-2" />}
                Save Estimate
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Select Job</Label>
                  <Select onValueChange={setSelectedJobId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job..." />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map(job => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.job_name} ({job.customers?.name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Estimate Date</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Line Items</CardTitle>
              <Button variant="outline" size="sm" onClick={addNewItem}>
                <Plus className="w-4 h-4 mr-2" /> Add Item
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-12 gap-2 font-medium text-sm text-gray-500 mb-2 px-2">
                <div className="col-span-4">Item Name</div>
                <div className="col-span-3">Description</div>
                <div className="col-span-1 text-center">Qty</div>
                <div className="col-span-2 text-right">Unit Cost</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-start bg-gray-50/50 p-2 rounded-lg border hover:border-maroon/30 transition-colors">
                    <div className="col-span-4 relative">
                      <div className="flex gap-1">
                        <Input 
                          placeholder="Item Name" 
                          value={item.item_name}
                          onChange={(e) => handleItemChange(index, 'item_name', e.target.value)}
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="shrink-0" 
                          title="Get Suggestions"
                          onClick={() => openSuggestions(index)}
                        >
                          <FilePlus className="w-4 h-4 text-maroon" />
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <Input 
                        placeholder="Desc" 
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        className="text-center"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input 
                        type="number" 
                        value={item.unit_cost}
                        onChange={(e) => handleItemChange(index, 'unit_cost', e.target.value)}
                        className="text-right"
                      />
                    </div>
                    <div className="col-span-2 flex gap-2">
                      <div className="flex-1 flex items-center justify-end px-3 font-medium text-gray-700 bg-gray-100 rounded">
                        ${item.total_cost}
                      </div>
                      <Button variant="ghost" size="icon" className="shrink-0 text-gray-400 hover:text-red-500" onClick={() => removeItem(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <PricingSuggestions 
        isOpen={isSuggestionOpen} 
        onClose={() => setIsSuggestionOpen(false)} 
        onSelectItem={handleSuggestionSelect}
      />
    </>
  );
};

export default CreateEstimate;