import React, { useState } from 'react';
import Chart from '../components/Chart';
import DateInput from '../components/DateInput';
import Stats from '../components/Stats';
import useUserIdFromJwt from '../hooks/useUserIdFromJwt'; // Import the hook to get user_id from JWT

const ChartPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const userId = useUserIdFromJwt(); // Get user_id from JWT token

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div>
      <DateInput onChange={handleDateChange} />
      <Chart startDate={startDate} endDate={endDate} userId={userId} /> {/* Pass userId to Chart */}
      <div style={{ backgroundColor: "#7077A1", borderRadius: 10, padding: 3}}>
        <Stats startDate={startDate} endDate={endDate} userId={userId} /> {/* Pass userId to Stats */}
      </div>
    </div>
  );
};

export default ChartPage;
