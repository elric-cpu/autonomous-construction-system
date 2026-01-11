import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { getJobCostingSummary } from '@/utils/jobCostingUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, WifiOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { withCache } from '@/utils/apiCache';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const JobCostingList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cachedData, setCachedData] = useState(false);

  useEffect(() => {
    fetchJobsAndCosts();
  }, []);

  const fetchJobsAndCosts = async () => {
    setLoading(true);
    
    // Use the cache wrapper
    const { data: jobData, error, fromCache } = await withCache('active_jobs_summary', async () => {
       // 1. Get all active jobs
       const { data: activeJobs, error: jobError } = await supabase
        .from('jobs')
        .select('id, job_name, customers(name)')
        .eq('status', 'active');
        
       if(jobError) throw jobError;

       // 2. Calc summary for each
       const summaries = await Promise.all(
        activeJobs.map(async (job) => {
          const summary = await getJobCostingSummary(job.id);
          return { ...job, ...summary };
        })
       );
       return summaries;
    }, 15); // 15 min cache for heavy dashboard data

    if (!error && jobData) {
      setJobs(jobData);
      setCachedData(fromCache);
    }
    setLoading(false);
  };

  // Row Renderer for Virtualized List
  const Row = useCallback(({ index, style }) => {
    const job = jobs[index];
    if (!job) return null;

    return (
      <div 
        style={style} 
        className="flex items-center border-b hover:bg-gray-50 cursor-pointer text-sm px-4"
        onClick={() => navigate(`/staff-portal/job-costing/${job.id}`)}
      >
        <div className="w-[20%] truncate font-medium pr-2">{job.job_name}</div>
        <div className="w-[15%] truncate pr-2">{job.customers?.name}</div>
        <div className="w-[10%] text-right pr-2">${job.totalActualRevenue?.toLocaleString()}</div>
        <div className="w-[10%] text-right pr-2">${job.totalActualCost?.toLocaleString()}</div>
        <div className={`w-[12%] text-right font-medium pr-2 ${job.grossProfit < 0 ? 'text-red-600' : 'text-green-600'}`}>
           ${job.grossProfit?.toLocaleString()}
        </div>
        <div className="w-[10%] text-right pr-2">{job.profitMargin?.toFixed(1)}%</div>
        <div className="w-[15%] text-center px-2">
            <Badge 
              variant="outline" 
              className={
                job.status === 'Over Budget' ? 'bg-red-100 text-red-800 border-red-200' : 
                job.status === 'Under Budget' ? 'bg-green-100 text-green-800 border-green-200' : 
                'bg-blue-100 text-blue-800 border-blue-200'
              }
            >
              {job.status}
            </Badge>
        </div>
        <div className="w-[8%] text-right">
             <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowRight className="w-4 h-4" /></Button>
        </div>
      </div>
    );
  }, [jobs, navigate]);

  if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin h-8 w-8 mx-auto text-maroon" /></div>;

  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden flex flex-col h-[600px]">
      {cachedData && <div className="bg-gray-100 text-xs text-center py-1 text-gray-500 flex items-center justify-center gap-1"><WifiOff className="w-3 h-3"/> Showing cached data</div>}
      
      {/* Header - mimic table header */}
      <div className="flex items-center bg-gray-50 border-b font-medium text-sm text-gray-500 py-3 px-4">
        <div className="w-[20%]">Job Name</div>
        <div className="w-[15%]">Customer</div>
        <div className="w-[10%] text-right">Revenue</div>
        <div className="w-[10%] text-right">Cost</div>
        <div className="w-[12%] text-right">Profit</div>
        <div className="w-[10%] text-right">Margin</div>
        <div className="w-[15%] text-center">Status</div>
        <div className="w-[8%]"></div>
      </div>

      {/* Virtualized Body */}
      <div className="flex-grow">
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={jobs.length}
                itemSize={64} // Row height
                width={width}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
      </div>

      {jobs.length === 0 && (
         <div className="text-center py-8 text-gray-500">No active jobs with financial data found.</div>
      )}
    </div>
  );
};

export default JobCostingList;