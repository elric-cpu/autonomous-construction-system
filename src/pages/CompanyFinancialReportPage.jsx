import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportFilters from '@/components/ReportFilters';
import CompanyFinancialReport from '@/components/CompanyFinancialReport';
import { getCompanyFinancialReport } from '@/utils/reportingUtils';
import { exportReportToPDF } from '@/utils/reportPdfExport';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Download, Loader2 } from 'lucide-react';
import { startOfYear } from 'date-fns';

const CompanyFinancialReportPage = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({
    from: startOfYear(new Date()),
    to: new Date(),
  });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleApply = async () => {
    if (!dateRange?.from || !dateRange?.to) return;
    setLoading(true);
    const data = await getCompanyFinancialReport(dateRange.from.toISOString(), dateRange.to.toISOString());
    setReportData(data);
    setLoading(false);
    setHasRun(true);
  };

  const handleExport = () => {
    exportReportToPDF('financial-report', 'Company_Financial_Report.pdf');
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/staff-portal/reports')}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Company Financial Report</h1>
        </div>
        {reportData && (
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        )}
      </div>

      <ReportFilters dateRange={dateRange} setDateRange={setDateRange} onApply={handleApply} />

      {loading ? (
        <div className="flex justify-center p-12">
           <Loader2 className="animate-spin w-8 h-8 text-maroon" />
        </div>
      ) : hasRun ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
           <CompanyFinancialReport data={reportData} />
        </div>
      ) : (
        <div className="text-center p-12 text-gray-500">
           Select a date range and click "Apply Filters" to generate the report.
        </div>
      )}
    </div>
  );
};

export default CompanyFinancialReportPage;