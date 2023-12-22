// Navbar.js
import { useState, useContext } from "react";
// import './navbar.css'
import PersonIcon from "@mui/icons-material/Person";
import TopicIcon from "@mui/icons-material/Topic";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { AuthContext } from "../../../context/authContext";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="side-bar">
      <div id="close-btn">
        <i class="fas fa-times"></i>
      </div>
      <div>
        <div className="footer_image">
          <img className="img_footer" src={"/img/header (2).jpg"} alt="" />
        </div>
        <div class="profile">
          <img
            src="https://i.pinimg.com/564x/dc/b8/5f/dcb85f36678753d9687bc20d75d967be.jpg"
            class="image"
            alt=""
          />
          <h3 class="name">Huỳnh Văn Phụng</h3>
          <p class="role">Giáo Viên</p>
          <a href="profile.html" class="btn">
            view profile
          </a>
        </div>
      </div>

      <nav class="navbar">
        {currentUser?.role?.name === "TEACHER" && (
          <>
            <a href="TopicRegistation">
              <PersonIcon
                sx={{ marginRight: 1 }}
                style={{ color: "#8E44AD" }}
              />
              <Typography
                className="PersonIcon"
                variant="inherit"
                style={{ color: "#8E44AD" }}
              >
                Đăng Ký Đề Tài
              </Typography>
            </a>
            <a href="TopicManagement">
              <PersonIcon
                sx={{ marginRight: 1 }}
                style={{ color: "#8E44AD" }}
              />
              <Typography
                className="PersonIcon"
                variant="inherit"
                style={{ color: "#8E44AD" }}
              >
                Quản Lý Đề Tài
              </Typography>
            </a>
          </>
        )}

        {currentUser?.role?.name === "MAJOR_HEAD" && (
          <>
            <a href="AcceptTopicRegis">
              <PersonIcon
                sx={{ marginRight: 1 }}
                style={{ color: "#8E44AD" }}
              />
              <Typography
                className="PersonIcon"
                variant="inherit"
                style={{ color: "#8E44AD" }}
              >
                Duyệt Đề Tài (TBM)
              </Typography>
            </a>
            <a href="teachers.html">
              <PersonIcon
                sx={{ marginRight: 1 }}
                style={{ color: "#8E44AD" }}
              />
              <Typography
                className="PersonIcon"
                variant="inherit"
                style={{ color: "#8E44AD" }}
              >
                Phân Giáo Viên PB
              </Typography>
            </a>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
