import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

import { Homepage } from "./pages/homepage";
import { Register } from "./components/auth/register";
import { Login } from "./components/auth/login";
import { LoginAdmin } from "./admin/auth/admin-login";
import { DashboardRouter } from "./admin/pages/dashboardRounter";
import { ManagerDashboard } from "./admin/pages/managerdashboard";
import { SystemDashboard } from "./admin/pages/systemdashboard";
import { AdminDashboard } from "./admin/pages/admindasboard";

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register auth={auth} />} />
        <Route path="/homepage" element={<DashboardRouter />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/system" element={<SystemDashboard />} />

        <Route path="/admin/login" element={<LoginAdmin />} />
      </Routes>
    </div>
  );
};
