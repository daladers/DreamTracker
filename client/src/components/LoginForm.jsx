import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../hooks/useLoginForm";

const LoginForm = () => {
  const navigate = useNavigate();
  const { form, handleUsernameChange, handlePasswordChange, handleSubmit } =
    useLoginForm();

  const onFinish = (values) => {
    handleSubmit(values);
    navigate("/");
  };

  return (
    <Form form={form} onFinish={onFinish} style={{background: "#7077A1", borderRadius:10}}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input onChange={handleUsernameChange} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password onChange={handlePasswordChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
