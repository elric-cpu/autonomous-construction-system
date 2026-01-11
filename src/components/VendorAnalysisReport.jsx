import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const VendorAnalysisReport = ({ data }) => {
  if (!data || data.length === 0) return <div className="p-8 text-center">No vendor data found.</div>;

  const topVendors = data.slice(0, 10);

  return (
    <div id="vendor-report" className="space-y-6">
       <Card>
         <CardHeader>
            <CardTitle>Top Vendors by Spend</CardTitle>
         </CardHeader>
         <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={topVendors} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="totalSpent" fill="#8884d8" name="Total Spend" />
               </BarChart>
            </ResponsiveContainer>
         </CardContent>
       </Card>

       <Card>
         <CardHeader>
           <CardTitle>Vendor Details</CardTitle>
         </CardHeader>
         <CardContent>
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>Vendor Name</TableHead>
                 <TableHead className="text-right">Transaction Count</TableHead>
                 <TableHead className="text-right">Total Spent</TableHead>
                 <TableHead className="text-right">Avg. Transaction</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {data.map((vendor, index) => (
                 <TableRow key={index}>
                   <TableCell className="font-medium">{vendor.name}</TableCell>
                   <TableCell className="text-right">{vendor.count}</TableCell>
                   <TableCell className="text-right">${vendor.totalSpent.toLocaleString()}</TableCell>
                   <TableCell className="text-right">${(vendor.totalSpent / vendor.count).toFixed(2)}</TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </CardContent>
       </Card>
    </div>
  );
};

export default VendorAnalysisReport;