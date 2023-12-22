// GuestUser.jsx
import React, { useState } from 'react';
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
import { useNavigate } from "react-router-dom";


const GuestUser = () => {
  const navigate = useNavigate();
  const [showBackground, setShowBackground] = useState(true);

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleButtonClick = () => {
    setShowBackground(false);
  };

  const handleBackgroundClick = () => {
    setShowBackground(true);
  };
  return (
    <div className="navbar-container">
      <AppBar position="static" className="navbar">
        <Toolbar>
          <div className="left-section">
            <img
              src="https://fit.hcmute.edu.vn/Resources/Images/SubDomain/fit/logo-cntt2021.png"
              alt="Logo"
              style={{ maxHeight: '50px' }}
            />
          </div>
          <div className="center-section">
            <Button color="inherit" component={Link} to="/notifications" onClick={handleButtonClick}>
              Thông báo
            </Button>
            <Button color="inherit" component={Link} to="https://drive.google.com/file/d/1j-HV98Ro36Dyvotcn8z5GplPJOK6jXoG/view?usp=sharing">
              Hướng dẫn sử dụng
            </Button>
            <Button color="inherit" component={Link} to="/project-list" onClick={handleButtonClick}>
              Danh sách đề tài
            </Button>
            <Button color="inherit" component={Link} to="/contact" onClick={handleButtonClick}>
              Thông tin liên hệ
            </Button>
          </div>
          <div className="right-section">
            <Button color="inherit" onClick={handleLoginClick}>
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      {showBackground && (
        <div className="background-container" onClick={handleBackgroundClick}>
          <img
            src="https://xdcs.cdnchinhphu.vn/446259493575335936/2023/7/30/svsp-16906753983171909475301.jpg"
            alt="Background"
            className="background-image"
          />
        </div>
      )}
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
