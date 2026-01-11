import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CostBreakdownChart = ({ breakdown }) => {
  if (!breakdown) return null;

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
  
  // Calculate percentages
  const data = Object.entries(breakdown).map(([category, amount]) => ({
    category,
    amount,
    percentage: total > 0 ? (amount / total) * 100 : 0
  }));

  // Sort by amount descending
  data.sort((a, b) => b.amount - a.amount);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Cost Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.category} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.category}</span>
                <span className="text-gray-500">${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-maroon" 
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 text-right">{item.percentage.toFixed(1)}%</div>
            </div>
          ))}
          {total === 0 && <div className="text-center text-gray-400 py-8">No costs recorded yet.</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdownChart;