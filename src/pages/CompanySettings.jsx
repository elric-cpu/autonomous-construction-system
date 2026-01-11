import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Save, Loader2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanySettings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    id: null,
    company_name: '',
    company_address: '',
    company_phone: '',
    company_email: '',
    tax_rate: 0,
    invoice_prefix: 'INV',
    payment_terms: 'Net 30'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('company_settings').select('*').single();
    if (data) {
      setSettings(data);
    } else if (error && error.code !== 'PGRST116') {
       // PGRST116 is no rows returned, which is fine initially
       console.error(error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('company_settings')
        .upsert(settings)
        .select();

      if (error) throw error;

      toast({ title: "Settings Saved", description: "Company details updated successfully." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading settings...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/staff-portal')}>
           <ChevronLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold">Company Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>These details will appear on your invoices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Company Name</Label>
            <Input 
              value={settings.company_name} 
              onChange={e => setSettings({...settings, company_name: e.target.value})} 
            />
          </div>
          <div className="grid gap-2">
            <Label>Address</Label>
            <Input 
              value={settings.company_address} 
              onChange={e => setSettings({...settings, company_address: e.target.value})} 
              placeholder="Full Address including Zip"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input 
                value={settings.company_phone} 
                onChange={e => setSettings({...settings, company_phone: e.target.value})} 
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input 
                value={settings.company_email} 
                onChange={e => setSettings({...settings, company_email: e.target.value})} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Defaults</CardTitle>
          <CardDescription>Default settings for new invoices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Invoice Prefix</Label>
              <Input 
                value={settings.invoice_prefix} 
                onChange={e => setSettings({...settings, invoice_prefix: e.target.value})} 
                placeholder="INV"
              />
            </div>
            <div className="grid gap-2">
              <Label>Default Tax Rate (%)</Label>
              <Input 
                type="number"
                value={settings.tax_rate} 
                onChange={e => setSettings({...settings, tax_rate: e.target.value})} 
              />
            </div>
            <div className="grid gap-2">
              <Label>Payment Terms</Label>
              <Select 
                value={settings.payment_terms} 
                onValueChange={val => setSettings({...settings, payment_terms: val})}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                  <SelectItem value="Net 15">Net 15</SelectItem>
                  <SelectItem value="Net 30">Net 30</SelectItem>
                  <SelectItem value="Net 60">Net 60</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="bg-maroon w-32">
          {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4 mr-2" />}
          Save
        </Button>
      </div>
    </div>
  );
};

export default CompanySettings;