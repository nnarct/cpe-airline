import { useEffect, useState } from "react";
import { AdminNavbar } from "../components/navbar";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export const ManagerDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:3001/emauth").then((res, err) => {
      if (err) console.log(err); // You are not authenticated
      if (res.data.Status === "Success") {
        if (res.data.Info.Position === "Admin") navigate("/admin");
        if (res.data.Info.Position === "System") navigate("/system");
      } else {
       navigate("/admin/login");
      }
    });
  });
  return (
    <div className="bg-slate-100">
      <AdminNavbar />
    </div>
  );
};
