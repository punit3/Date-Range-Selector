import React, { useState, useRef } from 'react';
import "../../styles/dates.css";
import { IconSquareRoundedX } from '@tabler/icons-react';
import DateRangePicker from '@/components/DateRangePicker';
import { rem } from '@mantine/core';

interface DateRangeProps {
  
    getRangeDates: (range: [string, string], weekends: string[], weekdays: string[]) => void;
}

const DateRangeContainer: React.FC <DateRangeProps> = ({  getRangeDates}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState<[string, string] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getToday = (): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const getFutureDate = (daysAhead: number): Date => {
    const today = getToday();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysAhead);
    return futureDate;
  };

  const getStartOfWeek = (date: Date): Date => {
    const currentDay = date.getDay();
    const distanceFromMonday = (currentDay + 6) % 7; // Ensure Monday is day 0
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - distanceFromMonday);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  };

  const getEndOfWeek = (date: Date): Date => {
    const startOfWeek = getStartOfWeek(date);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
  };
  type DateRange = {
    label: string;
    range: [Date, Date];
  };
  
  const predefinedRanges: DateRange[] = [
    {
      label: 'This Week',
      range: [getStartOfWeek(new Date()), getEndOfWeek(new Date())],
    },
    {
      label: 'Next 7 Days',
      range: [getToday(), getFutureDate(6)],
    },
    {
      label: 'Next 30 Days',
      range: [getToday(), getFutureDate(29)],
    },
  ];

  const handleDateRangeChange = (range: [string, string], weekends: string[],weekdays: string[]) => {
    
    setSelectedRange(range);
    // setShowCalendar(false);
    if (inputRef.current) {
      inputRef.current.value = `${range[0]} - ${range[1]}`;
    }

    getRangeDates(range,weekdays,weekends)
  };

  const handleInputClick = () => {
    
    setShowCalendar(!showCalendar);
  };



  const handleClearClick = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setSelectedRange(null);
  };

  const handleCloseCalendar = () => {
    
    setShowCalendar(false);
  };

  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          ref={inputRef}
          placeholder="Select a date range"
          onClick={handleInputClick}
          readOnly
          className="date-input"
        />
        {selectedRange && (
          <button
            onClick={handleClearClick}
            className="clear-button"
          >
            <IconSquareRoundedX style={{ width: rem(30), height: rem(30) }}
                        stroke={1.5}
                        color="#524e4e"/>
          </button>
        )}
      </div>
      {showCalendar && (
        <div className="calendar-popup">

          <DateRangePicker
            predefinedRanges={predefinedRanges}
            onChange={handleDateRangeChange}
            handleCloseCalendar={handleCloseCalendar}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeContainer;
