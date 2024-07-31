import { useState, useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';
import useUserIdFromJwt from './useUserIdFromJwt';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const DEFAULT_AVATAR = '/uploads/default-avatar.png';

const useImageUpload = (currentImage, onImageUpdate) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const userId = useUserIdFromJwt();

  useEffect(() => {
    if (currentImage) {
      setImageUrl(currentImage.startsWith('http') ? currentImage : `${API_URL}${currentImage}`);
    } else {
      setImageUrl(DEFAULT_AVATAR);
    }
  }, [currentImage]);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        onImageUpdate(info.file.response.imagePath);
      });
    }
  };

  const customUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('userImage', file);

    try {
      const response = await axios.put(`${API_URL}/image/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSuccess(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      onError(error);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setLoading(true);

    try {
      const response = await axios.delete(`${API_URL}/image/${userId}`);
      
      if (response.status === 200) {
        setImageUrl(DEFAULT_AVATAR);
        onImageUpdate(DEFAULT_AVATAR);
        message.success('Image deleted successfully');
      } else {
        throw new Error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      message.error('Failed to delete image');
    } finally {
      setLoading(false);
    }
  };


  return {
    loading,
    imageUrl,
    previewVisible,
    setPreviewVisible,
    beforeUpload,
    handleChange,
    customUpload,
    handleDelete,
  };
};

export default useImageUpload;