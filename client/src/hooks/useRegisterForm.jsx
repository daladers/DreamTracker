import { useState, useContext } from "react";
import { Form } from "antd";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export const useRegisterForm = () => {
  const [form] = Form.useForm();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/register", values);
      login(response.data.token);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  };

  return {
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
  };
};