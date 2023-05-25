import Axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// components
import { AdminNavbar } from "../components/navbar";
import { Sidebar } from "../system/sidebar/sidebar";
import { EmployeeList } from "../system/employeeList/employeeList";
import { AirlineList } from "../system/airlineList/airlineList";
import { AirportList } from "../system/airportList/airportList";
import { FlightList } from "../system/flightList/flightList";
import { UserList } from "../system/userList";
import { PassengerList } from "../system/passengerList/passengerList";
import { Dashboard } from "../system/dashboard";
import { PlaneList } from "../system/planeList/planeList";

export const SystemDashboard = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let c = params.get("content");
  if (c == null) c = "Dashboard";
  const [content, setContent] = useState(c);
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
    setContent(c);
  }, [c]);

  useEffect(() => {}, [c]);
  return (
    <>
      <AdminNavbar info={info} />
      <div className="min-h-calc flex">
        <Sidebar current={content} setContent={setContent} />
        <div className="w-full bg-slate-100">
          {content === "Dashboard" && <Dashboard />}
          {content === "EmployeeList" && <EmployeeList />}
          {content === "AirlineList" && <AirlineList />}
          {content === "AirportList" && <AirportList />}
          {content === "FlightList" && <FlightList />}
          {content === "UserList" && <UserList />}
          {content === "PassengerList" && <PassengerList />}
          {content === "PlaneList" && <PlaneList />}
        </div>
      </div>
    </>
  );
};
