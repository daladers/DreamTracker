// src/components/Calendar.js
import React from 'react';
import { Calendar as AntCalendar } from 'antd';

const headerRender = () => null;

const Calendar = ({ onSelect }) => {
    return <AntCalendar itemActiveBg={"#424769"} fullscreen={false} onSelect={onSelect} headerRender={headerRender}/>;
};

export default Calendar;
