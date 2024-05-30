// src/hooks/useDreamInput.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import useUserIdFromJwt from './useUserIdFromJwt.jsx';

const useDreamInput = (selectedDate, selectedReaction) => {
  const [inputValue, setInputValue] = useState('');
  const [noteId, setNoteId] = useState(null); // Add state for noteId
  const userId = useUserIdFromJwt();
  const token = localStorage.getItem('token'); // Retrieve JWT token

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
            setNoteId(response.data[0].note_id); // Set the noteId
          } else {
            setInputValue(''); // Clear input if no note is found
            setNoteId(null); // Clear noteId if no note is found
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
        reactions: selectedReaction, // Save the selected reaction
        date: selectedDate,
        user_id: userId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Dream saved:', response.data);
      setInputValue(''); // Clear input after saving
      setNoteId(response.data.note_id); // Update noteId after saving
    } catch (error) {
      console.error('Error saving dream:', error);
    }
  };

  return {
    inputValue,
    handleChange,
    handleSaveDream,
    noteId, // Return noteId
  };
};

export default useDreamInput;
