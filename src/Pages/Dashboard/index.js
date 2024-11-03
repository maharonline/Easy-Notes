import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Drawer, Button, Card } from 'antd';
import { HomeOutlined, UserOutlined, AppstoreAddOutlined, UnorderedListOutlined, SettingOutlined, ProfileOutlined, SafetyOutlined, EditOutlined, MenuUnfoldOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import '../../sass/Sidebar.scss';
import { useProfileContext } from 'Context/ReadProfileContext';
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { Content } from 'antd/es/layout/layout';
import Profile from './Profile';
import Home from './Home';
import Passwordupdate from './Passwordupdate';
import User from './TableUser/User';
import Notes from './Notes/Notes'; // Existing Notes component
import { useAuthContext } from 'Context/AuthContext';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Dashboard() {
  const { data } = useProfileContext();
  const { handleLogout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to track current path
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 550);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 550);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to handle "Add a New Note" click
  const handleAddNoteClick = () => {
    navigate('/dashboard/notes');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={toggleDrawer}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
        width={250}
      >
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/dashboard/user">Users</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<SettingOutlined />} title="Settings">
            <Menu.Item key="5" icon={<ProfileOutlined />}>
              <Link to="/dashboard/profile">Profile</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<SafetyOutlined />} title="Account">
            <Menu.Item key="6" icon={<EditOutlined />}>
              <Link to="/dashboard/passwordupdate">Password Update</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Drawer>

      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapse}
          breakpoint="lg"
          collapsedWidth="100"
          width={250}
          className="sidebar"
          style={{
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            backgroundColor: '#fff',
          }}
        >
          <div className="sidebar-header">
            <Avatar size={70} src={data?.photo} alt="Profile" />
            {!collapsed && <h3 className="sidebar-name">Hello, {data?.firstname}!</h3>}
          </div>

          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/dashboard/home" className='text-decoration-none'>Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/dashboard/user" className='text-decoration-none'>Users</Link>
            </Menu.Item>
            <SubMenu key="sub2" icon={<SettingOutlined />} title="Settings">
              <Menu.Item key="5" icon={<ProfileOutlined />}>
                <Link to="/dashboard/profile" className='text-decoration-none'>Profile</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SafetyOutlined />} title="Account">
              <Menu.Item key="6" icon={<EditOutlined />}>
                <Link to="/dashboard/passwordupdate" className='text-decoration-none'>Password Update</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
      )}

      {isMobile && (
        <Button
          className="drawer-toggle"
          icon={<MenuUnfoldOutlined />}
          onClick={toggleDrawer}
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1000,
          }}
        />
      )}

      <Layout
        className="site-layout"
        style={{
          marginLeft: isMobile ? 0 : 250,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            backgroundImage: 'url(/Assets/image/bg.jpg)', // Add your image path here
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Only show this card on the main Dashboard page */}
          {location.pathname === '/dashboard' && (
            <Card
              onClick={handleAddNoteClick}
              style={{
                marginBottom: '16px',
                cursor: 'pointer',
                textAlign: 'center',
                padding: '20px',
                fontSize: '18px',
              }}
            >
              <PlusOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <p>Add a New Note</p>
            </Card>
          )}

          <Routes>
            <Route path='/user' element={<User />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/passwordupdate' element={<Passwordupdate />} />
            <Route path='/notes' element={<Notes />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
