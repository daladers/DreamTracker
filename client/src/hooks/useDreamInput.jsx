import { useState, useEffect } from 'react';
import axios from 'axios';
import useUserIdFromJwt from './useUserIdFromJwt.jsx';

const useDreamInput = (selectedDate, selectedReaction) => {
  const [inputValue, setInputValue] = useState('');
  const [noteId, setNoteId] = useState(null); 
  const userId = useUserIdFromJwt();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchNote = async () => {
      if (userId && selectedDate) {
        try {
          const response = await axios.get('http://localhost:5000/note/getNote', {
            params: { userId, date: selectedDate },
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data && response.data.length > 0 && response.data[0].text) {
            setInputValue(response.data[0].text);
            setNoteId(response.data[0].note_id);
          } else {
            setInputValue(''); 
            setNoteId(null);
          }
        } catch (error) {
          console.error('Error fetching note:', error);
        }
      }
    };
    fetchNote();
  }, [userId, selectedDate, token]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveDream = async () => {
    try {
      const response = await axios.post('http://localhost:5000/note/save', {
        text: inputValue,
        reactions: selectedReaction, 
        date: selectedDate,
        user_id: userId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Dream saved:', response.data);
      setInputValue(response.data.text);
      setNoteId(response.data.note_id);
    } catch (error) {
      console.error('Error saving dream:', error);
    }
  };

  return {
    inputValue,
    handleChange,
    handleSaveDream,
    noteId, 
  };
};

export default useDreamInput;
