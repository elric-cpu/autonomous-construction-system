import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, PackageOpen } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import ItemDetail from './ItemDetail';

const ItemLibrary = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      let query = supabase
        .from('items')
        .select('*')
        .order('item_name', { ascending: true });

      if (search) {
        query = query.ilike('item_name', `%${search}%`);
      }

      const { data, error } = await query.limit(50); // Limit for performance

      if (!error) {
        setItems(data);
      }
      setLoading(false);
    };

    // Debounce search
    const timer = setTimeout(() => {
      fetchItems();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  if (selectedItem) {
    return <ItemDetail item={selectedItem} onClose={() => setSelectedItem(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Item Library</h2>
        <Button className="bg-maroon hover:bg-maroon/90">
          <PackageOpen className="w-4 h-4 mr-2" />
          Add Manual Item
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search items by name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Last Vendor</TableHead>
              <TableHead>Avg. Cost</TableHead>
              <TableHead>Last Cost</TableHead>
              <TableHead>Last Purchased</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-maroon" />
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No items found. Upload receipts to populate library.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow 
                  key={item.id} 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedItem(item)}
                >
                  <TableCell className="font-medium">{item.item_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">{item.category}</Badge>
                  </TableCell>
                  <TableCell>{item.vendor_name}</TableCell>
                  <TableCell>${item.average_unit_cost?.toFixed(2)}</TableCell>
                  <TableCell>${item.last_unit_cost?.toFixed(2)}</TableCell>
                  <TableCell>{item.last_purchased_date}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ItemLibrary;