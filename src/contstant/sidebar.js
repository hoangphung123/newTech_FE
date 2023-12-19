import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import ContactlessOutlinedIcon from "@mui/icons-material/ContactlessOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CameraswitchOutlinedIcon from "@mui/icons-material/CameraswitchOutlined";

export const listAdminSideBar = [
//   {
//     name: "Quản lý đề tài",
//     icon: <HomeOutlinedIcon />,
//     href: "/",
//   },
  {
    name: "Quản lý tài khoản",
    icon: <PermIdentityOutlinedIcon />,
    href: "/",
  },
//   {
//     // name: "Quản lý chuyên ngành",
//     icon: <AttachFileOutlinedIcon />,
//     href: "/major-management",
//   },
//   {
//     name: "Đăng kí đề tài",
//     icon: <AddCircleOutlineIcon />,
//     href: "/admin-sub-topic",
//   },
//   {
//     name: "Quản lý đợt đăng kí",
//     icon: <CalendarMonthOutlinedIcon />,
//     href: "/period-management",
//   },
];

export const listManagementSideBar = [
  { name: "Trang chủ", icon: <HomeOutlinedIcon />, href: "/" },
  {
    name: "Thông tin cá nhân",
    icon: <PermIdentityOutlinedIcon />,
    href: "/management-info",
  },
  {
    name: "Đăng kí đề tài",
    icon: <AddCircleOutlineIcon />,
    href: "/management-sub-topic",
  },
  {
    name: "Duyệt đăng kí đề tài",
    icon: <CheckCircleOutlineIcon />,
    href: "/management-approve-sub-topic",
  },
  {
    name: "Phân công GV phản biện",
    icon: <ReviewsOutlinedIcon />,
    href: "/assign-teacher-review",
  },
];

export const listTeacherSideBar = [
  { name: "Quản lý đề tài", icon: <HomeOutlinedIcon />, href: "/" },
  {
    name: "Thông tin cá nhân",
    icon: <PermIdentityOutlinedIcon />,
    href: "/teacher-info",
  },
  {
    name: "Chọn đề tài",
    icon: <CameraswitchOutlinedIcon />,
    href: "/teacher-select-topic",
  },
  {
    name: "Đăng kí đề tài",
    icon: <AddCircleOutlineIcon />,
    href: "/teacher-sub-topic",
  },
  {
    name: "Đề tài được phân công phản biện",
    icon: <ReviewsOutlinedIcon />,
    href: "/assigned-review",
  },
];

export const listStudentSideBar = [
  { name: "Quản lý đề tài", icon: <HomeOutlinedIcon />, href: "/" },
  {
    name: "Thông tin cá nhân",
    icon: <PermIdentityOutlinedIcon />,
    href: "/student-info",
  },
  {
    name: "Đăng kí đề tài",
    icon: <AddCircleOutlineIcon />,
    href: "/sub-topic",
  },
];

export const listGuestSideBar = [
  { name: "Trang chủ", icon: <HomeOutlinedIcon />, href: "/" },
  {
    name: "Xem hướng dẫn",
    icon: <LogoutOutlinedIcon />,
    href: "/guest-instruction",
  },
  {
    name: "Xem đề tài tham khảo",
    icon: <StickyNote2OutlinedIcon />,
    href: "/guest-preference",
  },
  {
    name: "Xem thông tin liên hệ",
    icon: <ContactlessOutlinedIcon />,
    href: "/guest-contact",
  },
];
