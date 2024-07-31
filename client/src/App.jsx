import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChartPage from './pages/ChartPage';
import ProfilePage from './pages/ProfilePage';

const { Content, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 600);

  const handleResize = () => {
    setCollapsed(window.innerWidth < 600);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <AuthProvider>
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Layout>
          <Sider  collapsed={collapsed} style={{ background: '#fff' }}>
            <SideMenu collapsed={collapsed} />
          </Sider>
          <Layout style={{ padding: '0 24px 24px', backgroundColor: '#424769'}}>
            <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
              <Routes>
                <Route path="/" exact element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/chart" element={<ChartPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </Content>
            <Footer style={{backgroundColor: '#424769'}} />
          </Layout>
        </Layout>
      </Layout>
    </Router>
    </AuthProvider>
  );
};

export default App;
