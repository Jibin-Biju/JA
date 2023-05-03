import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Authenticator from "../../common/Authenticator";
import AdminLayout from "./Layout/index";

const ErrorPage = React.lazy(() => import("../../common/Errors"));
const Analaytics = React.lazy(() => import("./components/analaytics"));
const UserManagment = React.lazy(() => import("./components/usermanagment"));
const NoticeManagment = React.lazy(() => import("./components/NoticeManagment"));
const PostMangment = React.lazy(() => import("./components/postmangment"));
const ReportedUsers = React.lazy(() => import("./components/reportedusers"));
function UserRoutes() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/dashboard") {
      navigate("/dashboard/usermanagment");
    }
  }, [navigate, pathname]);
  return (
    <Routes>
      <Route path='/' element={<Authenticator role={"admin"} />}>
        <Route path="/" element={<AdminLayout />}>
          <Route path="/usermanagment" element={<UserManagment />} />
          <Route path="/postmanagment" element={<PostMangment />} />
          <Route path="/notice" element={<NoticeManagment />} />
          <Route path="/reportedusers" element={<ReportedUsers />} />
          <Route path="/analytics" element={<Analaytics />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default UserRoutes;
