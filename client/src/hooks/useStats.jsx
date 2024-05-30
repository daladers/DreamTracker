import { useState, useEffect } from 'react';
import axios from 'axios';

const useStats = (startDate, endDate, user_id) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/stats/get', {
          params: { startDate, endDate, user_id },
        });
        setStats(response.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    if (startDate && endDate) {
      fetchStats();
    }
  }, [startDate, endDate, user_id]);

  return { stats, loading, error };
};

export default useStats;
