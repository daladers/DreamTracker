import { useState, useEffect } from 'react';
import axios from 'axios';

const useInterpretations = (noteId) => {
  const [interpretations, setInterpretations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterpretations = async () => {
      if (!noteId) {
        setInterpretations([]);
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/note/getInterpretation/${noteId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInterpretations(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterpretations();
  }, [noteId]);

  return { interpretations, loading, error };
};

export default useInterpretations;
