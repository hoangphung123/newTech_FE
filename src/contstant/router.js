import AccountManagement from "../pages/admin/AccountManagement";
// import Login from "../pages/guest/Login";
// import StudentHome from "../pages/student/StudentHome";
// import StudentInfo from "../pages/student/StudentInfo";
// import SubTopic from "../pages/student/SubTopic";
// import TeacherHome from "../pages/teacher/TeacherHome";
// import TeacherInfo from "../pages/teacher/TeacherInfo";
// import ManagementApproveSubTopic from "../pages/management/ManagementApproveSubTopic";
// import ProviderCodeTopic from "../pages/management/ProviderCodeTopic";
// import ManagementInfo from "../pages/management/ManagementInfo";
// import AssignTeacherReview from "../pages/management/AssignTeacherReview";
// import StudentCodeTopic from "../pages/student/StudentCodeTopic";
// import AssignedReview from "../pages/teacher/AssignedReview";
// import TeacherSubTopic from "../pages/teacher/TeacherSubTopic";
// import GuestMessage from "../pages/guest/GuestMessage";
// import GuestInstruction from "../pages/guest/GuestInstruction";
// import GuestPreference from "../pages/guest/GuestPreference";
// import GuestContact from "../pages/guest/GuestContact";
// import MajorManagement from "../pages/admin/MajorManagement";
// import PeriodManagement from "../pages/admin/PeriodManagement";
// import ManagementSubTopic from "../pages/management/ManagementSubTopic";
// import TeacherSelectTopic from "../pages/teacher/TeacherSelectTopic";
// import ManagementHome from "../pages/management/ManagementHome";
// import AdminSubTopic from "../pages/admin/AdminSubTopic";
import AdminHome from "../pages/admin/AdminHome";

export const listRouter = {
  admin: [
    { path: "/", element: <AdminHome /> },
    { path: "/account-management", element: <AccountManagement /> },
    // { path: "/admin-sub-topic", element: <AdminSubTopic /> },
    // { path: "/major-management", element: <MajorManagement /> },
    // { path: "/period-management", element: <PeriodManagement /> },
  ],
//   management: [
//     {
//       path: "/",
//       element: <ManagementHome />,
//     },
//     {
//       path: "/management-info",
//       element: <ManagementInfo />,
//     },
//     {
//       path: "/management-sub-topic",
//       element: <ManagementSubTopic />,
//     },
//     {
//       path: "/management-approve-sub-topic",
//       element: <ManagementApproveSubTopic />,
//     },
//     {
//       path: "/provider-code-topic",
//       element: <ProviderCodeTopic />,
//     },
//     {
//       path: "/assign-teacher-review",
//       element: <AssignTeacherReview />,
//     },
//   ],
//   teacher: [
//     { path: "/", element: <TeacherHome /> },
//     { path: "/teacher-info", element: <TeacherInfo /> },
//     { path: "/assigned-review", element: <AssignedReview /> },
//     { path: "/teacher-select-topic", element: <TeacherSelectTopic /> },
//     { path: "/teacher-sub-topic", element: <TeacherSubTopic /> },
//   ],
//   student: [
//     { path: "/student-code-topic", element: <StudentCodeTopic /> },
//     { path: "/", element: <StudentHome /> },
//     { path: "/student-info", element: <StudentInfo /> },
//     { path: "/sub-topic", element: <SubTopic /> },
//   ],
//   guest: [
//     { path: "/", element: <GuestMessage /> },
//     { path: "/login", element: <Login /> },
//     { path: "/guest-instruction", element: <GuestInstruction /> },
//     { path: "/guest-preference", element: <GuestPreference /> },
//     { path: "/guest-contact", element: <GuestContact /> },
//   ],
};
