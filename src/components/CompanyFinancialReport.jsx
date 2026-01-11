import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, Activity, Loader2 } from 'lucide-react';
import { ResponsiveContainer } from 'recharts';

// Lazy load Recharts components to reduce initial bundle
const LineChart = React.lazy(() => import('recharts').then(module => ({ default: module.LineChart })));
const Line = React.lazy(() => import('recharts').then(module => ({ default: module.Line })));
const XAxis = React.lazy(() => import('recharts').then(module => ({ default: module.XAxis })));
const YAxis = React.lazy(() => import('recharts').then(module => ({ default: module.YAxis })));
const CartesianGrid = React.lazy(() => import('recharts').then(module => ({ default: module.CartesianGrid })));
const Tooltip = React.lazy(() => import('recharts').then(module => ({ default: module.Tooltip })));
const Legend = React.lazy(() => import('recharts').then(module => ({ default: module.Legend })));

const CompanyFinancialReport = memo(({ data }) => {
  if (!data) return <div className="p-8 text-center">No data available for selected range.</div>;

  const { totalRevenue, totalCosts, grossProfit, profitMargin, chartData } = data;

  return (
    <div id="financial-report" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-t-4 border-t-blue-500">
           <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500 font-medium">Total Revenue</CardTitle></CardHeader>
           <CardContent>
              <div className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
           </CardContent>
        </Card>
        <Card className="border-t-4 border-t-red-500">
           <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500 font-medium">Total Costs</CardTitle></CardHeader>
           <CardContent>
              <div className="text-2xl font-bold text-gray-900">${totalCosts.toLocaleString()}</div>
           </CardContent>
        </Card>
        <Card className="border-t-4 border-t-green-500">
           <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500 font-medium">Gross Profit</CardTitle></CardHeader>
           <CardContent>
              <div className="text-2xl font-bold text-gray-900">${grossProfit.toLocaleString()}</div>
           </CardContent>
        </Card>
        <Card className={`border-t-4 ${profitMargin >= 20 ? 'border-t-green-600' : 'border-t-yellow-500'}`}>
           <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500 font-medium">Net Margin</CardTitle></CardHeader>
           <CardContent>
              <div className="text-2xl font-bold text-gray-900">{profitMargin.toFixed(1)}%</div>
           </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
           <CardTitle>Revenue vs. Cost Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
           <React.Suspense fallback={<div className="h-full w-full flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" activeDot={{ r: 8 }} name="Revenue" />
                  <Line type="monotone" dataKey="costs" stroke="#ef4444" name="Costs" />
               </LineChart>
             </ResponsiveContainer>
           </React.Suspense>
        </CardContent>
      </Card>
    </div>
  );
});

export default CompanyFinancialReport;