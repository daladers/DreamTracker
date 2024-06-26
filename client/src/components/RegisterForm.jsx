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
        handleUsernameChange,
        handlePasswordChange,
        handleEmailChange,
        handleSubmit,
    } = useRegisterForm();

    const [errorMessage, setErrorMessage] = useState("");
    
    const onFinish = (values) => {
        handleSubmit(values);
        if (!console.error) {
          navigate("/");
        } else {
          setErrorMessage("User already exsists");
        }
    };

    return (
        <Form form={form} onFinish={onFinish} style={{background: "#7077A1", borderRadius:10}}>
            {errorMessage && <Alert message={errorMessage} type="error" />}
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
            >
                <Input value={username} onChange={handleUsernameChange} />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
            >
                <Input value={email} onChange={handleEmailChange} />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password value={password} onChange={handlePasswordChange} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
