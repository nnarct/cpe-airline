import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

// components
import { Sidebar } from "../system/sidebar";
import { EmployeeList } from "../system/employeeList";
import { AirlineList } from "../system/airlineList";
import { AirportList } from "../system/airportList";
import { AdminNavbar } from "../components/navbar";

export const SystemDashboard = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/emauth").then((res, err) => {
      if (err) console.log(err); // You are not authenticated
      if (res.data.Status === "Success") {
        setInfo(res.data.Info);
        if (res.data.Info.Position === "Admin") navigate("/admin");
        if (res.data.Info.Position === "Manager") navigate("/manager");
      } else {
        navigate("/admin/login");
      }
    });
  }, []);

  const [content, setContent] = useState("EmployeeList");
  return (
    <>
      <AdminNavbar info={info} />
      <div className="min-h-calc flex">
        <Sidebar content={content} setContent={setContent} />
        <div className="w-full">
          {content === "EmployeeList" && <EmployeeList />}
          {content === "AirlineList" && <AirlineList />}
          {content === "AirportList" && <AirportList />}
        </div>
      </div>
    </>
  );
};
