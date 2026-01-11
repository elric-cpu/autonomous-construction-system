import React from 'react';
import JobCostingList from '@/components/JobCostingList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';

const JobCostingDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Financial Overview</h2>
        <p className="text-gray-500">Real-time profitability tracking across all active jobs.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
             <CardTitle className="text-sm font-medium text-gray-500">Avg. Profit Margin</CardTitle>
             <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">24.5%</div>
             <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
             <CardTitle className="text-sm font-medium text-gray-500">Active Revenue</CardTitle>
             <DollarSign className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">$142,500</div>
             <p className="text-xs text-muted-foreground">Across 8 active jobs</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
             <CardTitle className="text-sm font-medium text-gray-500">Active Costs</CardTitle>
             <Activity className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">$108,200</div>
             <p className="text-xs text-muted-foreground">Current burn rate</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Active Jobs Performance</h3>
        <JobCostingList />
      </div>
    </div>
  );
};

export default JobCostingDashboard;