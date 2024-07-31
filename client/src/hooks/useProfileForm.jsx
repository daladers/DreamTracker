import { useState, useEffect } from 'react';
import { Form } from 'antd';
import axios from 'axios';
import useUserIdFromJwt from './useUserIdFromJwt';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const DEFAULT_AVATAR = '/uploads/default-avatar.png';

export const useProfileForm = () => {
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const userId = useUserIdFromJwt();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching user data for userId:', userId);
      const response = await axios.get(`${API_URL}/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Raw response from server:', response);
      const userData = response.data;
      console.log('Parsed user data:', userData);
  
      setName(userData.name);
      setUsername(userData.username);
      setBio(userData.bio);
      setProfileImage(userData.userImage.startsWith('http') ? userData.userImage : `${API_URL}${userData.userImage}`);
      
      form.setFieldsValue({
        name: userData.name,
        username: userData.username,
        bio: userData.bio,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpdate = (newImagePath) => {
    console.log('Updating profile image:', newImagePath);
    setProfileImage(newImagePath);
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleBioChange = (e) => setBio(e.target.value);

  const handleSubmit = async (values) => {
    console.log('Submitting profile update with values:', { ...values, profileImage });
    try {
      const response = await axios.put(`${API_URL}/profile/${userId}`, {
        ...values,
        profileImage,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Profile update response:', response.data);
      setProfileImage(response.data.userImage);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error };
    }
  };

  return {
    form,
    name,
    username,
    bio,
    profileImage,
    isLoading,
    handleNameChange,
    handleUsernameChange,
    handleBioChange,
    handleImageUpdate,
    handleSubmit,
  };
};