import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export const useRegisterForm = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (data) => {
    axios
      .post("http://localhost:5000/auth/register", { username, email, password })
      .then((response) => {
        login(response.data.token);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    username,
    password,
    email,
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleSubmit,
  };
};
