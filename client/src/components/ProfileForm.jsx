import React, { useState } from "react";
import { Form, Input, Button, Alert, Spin } from "antd";
import { useProfileForm } from "../hooks/useProfileForm";
import ImageUpload from "../components/ImageUpload";

const ProfileForm = () => {
  const {
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
  } = useProfileForm();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = async (values) => {
    const result = await handleSubmit(values);
    if (result.success) {
      setSuccessMessage("Profile updated successfully!");
      setErrorMessage("");
    } else {
      setErrorMessage("Failed to update profile. Please try again.");
      setSuccessMessage("");
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={{ background: "#7077A1", borderRadius: 10, padding: 20 }}
    >
      {successMessage && <Alert message={successMessage} type="success" style={{ marginBottom: 16 }} />}
      {errorMessage && <Alert message={errorMessage} type="error" style={{ marginBottom: 16 }} />}
      
      <Form.Item label="Profile Picture">
        <ImageUpload 
          currentImage={profileImage} 
          onImageUpdate={handleImageUpdate} 
        />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: "Please input your username!" },
          { type: "string", message: "Please enter a valid username!" }
        ]}
      >
        <Input value={username} onChange={handleUsernameChange} />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input value={name} onChange={handleNameChange} />
      </Form.Item>
      <Form.Item
        label="Bio"
        name="bio"
      >
        <Input.TextArea value={bio} onChange={handleBioChange} rows={4} />
      </Form.Item>
      <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
        <Button type="primary" htmlType="submit">
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;