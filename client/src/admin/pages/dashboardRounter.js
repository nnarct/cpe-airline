import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AdminNavbar } from "../components/navbar";

export const DashboardRouter = () => {
  const [adminAuth, setAdminAuth] = useState(false);
  // const [info, setInfo] = useState({
  //   AirlineID: null,
  //   Email: null,
  //   EmployeeID: 0,
  //   FirstName: "FirstName",
  //   LastName: "LastName",
  //   Password: "Password",
  //   Position: "Admin",
  //   TelNo: null,
  //   username: "username",
  // });
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:3001/emauth").then((res, err) => {
      if (err) console.log(err); // You are not authenticated
      if (res.data.Status === "Success") {
        setAdminAuth(true);
        if(res.data.Info.Position === "Admin")
          navigate("/admin");
          if(res.data.Info.Position === "Manager")
          navigate("/manager");
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
