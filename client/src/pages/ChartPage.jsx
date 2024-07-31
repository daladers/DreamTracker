import React, { useState } from 'react';
import Chart from '../components/Chart';
import DateInput from '../components/DateInput';
import Stats from '../components/Stats';
import useUserIdFromJwt from '../hooks/useUserIdFromJwt';

const ChartPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const userId = useUserIdFromJwt(); 

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div>
      <DateInput onChange={handleDateChange} />
      <Chart startDate={startDate} endDate={endDate} userId={userId} /> 
      <div style={{ backgroundColor: "#7077A1", borderRadius: 10, padding: 3}}>
        <Stats startDate={startDate} endDate={endDate} userId={userId} /> 
      </div>
    </div>
  );
};

export default ChartPage;
