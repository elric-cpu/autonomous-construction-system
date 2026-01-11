import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarPlus as CalendarIcon, Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, subDays, startOfMonth, endOfMonth, startOfYear } from 'date-fns';
import { cn } from '@/lib/utils';

const ReportFilters = ({ dateRange, setDateRange, onApply }) => {
  
  const handlePresetChange = (val) => {
    const today = new Date();
    let start, end;

    switch(val) {
        case 'this_month':
            start = startOfMonth(today);
            end = endOfMonth(today);
            break;
        case 'last_30':
            start = subDays(today, 30);
            end = today;
            break;
        case 'this_year':
            start = startOfYear(today);
            end = today;
            break;
        default:
            return;
    }
    setDateRange({ from: start, to: end });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg border shadow-sm mb-6">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Filter className="w-4 h-4" />
        Filters:
      </div>

      <Select onValueChange={handlePresetChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Date Preset" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="this_month">This Month</SelectItem>
          <SelectItem value="last_30">Last 30 Days</SelectItem>
          <SelectItem value="this_year">Year to Date</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
         <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
      </div>

      <Button onClick={onApply} className="bg-maroon hover:bg-maroon/90 ml-auto">
        Apply Filters
      </Button>
    </div>
  );
};

export default ReportFilters;