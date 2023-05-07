import Axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Homepage } from "./pages/homepage";
import { Register } from "./components/auth/register";
import { Login } from "./components/auth/login";
import { UserProfile } from "./components/userSetting/myProfile/userProfile";
import { LoginAdmin } from "./admin/auth/admin-login";
import { DashboardRouter } from "./admin/pages/dashboardRounter";
import { ManagerDashboard } from "./admin/pages/managerdashboard";
import { SystemDashboard } from "./admin/pages/systemdashboard";
import { AdminDashboard } from "./admin/pages/admindasboard";
import { ErrorPage } from "./admin/auth/error";
import { SearchResultPage } from "./pages/searchResultPage";

export const App = () => {
  Axios.defaults.withCredentials = true;
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:3001").then((res, err) => {
      if (err) setAuth(false); // You are not authenticated
      if (res.data.Status === "Success") {
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register auth={auth} />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/homepage" element={<DashboardRouter />} />
        <Route path="/myProfile/:id" element={<UserProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/system" element={<SystemDashboard />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
      </Routes>
    </div>
  );
};
