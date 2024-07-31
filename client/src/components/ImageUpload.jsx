import React from 'react';
import { Upload, Image } from 'antd';
import { LoadingOutlined, PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import useImageUpload from '../hooks/useImageUpload';

const DEFAULT_AVATAR = '/uploads/default-avatar.png';

const ImageUpload = ({ currentImage, onImageUpdate }) => {
  const {
    loading,
    imageUrl,
    previewVisible,
    setPreviewVisible,
    beforeUpload,
    handleChange,
    customUpload,
    handleDelete,
  } = useImageUpload(currentImage, onImageUpdate);

  return (
    <div className="image-upload-container">
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={customUpload}
      >
        <div className="image-container">
          <img src={imageUrl} alt="avatar" className="avatar-image" />
          <div className="image-actions">
            <EyeOutlined onClick={(e) => {
              e.stopPropagation();
              setPreviewVisible(true);
            }} />
            {imageUrl !== DEFAULT_AVATAR && (
              <DeleteOutlined onClick={handleDelete} />
            )}
            <PlusOutlined />
          </div>
        </div>
      </Upload>
      <Image
        style={{ display: 'none' }}
        src={imageUrl}
        preview={{
          visible: previewVisible,
          onVisibleChange: (vis) => setPreviewVisible(vis),
        }}
      />
    </div>
  );
};

export default ImageUpload;