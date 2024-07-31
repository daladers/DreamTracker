import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useRegisterForm } from "../hooks/useRegisterForm";

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    form,
    username,
    password,
    email,
    name,
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleNameChange,
    handleSubmit,
  } = useRegisterForm();

  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = async (values) => {
    const result = await handleSubmit({ ...values, name });
    if (result.success) {
      navigate("/");
    } else {
      setErrorMessage("Username or password incorrect");
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={{ background: "#7077A1", borderRadius: 10 }}
    >
      {errorMessage && <Alert message={errorMessage} type="error" />}
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input value={email} onChange={handleEmailChange} />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
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
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password value={password} onChange={handlePasswordChange} />
      </Form.Item>
      <Form.Item
        label="Repeat Password"
        name="repeatPassword"
        rules={[
          { required: true, message: "Please input your password again!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
        <Button type="primary" htmlType="submit" >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
