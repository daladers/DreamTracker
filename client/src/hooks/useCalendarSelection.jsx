import { useState } from 'react';

const useCalendarSelection = () => {
  const [showInput, setShowInput] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

    const close = () => {
    setShowInput(false);
    setSelectedDate(null);
    };

  const handleSelect = (date) => {
    setSelectedDate(date);
    setShowInput(true);
    console.log('Date selected:', date);
  };

  return {
    showInput,
    selectedDate,
    handleSelect,
    close,
  };
};

export default useCalendarSelection;
