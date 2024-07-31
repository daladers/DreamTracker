import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export const useLoginForm = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", { username, password });
      login(response.data.token);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  };

  return {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
  };
};
