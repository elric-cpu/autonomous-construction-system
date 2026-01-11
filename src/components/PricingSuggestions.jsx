import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, AlertTriangle } from 'lucide-react';
import { searchItemLibrary } from '@/utils/itemLibraryUtils';
import { Badge } from '@/components/ui/badge';

const PricingSuggestions = ({ isOpen, onClose, onSelectItem }) => {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setKeyword('');
      setSuggestions([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (keyword.length < 2) {
        setSuggestions([]);
        return;
      }
      
      setLoading(true);
      const results = await searchItemLibrary(keyword);
      setSuggestions(results);
      setLoading(false);
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Item Pricing Suggestions</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Type item name to search library..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="pl-9"
              autoFocus
            />
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="text-center p-4 text-sm text-gray-500">Searching library...</div>
            ) : suggestions.length === 0 && keyword.length >= 2 ? (
              <div className="text-center p-4 text-sm text-gray-500">No matching items found.</div>
            ) : (
              suggestions.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 cursor-pointer group"
                  onClick={() => onSelectItem(item)}
                >
                  <div>
                    <div className="font-medium text-gray-900">{item.item_name}</div>
                    <div className="text-xs text-gray-500 flex gap-2 items-center mt-1">
                      <Badge variant="secondary" className="text-[10px] h-5">{item.vendor_name}</Badge>
                      <span>Last used: {item.last_purchased_date}</span>
                      <span>({item.purchase_count} purchases)</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-maroon">${item.average_unit_cost?.toFixed(2)}</div>
                    <div className="text-xs text-gray-400">Avg Cost</div>
                  </div>
                </div>
              ))
            )}
            
            {keyword.length < 2 && (
              <div className="text-center p-8 text-gray-400 text-sm">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-20" />
                Type at least 2 characters to see pricing suggestions based on history.
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingSuggestions;