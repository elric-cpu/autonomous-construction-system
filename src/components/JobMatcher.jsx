import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Check, Search, Building, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const JobMatcher = ({ extractedText, onSelectJob }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    // Attempt to auto-detect job from text (very basic heuristic)
    // In a real app, you'd fuzzy match extractedText against job names
    if (extractedText) {
      // Find potential PO numbers like PO-1234
      const poMatch = extractedText.match(/PO-?(\d{4})/i);
      if (poMatch) {
        setSearchTerm(poMatch[0]);
      }
    }
  }, [extractedText]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      let query = supabase
        .from('jobs')
        .select(`
          id, 
          job_name, 
          po_number, 
          status,
          customers ( name )
        `)
        .eq('status', 'active'); // Only match active jobs

      if (searchTerm) {
        query = query.or(`job_name.ilike.%${searchTerm}%,po_number.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query.limit(5);

      if (!error && data) {
        setJobs(data);
      }
      setLoading(false);
    };

    // Debounce basic search
    const timer = setTimeout(() => {
      fetchJobs();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSelect = (job) => {
    setSelectedJobId(job.id);
    onSelectJob(job);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search jobs by name or PO number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <ScrollArea className="h-[300px] rounded-md border p-2 bg-gray-50">
        {loading && <div className="p-4 text-center text-sm text-gray-500">Searching jobs...</div>}
        
        {!loading && jobs.length === 0 && (
          <div className="p-4 text-center text-sm text-gray-500">No active jobs found matching your search.</div>
        )}

        <div className="space-y-2">
          {jobs.map((job) => (
            <Card 
              key={job.id} 
              className={`cursor-pointer transition-all hover:border-maroon ${selectedJobId === job.id ? 'border-maroon ring-1 ring-maroon bg-maroon/5' : ''}`}
              onClick={() => handleSelect(job)}
            >
              <CardContent className="p-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{job.job_name}</span>
                    {job.po_number && (
                      <Badge variant="outline" className="text-xs">{job.po_number}</Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-4">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {job.customers?.name || 'Unknown Client'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      Active
                    </span>
                  </div>
                </div>
                {selectedJobId === job.id && (
                  <div className="bg-maroon text-white rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      <div className="pt-2">
        <Button 
          variant="outline" 
          className="w-full text-gray-500"
          onClick={() => {
            setSelectedJobId(null);
            onSelectJob(null);
          }}
        >
          Skip Matching (Save as Unmatched)
        </Button>
      </div>
    </div>
  );
};

export default JobMatcher;