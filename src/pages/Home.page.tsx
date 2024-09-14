import React from 'react';
import DateRangeContainer from '@/components/DateRangePicker/DateRangeContainer';

const HomePage: React.FC = () => {

const getRangeDates=(range: [string, string], weekdays: string[],weekends: string[])=>{
  console.log("---Selected Range-->",range)
  console.log("---Weekend Dates-->",weekends)
  
  console.log("---Weekdays Dates-->",weekdays)
  
  
}
  return (
    <div>
      <h1>Date Range Picker</h1>
      <div className='range-container'>
      <DateRangeContainer getRangeDates={getRangeDates}/>
      </div>
      
    </div>
  );
};

export default HomePage;
