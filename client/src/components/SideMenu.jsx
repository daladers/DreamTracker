import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import BarChartIcon from '@mui/icons-material/BarChart';

const SideMenu = ({ collapsed }) => {
  const navigate = useNavigate();
  const items = [
    {
      key: "/",
      label: "Main Page",
      icon: <HomeIcon />,
    },
    {
      key: "/login",
      label: "Login",
      icon: <LoginIcon />,
    },
    {
      key: "/register",
      label: "Register",
      icon: <AppRegistrationIcon />,
    },
    {
      key: "/chart",
      label: "Chart",
      icon: <BarChartIcon />,
    },
  ];

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
