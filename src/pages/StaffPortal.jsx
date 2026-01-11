import React, { useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Upload, FileText, LogOut, PackageSearch, FileSpreadsheet, Settings, PieChart, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

import StaffDashboard from '@/components/StaffDashboard';
import ReceiptUpload from '@/components/ReceiptUpload';
import ReceiptExtraction from '@/components/ReceiptExtraction';
import ItemLibrary from '@/components/ItemLibrary';
import InvoiceList from '@/components/InvoiceList';
import JobCostingDashboard from '@/pages/JobCostingDashboard';
import ReportingDashboard from '@/pages/ReportingDashboard';

const StaffPortal = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [extractedData, setExtractedData] = useState(null);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleExtractionComplete = (data) => {
    setExtractedData(data);
    setActiveTab("process");
  };

  const handleSaveComplete = () => {
    setExtractedData(null);
    setActiveTab("dashboard");
  };

  // Determine if we should show a specific sub-page or the main portal tabs
  // If the URL matches /staff-portal/reports/*, we might want to handle it differently, 
  // but for now, we are keeping the reporting dashboard inside a Tab for simplicity in the main view
  // or routing to separate pages for detailed reports (which App.jsx handles).
  
  return (
    <>
      <SEO title="Staff Portal | Benson Home Solutions" />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Portal Header */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-maroon">Staff Portal</span>
              <span className="text-sm px-2 py-1 bg-gray-100 rounded text-gray-600">Phase 5.0</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/staff-portal/settings')} title="Company Settings">
                <Settings className="w-5 h-5 text-gray-600" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/create-estimate')}>
                 <FileSpreadsheet className="w-4 h-4 mr-2" />
                 New Estimate
              </Button>
              <div className="h-6 w-px bg-gray-300 mx-2 hidden sm:block"></div>
              <span className="text-sm text-gray-500 hidden sm:block">Logged in as {user.email}</span>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white border p-1 h-auto flex-wrap">
              <TabsTrigger value="dashboard" className="px-6 py-2">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="costing" className="px-6 py-2">
                <PieChart className="w-4 h-4 mr-2" />
                Job Costing
              </TabsTrigger>
              <TabsTrigger value="reports" className="px-6 py-2">
                <BarChart className="w-4 h-4 mr-2" />
                Reports
              </TabsTrigger>
              <TabsTrigger value="invoices" className="px-6 py-2">
                <FileText className="w-4 h-4 mr-2" />
                Invoices
              </TabsTrigger>
              <TabsTrigger value="library" className="px-6 py-2">
                <PackageSearch className="w-4 h-4 mr-2" />
                Item Library
              </TabsTrigger>
              <TabsTrigger value="upload" className="px-6 py-2">
                <Upload className="w-4 h-4 mr-2" />
                Upload Receipt
              </TabsTrigger>
              <TabsTrigger value="process" className="px-6 py-2" disabled={!extractedData}>
                <FileText className="w-4 h-4 mr-2" />
                Process Data
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4">
              <StaffDashboard />
            </TabsContent>

            <TabsContent value="costing" className="space-y-4">
              <JobCostingDashboard />
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <ReportingDashboard />
            </TabsContent>

            <TabsContent value="invoices" className="space-y-4">
              <InvoiceList />
            </TabsContent>

            <TabsContent value="library" className="space-y-4">
              <ItemLibrary />
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <div className="bg-white p-8 rounded-lg border shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Upload New Receipt</h2>
                <ReceiptUpload onExtractionComplete={handleExtractionComplete} />
              </div>
            </TabsContent>

            <TabsContent value="process" className="space-y-4">
              {extractedData ? (
                <ReceiptExtraction 
                  extractedData={extractedData} 
                  onSaveComplete={handleSaveComplete}
                  onCancel={() => setActiveTab("upload")}
                />
              ) : (
                <div className="text-center p-8">No data to process. Please upload a receipt first.</div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default StaffPortal;