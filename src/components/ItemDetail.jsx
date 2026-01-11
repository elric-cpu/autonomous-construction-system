import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Loader2, TrendingUp, DollarSign, Calendar, Tag } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ItemDetail = ({ item, onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('item_price_history')
        .select('*')
        .eq('item_id', item.id)
        .order('purchase_date', { ascending: false });

      if (!error) {
        setHistory(data);
      }
      setLoading(false);
    };

    if (item?.id) {
      fetchHistory();
    }
  }, [item]);

  if (!item) return null;

  // Simple Price Chart Logic
  const maxPrice = Math.max(...history.map(h => h.unit_cost), item.max_unit_cost || 0, 1);
  const chartData = history.slice(0, 10).reverse(); // Last 10 purchases for chart

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{item.item_name}</h2>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary">{item.category || 'Uncategorized'}</Badge>
            <Badge variant="outline">{item.vendor_name || 'Multiple Vendors'}</Badge>
          </div>
        </div>
        <Button variant="ghost" onClick={onClose}>Close</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Cost</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">${item.average_unit_cost?.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Last Cost</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">${item.last_unit_cost?.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">on {item.last_purchased_date}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Price Range</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-lg font-bold">
              ${item.min_unit_cost?.toFixed(2)} - ${item.max_unit_cost?.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Purchases</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{item.purchase_count}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price History Trend</CardTitle>
          <CardDescription>Unit cost over last 10 purchases</CardDescription>
        </CardHeader>
        <CardContent>
           {/* Simple CSS Bar Chart */}
           <div className="h-48 flex items-end gap-2 border-b border-l border-gray-200 p-2">
              {chartData.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No history data</div>
              ) : (
                chartData.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end group relative">
                    <div 
                      className="bg-maroon/80 hover:bg-maroon transition-all rounded-t w-full"
                      style={{ height: `${(h.unit_cost / maxPrice) * 100}%` }}
                    ></div>
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                      ${h.unit_cost?.toFixed(2)} - {h.purchase_date}
                    </div>
                  </div>
                ))
              )}
           </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {loading ? (
              <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Unit Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((h) => (
                    <TableRow key={h.id}>
                      <TableCell>{h.purchase_date}</TableCell>
                      <TableCell>{h.vendor_name}</TableCell>
                      <TableCell>${h.unit_cost?.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  {history.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-gray-500">No history available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemDetail;