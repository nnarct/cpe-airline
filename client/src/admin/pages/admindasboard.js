import Axios from "axios";
import { AdminNavbar } from "../components/navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  // const [adminAuth, setAdminAuth] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:3001/emauth").then((res, err) => {
      if (err) console.log(err); // You are not authenticated
      if (res.data.Status === "Success") {
        // setAdminAuth(true);
        // console.log(res);(res.data.Info)
        if (res.data.Info.Position === "Manager") navigate("/manager");
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
