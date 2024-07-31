import React, { useContext } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const SideMenu = ({ collapsed }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const items = [
    {
      key: "/",
      label: "Main Page",
      icon: <HomeIcon />,
    },
    {
      key: "/chart",
      label: "Chart",
      icon: <BarChartIcon />,
    },
    {
      key: "/profile",
      label: "Profile",
      icon: <AccountBoxIcon />,
    },
    user ? null : {
      key: "/login",
      label: "Login",
      icon: <LoginIcon />,
    },
    user ? null : {
      key: "/register",
      label: "Register",
      icon: <AppRegistrationIcon />,
    },
  ].filter(Boolean);

  const onClick = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ height: "100%", backgroundColor: "#7077A1"}}
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={items}
    />
  );
};

export default SideMenu;
