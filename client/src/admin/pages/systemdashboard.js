import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import { Sidebar } from "../system/sidebar";
import { EmployeeList } from "../system/employeeList";
import { AirlineList } from "../system/airlineList";
import { AdminNavbar } from "../components/navbar";
import { FlightInfo } from "../system/flightInfo";
import { AirportList } from "../system/airportList";
export const SystemDashboard = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/emauth").then((res, err) => {
      if (err) console.log(err); // You are not authenticated
      if (res.data.Status === "Success") {
        setInfo(res.data.Info);
        if (res.data.Info.Position === "Admin") navigate("/admin");
      } else {
        navigate("/admin/login");
      }
    });
  }, []);

  const [content, setContent] = useState("AirportList");
  return (
    <>
      <AdminNavbar info={info} />
      <div className="min-h-calc flex">
        <Sidebar content={content} setContent={setContent} />
        <div className="w-full">
          {content === "EmployeeList" && <EmployeeList />}
          {content === "AirlineList" && <AirlineList />}
          {content === "FlightInfo" && <FlightInfo />}
          {content === "AirportList" && <AirportList />}
        </div>
      </div>
    </>
  );
};
