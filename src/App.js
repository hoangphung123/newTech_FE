import Login from "./pages/login/Login.jsx";
import LoginUser from "./pages/loginUser/Login.jsx";
import AccountManagement from "./pages/admin/AccountManagement";
import MajorManagement from "./pages/admin/MajorManagement.jsx";
import ClassManagement from "./pages/admin/ClassManagement.jsx";
import TopicManagement from "./pages/admin/TopicManagement.jsx";
import TopicRegistation from "./pages/teacher/topicRegistation.jsx";
import GuestUser from "./pages/guestuser/guestUser.jsx";

import TopicManagementTeacher from "./pages/teacher/managementTopic.jsx";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useRoutes,
} from "react-router-dom";
import "./style.scss";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext.js";
import MainLayout from "./components/layout/MainLayout.jsx";
import MainlayoutUser from "./components/layoutUser/mainlayout.jsx";
import ContactPage from "./pages/guestuser/ContactPage.jsx";
import ProjectListPage from "./pages/guestuser/ProjectListPage.jsx";
import UserGuidePage from "./pages/guestuser/UserGuidePage.jsx";
import NotificationPage from "./pages/guestuser/NotificationPage.jsx";

function App() {
  const { currentAdmin } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    console.log("Current Admin Role 1:", currentAdmin.role);
    if (currentAdmin.role !== "admin") {
      return <Navigate to="/loginAdmin" />;
    }
    return children;
  };

  // const Layout = () => {
  //   return (
  //     <div>
  //       <MainLayout>
  //         <Outlet />
  //       </MainLayout>
  //     </div>
  //   );
  // };

  //router
  const routes = [
    {
      path: "/",
      element: (
        <Outlet />
      ),

      children: [
        {
          path: "admin",
          element: (
            <ProtectedRoute>
              <MainLayout>
                <Outlet />
              </MainLayout>
            </ProtectedRoute>
          ),
          children: [
            {
              path: "UserAdmin",
              element: <AccountManagement />,
            },
            {
              path: "MajorAdmin",
              element: <MajorManagement />,
            },
            {
              path: "ClassAdmin",
              element: <ClassManagement />,
            },
            {
              path: "TopicAdmin",
              element: <TopicManagement />,
            },
            // {
            //   // Path rỗng trong phần admin
            //   path: "",
            //   element: currentAdmin.role === "admin" ? <Navigate to="/admin/UserAdmin" /> : null,
            // },
          ],
        },
        {
          path: "teacher",
          element: (
            <MainlayoutUser>
              <Outlet />
            </MainlayoutUser>
          ),
          children: [
            {
              path: "TopicRegistation",
              element: <TopicRegistation />,
            },
            {
              path: "TopicManagement",
              element: <TopicManagementTeacher />,
            },
          ],
        },
        {
          path: "",
          element: (
            <GuestUser />
          ),
          children: [
            {
              path: "contact",
              element: <ContactPage />
            },
            {
              path: "notifications",
              element: <NotificationPage />
            },
            {
              path: "user-guide",
              element: <UserGuidePage />
            },
            {
              path: "project-list",
              element: <ProjectListPage />
            },
          ],
        },
        // {
        //   // Path rỗng nằm ở mức cha để xử lý trường hợp mặc định
        //   path: "",
        //   element: currentAdmin.role === "admin" ? <Navigate to="/admin/UserAdmin" /> : <Navigate to="/teacher" />,
        // },

      ],
    },
    {
      path: "/loginAdmin",
      element: <Login />,
    },
    // {
    //   path: "/guestUser",
    //   element: <Guestuser />,
    // },
    {
      path: "/login",
      element: <LoginUser />,
    },
  ];

  // Create router
  const router = createBrowserRouter(routes);
  //

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
