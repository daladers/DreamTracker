import React, { useContext } from "react";
import { Layout, Button } from "antd";
import { AuthContext } from "../contexts/AuthContext";

const { Header: AntHeader } = Layout;

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AntHeader style={{ background: "#2D3250", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1 style={{ color: "#F6B17A", marginTop: "10px" }}>DreamTracker</h1>
      {user && (
        <div>
          <span style={{ color: "#F6B17A", marginRight: "20px" }}>Welcome, {user.username}</span>
          <Button type="primary" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </AntHeader>
  );
};

export default Header;
