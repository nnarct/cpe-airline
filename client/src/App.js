import Axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Homepage } from "./pages/homepage";
import { Register } from "./components/auth/register";
import { Login } from "./components/auth/login";
import { UserProfile } from "./components/userSetting/myProfile/userProfile";
import { LoginAdmin } from "./admin/auth/admin-login";
import { DashboardRouter } from "./admin/pages/dashboardRouter";
import { SystemDashboard } from "./admin/pages/systemdashboard";
import { AdminDashboard } from "./admin/pages/admindasboard";
import { ErrorPage } from "./admin/auth/error";
import { SearchResultPage } from "./pages/searchResultPage";
import { Error } from "./pages/error";
import { ContactInfo } from "./components/contactInfo/contactInfo";
import { Payment } from "./components/contactInfo/payment/payment";
import { Invoice } from "./components/contactInfo/payment/invoice";
export const App = () => {
  Axios.defaults.withCredentials = true;
  const [auth, setAuth] = useState("");
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
        {auth ? (
          <>
            <Route path="/contact" element={<ContactInfo />} />
            <Route path="/myProfile" element={<UserProfile />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/invoice" element={<Invoice />} />
          </>
        ) : (
          <>
            <Route path="/contact" element={<Error />} />
            <Route path="/myProfile" element={<Error />} />
            <Route path="/payment" element={<Error />} />
            <Route path="/invoice" element={<Error />} />
          </>
        )}
        <Route path="/homepage" element={<DashboardRouter />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/system" element={<SystemDashboard />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
      </Routes>
    </div>
  );
};
