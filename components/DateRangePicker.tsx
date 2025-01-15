'use client';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { DateRange } from 'react-day-picker';

export default function DateRangePicker() {
  return (
    <CalendarDateRangePicker
      range={undefined}
      setRange={(range: DateRange | undefined) => {}}
    />
  );
}
