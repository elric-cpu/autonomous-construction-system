import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, DollarSign, PieChart, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const JobCostingSummary = ({ summary }) => {
  if (!summary) return <div className="p-4 text-center">Loading Summary...</div>;

  const {
    totalEstimatedRevenue,
    totalActualRevenue,
    totalActualCost,
    grossProfit,
    profitMargin,
    status
  } = summary;

  const getStatusColor = (s) => {
    if (s === 'Over Budget') return 'bg-red-100 text-red-800';
    if (s === 'Under Budget') return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Revenue Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalActualRevenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Est: ${totalEstimatedRevenue.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Cost Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Costs</CardTitle>
          <PieChart className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalActualCost.toLocaleString()}</div>
          <div className="mt-2">
            <Badge variant="outline" className={getStatusColor(status)}>
              {status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Gross Profit Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gross Profit</CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${grossProfit.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Revenue - Costs
          </p>
        </CardContent>
      </Card>

      {/* Margin Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
          {profitMargin >= 20 ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${profitMargin >= 20 ? 'text-green-600' : 'text-yellow-600'}`}>
            {profitMargin.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Target: 20%+
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobCostingSummary;