import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useUserIdFromJwt = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Adjust the key as per your local storage setup
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id; // Adjust the key as per your JWT structure
        setUserId(userId);
        console.log('User ID:', userId);
      } catch (error) {
        console.error('Failed to decode JWT', error);
        setUserId(null);
      }
    } else {
      setUserId(null);
    }
  }, []);

  return userId;
};

export default useUserIdFromJwt;
