import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { white } from '@mui/material/colors';
import {
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import TopicIcon from "@mui/icons-material/Topic";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import MenuIcon from "@mui/icons-material/Menu";
import "./Main.css";

function Main() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      width={"100%"}
      bgcolor={"#195691"}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <div>
        <IconButton size="small" style={{ color: 'white' }} onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/admin/UserAdmin">
            <PersonIcon sx={{ marginRight: 1 }} />
            <Typography variant="inherit">Quản lý tài khoản</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/admin/ClassAdmin">
            <ClassIcon sx={{ marginRight: 1 }} />
            <Typography variant="inherit">Quản lý Lớp</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/admin/TopicAdmin">
            <TopicIcon sx={{ marginRight: 1 }} />
            <Typography variant="inherit">Quản Lý Đề Tài</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/admin/MajorAdmin">
            <SchoolIcon sx={{ marginRight: 1 }} />
            <Typography variant="inherit">Quản lý chuyên nghành</Typography>
          </MenuItem>
        </Menu>
      </div>

      <Button size="small" href="/loginAdmin">
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <PersonIcon sx={{ color: "white" }} />
          <Typography color={"white"} fontSize={12} fontWeight={"bold"}>
            Admin
          </Typography>
        </Box>
      </Button>
    </Box>
  );
}

export default Main;
