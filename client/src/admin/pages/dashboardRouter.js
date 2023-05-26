import Axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AdminNavbar } from "../components/navbar";

export const DashboardRouter = () => {
  const [adminAuth, setAdminAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:3001/emauth").then((res, err) => {
      if (err) Swal.fire({
        icon: "error",
        title: "Sorry",
        text: err,
      }); // You are not authenticated
      if (res.data.Status === "Success") {
        setAdminAuth(true);
        if(res.data.Info.Position === "Admin")
          navigate("/admin");
          if(res.data.Info.Position === "System")
          navigate("/system");
      } else {
        setAdminAuth(false);
        navigate("/admin/login");
      }
    });
  });

  return (
    <>
      <div className="bg-slate-100">
        <AdminNavbar />
        admin homepage
      </div>
    </>
  );
};
