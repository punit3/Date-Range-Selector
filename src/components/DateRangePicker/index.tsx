
import { IconPlayerTrackNextFilled, IconPlayerTrackPrevFilled } from '@tabler/icons-react';
import React, { useState} from 'react';
import { rem } from '@mantine/core';

interface DateRangePickerProps {
    predefinedRanges?: { label: string, range: [Date, Date] }[];
    onChange: (range: [string, string], weekends: string[], weekdays: string[]) => void;
    handleCloseCalendar: () => void;
}

const getNextMonth = (currentMonth: number) => (currentMonth + 1) % 12;
const getPrevMonth = (currentMonth: number) => (currentMonth - 1 + 12) % 12;
const getNextYear = (currentMonth: number, currentYear: number) => (currentMonth === 11 ? currentYear + 1 : currentYear);
const getPrevYear = (currentMonth: number, currentYear: number) => (currentMonth === 0 ? currentYear - 1 : currentYear);

const DateRangePicker: React.FC<DateRangePickerProps> = ({ predefinedRanges, onChange, handleCloseCalendar }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [firstCalendarMonth, setFirstCalendarMonth] = useState<number>(new Date().getMonth());
    const [firstCalendarYear, setFirstCalendarYear] = useState<number>(new Date().getFullYear());
    const [secondCalendarMonth, setSecondCalendarMonth] = useState<number>(getNextMonth(new Date().getMonth()));
    const [secondCalendarYear, setSecondCalendarYear] = useState<number>(getNextYear(new Date().getMonth(), new Date().getFullYear()));

    const resetTime = (date: Date) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        return newDate;
    };

    const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

    const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getDayClass = (day: Date) => {
        // debugger
        const normalizedDay = resetTime(day);
        const normalizedStartDate = startDate ? resetTime(startDate) : null;
        const normalizedEndDate = endDate ? resetTime(endDate) : null;

        if (normalizedStartDate && normalizedEndDate && normalizedDay >= normalizedStartDate && normalizedDay <= normalizedEndDate && !isWeekend(day)) {
            return 'selected-range';
        }
        if (normalizedStartDate && normalizedDay.getTime() === normalizedStartDate.getTime()) return 'selected';
        if (normalizedEndDate && normalizedDay.getTime() === normalizedEndDate.getTime()) return 'selected';
        if (isWeekend(day)) return 'weekend';
        return '';
    };

    const handleDateClick = (day: Date) => {
        // debugger
        const normalizedDay = resetTime(day);
        if (isWeekend(normalizedDay)) return;

        if (!startDate || (startDate && endDate)) {
            setStartDate(normalizedDay);
            setEndDate(null);
        } else if (startDate && !endDate) {
            const normalizedStartDate = resetTime(startDate);
            if (normalizedDay >= normalizedStartDate) {
                setEndDate(normalizedDay);
                const weekendsInRange = getWeekendDates(normalizedStartDate, normalizedDay);
                const weekdaysInRange = getWeekdayDates(normalizedStartDate, normalizedDay);

                onChange([formatDate(normalizedStartDate), formatDate(normalizedDay)], weekendsInRange, weekdaysInRange);
            } else {
                setStartDate(normalizedDay);
                setEndDate(null);
            }
        }
    };

    const getWeekendDates = (start: Date, end: Date): string[] => {
        const weekendDates: string[] = [];
        let currentDate = new Date(start);
        currentDate.setHours(0, 0, 0, 0);

        const endDate = new Date(end);
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() + 1);

        while (currentDate < endDate) {
            if (isWeekend(currentDate)) {
                weekendDates.push(formatDate(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return weekendDates;
    };

    const getWeekdayDates = (start: Date, end: Date): string[] => {
        const weekdayDates: string[] = [];
        let currentDate = new Date(start);
        currentDate.setHours(0, 0, 0, 0);

        const endDate = new Date(end);
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() + 1);

        while (currentDate < endDate) {
            if (!isWeekend(currentDate)) {
                weekdayDates.push(formatDate(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        // console.log("---weekday", weekdayDates)
        return weekdayDates;
    };

    const renderDays = (month: number, year: number) => {
        const totalDays = daysInMonth(month, year);
        const days = [];
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(year, month, day);
            days.push(
                <button
                    key={day}
                    className={`day ${getDayClass(date)}`}
                    onClick={() => handleDateClick(date)}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    const handleMonthChange = (direction: 'prev' | 'next', calendar: 'first' | 'second') => {
        if (calendar === 'first') {
            let newMonth1 = direction === 'next' ? getNextMonth(firstCalendarMonth) : getPrevMonth(firstCalendarMonth);
            let newYear1 = direction === 'next' ? getNextYear(firstCalendarMonth, firstCalendarYear) : getPrevYear(firstCalendarMonth, firstCalendarYear);
            let newMonth2 = direction === 'next' ? getNextMonth(secondCalendarMonth) : getPrevMonth(firstCalendarMonth);
            let newYear2 = direction === 'next' ? getNextYear(secondCalendarMonth, secondCalendarYear) : getPrevYear(firstCalendarMonth, firstCalendarYear);
            // debugger
            // first calendar update
            setFirstCalendarMonth(newMonth1);
            setFirstCalendarYear(newYear1);

            //  second calendar  update
            if (direction === 'next') {
                if (((firstCalendarMonth + 1) % 12) == secondCalendarMonth) {
                    if (newMonth1 === 11) {
                        setSecondCalendarMonth(newMonth2);
                        setSecondCalendarYear(newYear2);
                    } else {
                        setSecondCalendarMonth(newMonth2);
                        setSecondCalendarYear(newYear2);


                    }
                }
            }

        } else if (calendar === 'second') {
            let newMonth1 = direction === 'next' ? getNextMonth(firstCalendarMonth) : getPrevMonth(firstCalendarMonth);
            let newYear1 = direction === 'next' ? getNextYear(firstCalendarMonth, firstCalendarYear) : getPrevYear(firstCalendarMonth, firstCalendarYear);
            let newMonth2 = direction === 'next' ? getNextMonth(secondCalendarMonth) : getPrevMonth(secondCalendarMonth);
            let newYear2 = direction === 'next' ? getNextYear(secondCalendarMonth, secondCalendarYear) : getPrevYear(secondCalendarMonth, secondCalendarYear);
            // debugger

            //  second calendar  update
            setSecondCalendarMonth(newMonth2);
            setSecondCalendarYear(newYear2);

            // first calendar update
            if (direction === 'prev') {
                if (((firstCalendarMonth + 1) % 12) == secondCalendarMonth) {
                    if (newMonth1 === 11) {
                        setFirstCalendarMonth(newMonth1);
                        setFirstCalendarYear(newYear1);
                    } else {
                        setFirstCalendarMonth(newMonth1);
                        setFirstCalendarYear(newYear1);


                    }
                }
            }
        }
    };




    const handlePredefinedRangeClick = (range: [Date, Date]) => {
        // debugger
        const normalizedStart = resetTime(range[0]);
        const normalizedEnd = resetTime(range[1]);
        setStartDate(normalizedStart);
        setEndDate(normalizedEnd);


        const weekdaysInRange = getWeekdayDates(normalizedStart, normalizedEnd);


        if (weekdaysInRange.length > 0) {
            const newStartDate = new Date(weekdaysInRange[0]);
            const newEndDate = new Date(weekdaysInRange[weekdaysInRange.length - 1]);

            setStartDate(newStartDate);
            setEndDate(newEndDate);

            const weekendsInRange = getWeekendDates(normalizedStart, normalizedEnd);
            onChange([formatDate(newStartDate), formatDate(newEndDate)], weekendsInRange, weekdaysInRange);
            handleCloseCalendar()
        }
    };

    const renderDayNames = (month: number, year: number) => {
        const startOfWeek = new Date(year, month, 1).getDay();
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const adjustedDayNames = [...dayNames.slice(startOfWeek), ...dayNames.slice(0, startOfWeek)];

        return (
            <div className="day-names-grid">
                {adjustedDayNames.map(dayName => (
                    <div key={dayName} className="day-name">
                        {dayName}
                    </div>
                ))}
            </div>


        );
    };


    return (
        <div>
            <div className="date-range-picker">
                <div className="calendar-container">
                    <div className="calendar-header">
                        <IconPlayerTrackPrevFilled
                            style={{ width: rem(20), height: rem(20) }}
                            stroke={1.5}
                            color="#525252"
                            onClick={() => handleMonthChange('prev', 'first')}
                        />
                        <div className="month-calendar">
                            <h3>{new Date(firstCalendarYear, firstCalendarMonth).toLocaleString('default', { month: 'long' })} {firstCalendarYear}</h3>

                        </div>
                        <IconPlayerTrackNextFilled
                            style={{ width: rem(20), height: rem(20) }}
                            stroke={1.5}
                            color="#525252"
                            onClick={() => handleMonthChange('next', 'first')}
                        />


                    </div>

                    <div className="month-calendar">
                        {renderDayNames(firstCalendarMonth, firstCalendarYear)}
                        <div className="days-grid">
                            {renderDays(firstCalendarMonth, firstCalendarYear)}
                        </div>
                    </div>
                </div>
                <div className="calendar-container">
                    <div className="calendar-header">
                        <IconPlayerTrackPrevFilled
                            style={{ width: rem(20), height: rem(20) }}
                            stroke={1.5}
                            color="#525252"
                            onClick={() => handleMonthChange('prev', 'second')}
                        />
                        <div className="month-calendar">
                            <h3>{new Date(secondCalendarYear, secondCalendarMonth).toLocaleString('default', { month: 'long' })} {secondCalendarYear}</h3>

                        </div>
                        <IconPlayerTrackNextFilled
                            style={{ width: rem(20), height: rem(20) }}
                            stroke={1.5}
                            color="#525252"
                            onClick={() => handleMonthChange('next', 'second')}
                        />


                    </div>

                    <div className="month-calendar">
                        {renderDayNames(secondCalendarMonth, secondCalendarYear)}
                        <div className="days-grid">
                            {renderDays(secondCalendarMonth, secondCalendarYear)}
                        </div>
                    </div>
                   

                </div>

            </div>
            <div className="predefined-ranges">
                {predefinedRanges?.map((range, index) => (
                    <button className='predefined-option' key={index} onClick={() => handlePredefinedRangeClick(range.range)}>
                        {range.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DateRangePicker;
