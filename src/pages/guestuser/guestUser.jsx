// GuestUser.jsx
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationPage from './NotificationPage.jsx';
import UserGuidePage from './UserGuidePage.jsx';
import ProjectListPage from './ProjectListPage.jsx';
import ContactPage from './ContactPage.jsx';
import './guestUser.scss';

const GuestUser = () => {
  return (
    <div className="navbar-container">
      <AppBar position="static" className="navbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div className="left-section">
            <img
              src="https://giaoduc247.vn/uploads/082021/images/UTE.jpeg"
              alt="Logo"
              style={{ maxHeight: '50px' }}
            />
          </div>
          <div className="center-section">
            <Button color="inherit" component={Link} to="/notifications">
              Thông báo
            </Button>
            <Button color="inherit" component={Link} to="https://docs.google.com/document/d/1a2g5IpflvPi96y4n_ewpoRaBmp6WasL7/edit?usp=drive_link&ouid=112037438434334415430&rtpof=true&sd=true">
              Hướng dẫn sử dụng
            </Button>
            <Button color="inherit" component={Link} to="/project-list">
              Danh sách đề tài
            </Button>
            <Button color="inherit" component={Link} to="/contact">
              Thông tin liên hệ
            </Button>
          </div>
          <div className="right-section">
            <Button color="inherit" component={Link} to="/loginAdmin">
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      {/* Các route và component tương ứng */}
      <Routes>
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/user-guide" element={<UserGuidePage />} />
        <Route path="/project-list" element={<ProjectListPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
};

export default GuestUser;
