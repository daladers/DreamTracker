import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const DateInput = ({ onChange }) => {
  const handleRangeChange = (dates, dateStrings) => {
    if (dates) {
      const [startDate, endDate] = dateStrings;
      onChange(startDate, endDate);
    } else {
      onChange(null, null);
    }
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={handleRangeChange} />
    </Space>
  );
};

export default DateInput;
