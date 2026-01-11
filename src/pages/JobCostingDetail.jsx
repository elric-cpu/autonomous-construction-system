import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { getJobCostingSummary, getCostBreakdown } from '@/utils/jobCostingUtils';
import JobCostingSummary from '@/components/JobCostingSummary';
import CostBreakdownChart from '@/components/CostBreakdownChart';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus, Download, Hammer, Receipt } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const JobCostingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [job, setJob] = useState(null);
  const [summary, setSummary] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const [costs, setCosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    // 1. Job Info
    const { data: jobData } = await supabase
      .from('jobs')
      .select('*, customers(name)')
      .eq('id', id)
      .single();
    setJob(jobData);

    // 2. Summary & Breakdown
    const sum = await getJobCostingSummary(id);
    const breakD = await getCostBreakdown(id);
    setSummary(sum);
    setBreakdown(breakD);

    // 3. Detailed Costs List
    const { data: costData } = await supabase
      .from('job_costs')
      .select('*')
      .eq('job_id', id)
      .order('cost_date', { ascending: false });
    
    // 4. Labor List
    const { data: laborData } = await supabase
      .from('job_labor')
      .select('*')
      .eq('job_id', id)
      .order('work_date', { ascending: false });

    // Combine for the list view
    const combinedCosts = [
      ...(costData || []).map(c => ({ ...c, type: 'Expense' })),
      ...(laborData || []).map(l => ({ 
        id: l.id, 
        cost_date: l.work_date, 
        amount: l.total_labor_cost, 
        cost_category: 'Labor', 
        description: `Labor: ${l.staff_member} (${l.hours_worked}hrs)`,
        type: 'Labor'
      }))
    ];
    
    combinedCosts.sort((a, b) => new Date(b.cost_date) - new Date(a.cost_date));
    setCosts(combinedCosts);

    setLoading(false);
  };

  const handleManualCostAdd = () => {
    toast({ title: "Coming Soon", description: "Manual cost entry modal will be implemented in next update." });
  };

  if (loading) return <div className="p-8 text-center">Loading Job Data...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white border-b shadow-sm mb-6">
         <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4 mb-2">
              <Button variant="ghost" size="icon" onClick={() => navigate('/staff-portal')}>
                 <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{job?.job_name}</h1>
                <p className="text-sm text-gray-500">Customer: {job?.customers?.name}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
               <Button size="sm" onClick={handleManualCostAdd} className="bg-maroon">
                  <Plus className="w-4 h-4 mr-2" /> Add Expense
               </Button>
               <Button size="sm" variant="outline" onClick={handleManualCostAdd}>
                  <Hammer className="w-4 h-4 mr-2" /> Log Labor
               </Button>
               <Button size="sm" variant="ghost">
                  <Download className="w-4 h-4 mr-2" /> Report
               </Button>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <JobCostingSummary summary={summary} />

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
           <div className="lg:col-span-1">
              <CostBreakdownChart breakdown={breakdown} />
           </div>
           
           <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {costs.slice(0, 5).map((cost) => (
                        <TableRow key={cost.id}>
                          <TableCell className="text-sm text-gray-500">{cost.cost_date}</TableCell>
                          <TableCell className="font-medium">{cost.description || '-'}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">{cost.cost_category}</Badge>
                          </TableCell>
                          <TableCell className="text-right font-bold">-${parseFloat(cost.amount).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      {costs.length === 0 && (
                        <TableRow><TableCell colSpan={4} className="text-center py-4 text-gray-500">No costs recorded.</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
};

export default JobCostingDetail;