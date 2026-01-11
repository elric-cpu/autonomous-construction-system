import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { Loader2 } from 'lucide-react';
import { registerServiceWorker } from '@/utils/serviceWorkerUtils';
import OfflineIndicator from '@/components/OfflineIndicator';
import ProtectedRoute from '@/components/ProtectedRoute';

// Loading Fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <Loader2 className="w-8 h-8 animate-spin text-maroon" />
  </div>
);

// Lazy Load Pages
const Home = lazy(() => import('@/pages/Home'));
const ServicesOverview = lazy(() => import('@/pages/ServicesOverview'));
const WaterDamageMitigation = lazy(() => import('@/pages/services/WaterDamageMitigation'));
const MoldRemediation = lazy(() => import('@/pages/services/MoldRemediation'));
const BathroomRemodels = lazy(() => import('@/pages/services/BathroomRemodels'));
const KitchenRemodels = lazy(() => import('@/pages/services/KitchenRemodels'));
const GeneralContracting = lazy(() => import('@/pages/services/GeneralContracting'));
const ServiceArea = lazy(() => import('@/pages/ServiceArea'));
const About = lazy(() => import('@/pages/About'));
const Reviews = lazy(() => import('@/pages/Reviews'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Contact = lazy(() => import('@/pages/Contact'));
// Job request page for the digital contracting system
const JobRequest = lazy(() => import('@/pages/JobRequest'));
const Resources = lazy(() => import('@/pages/Resources'));
const ResourcesHelp = lazy(() => import('@/pages/ResourcesHelp'));
const Sitemap = lazy(() => import('@/pages/Sitemap'));

// Auth Pages
const Login = lazy(() => import('@/pages/Login'));
const SignUp = lazy(() => import('@/pages/SignUp'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const Unauthorized = lazy(() => import('@/pages/Unauthorized'));
const UserManagement = lazy(() => import('@/pages/UserManagement'));
const UserProfile = lazy(() => import('@/pages/UserProfile'));

// App Pages
const StaffPortal = lazy(() => import('@/pages/StaffPortal'));
const CreateEstimate = lazy(() => import('@/pages/CreateEstimate'));
const InvoiceDetail = lazy(() => import('@/pages/InvoiceDetail'));
const CompanySettings = lazy(() => import('@/pages/CompanySettings'));
const JobCostingDetail = lazy(() => import('@/pages/JobCostingDetail'));
const CompanyFinancialReportPage = lazy(() => import('@/pages/CompanyFinancialReportPage'));
const VendorAnalysisReportPage = lazy(() => import('@/pages/VendorAnalysisReportPage'));

// Resources
const BathroomRemodelROI = lazy(() => import('@/pages/resources/BathroomRemodelROI'));
const WaterDamageMitigationGuide = lazy(() => import('@/pages/resources/WaterDamageMitigationGuide'));
const KitchenRemodelROI = lazy(() => import('@/pages/resources/KitchenRemodelROI'));
const AgingInPlaceGuide = lazy(() => import('@/pages/resources/AgingInPlaceGuide'));
const WaterDamageInsuranceOregon = lazy(() => import('@/pages/blog/WaterDamageInsuranceOregon'));
const HiddenWaterDamageSigns = lazy(() => import('@/pages/blog/HiddenWaterDamageSigns'));

function App() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white">
          <OfflineIndicator />
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServicesOverview />} />
                <Route path="/services/water-damage-mitigation" element={<WaterDamageMitigation />} />
                <Route path="/services/mold-remediation" element={<MoldRemediation />} />
                <Route path="/services/bathroom-remodels" element={<BathroomRemodels />} />
                <Route path="/services/kitchen-remodels" element={<KitchenRemodels />} />
                <Route path="/services/general-contracting" element={<GeneralContracting />} />
                
                <Route path="/service-areas/:region/:town" element={<ServiceArea />} />
                
                <Route path="/about" element={<About />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/water-damage-insurance-oregon" element={<WaterDamageInsuranceOregon />} />
                <Route path="/blog/hidden-water-damage-signs" element={<HiddenWaterDamageSigns />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources-help" element={<ResourcesHelp />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/resources/bathroom-remodel-roi" element={<BathroomRemodelROI />} />
                <Route path="/resources/water-damage-mitigation-guide" element={<WaterDamageMitigationGuide />} />
                <Route path="/resources/kitchen-remodel-roi" element={<KitchenRemodelROI />} />
                <Route path="/resources/ada-aging-in-place-guide" element={<AgingInPlaceGuide />} />

                {/* Digital General Contracting Request Form */}
                <Route path="/request-job" element={<JobRequest />} />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* Protected Staff Routes - Basic Staff Access */}
                <Route path="/staff-portal" element={
                    <ProtectedRoute requiredRole="staff">
                        <StaffPortal />
                    </ProtectedRoute>
                } />
                <Route path="/staff-portal/profile" element={
                    <ProtectedRoute>
                        <UserProfile />
                    </ProtectedRoute>
                } />
                <Route path="/create-estimate" element={
                    <ProtectedRoute requiredPermission="create_invoices">
                        <CreateEstimate />
                    </ProtectedRoute>
                } />
                <Route path="/staff-portal/invoices/:id" element={
                    <ProtectedRoute requiredPermission="view_jobs">
                        <InvoiceDetail />
                    </ProtectedRoute>
                } />
                <Route path="/staff-portal/job-costing/:id" element={
                    <ProtectedRoute requiredPermission="view_jobs">
                        <JobCostingDetail />
                    </ProtectedRoute>
                } />

                {/* Manager & Admin Routes */}
                <Route path="/staff-portal/reports/financial" element={
                    <ProtectedRoute requiredRole="manager">
                        <CompanyFinancialReportPage />
                    </ProtectedRoute>
                } />
                <Route path="/staff-portal/reports/vendors" element={
                    <ProtectedRoute requiredRole="manager">
                        <VendorAnalysisReportPage />
                    </ProtectedRoute>
                } />
                <Route path="/staff-portal/settings" element={
                    <ProtectedRoute requiredRole="admin">
                        <CompanySettings />
                    </ProtectedRoute>
                } />
                <Route path="/staff-portal/users" element={
                    <ProtectedRoute requiredRole="admin">
                        <UserManagement />
                    </ProtectedRoute>
                } />
                
                {/* Fallback */}
                <Route path="/staff-portal/reports/*" element={
                     <ProtectedRoute requiredRole="staff"><StaffPortal /></ProtectedRoute>
                } />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;