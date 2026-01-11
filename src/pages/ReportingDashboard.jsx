import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, PieChart, TrendingUp, Users, DollarSign, Hammer } from 'lucide-react';

const ReportingDashboard = () => {
  const navigate = useNavigate();

  const reports = [
    {
      title: "Company Financials",
      desc: "Profit & Loss overview, revenue trends, and margin analysis.",
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      link: "/staff-portal/reports/financial"
    },
    {
      title: "Vendor Analysis",
      desc: "Track spending by vendor and analyze supply costs.",
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      link: "/staff-portal/reports/vendors"
    },
    {
      title: "Job Performance",
      desc: "Compare profitability across all active and completed jobs.",
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      link: "/staff-portal/reports/jobs"
    },
    {
      title: "Cost Trends",
      desc: "Deep dive into material vs. labor vs. equipment costs.",
      icon: <PieChart className="w-8 h-8 text-orange-600" />,
      link: "/staff-portal/reports/costs"
    },
    {
      title: "Labor Analysis",
      desc: "Productivity tracking and labor cost distribution.",
      icon: <Hammer className="w-8 h-8 text-gray-600" />,
      link: "/staff-portal/reports/labor"
    },
    {
      title: "Customer Insights",
      desc: "Identify your most valuable clients and referral sources.",
      icon: <Users className="w-8 h-8 text-teal-600" />,
      link: "/staff-portal/reports/customers"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reporting Hub</h2>
        <p className="text-muted-foreground">Select a report to generate insights.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(report.link)}>
            <CardHeader className="flex flex-row items-center gap-4">
               <div className="p-3 bg-gray-50 rounded-full">
                  {report.icon}
               </div>
               <div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
               </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">{report.desc}</CardDescription>
              <Button variant="ghost" className="mt-4 w-full justify-start pl-0 text-maroon hover:text-maroon/80 hover:bg-transparent">
                View Report &rarr;
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportingDashboard;