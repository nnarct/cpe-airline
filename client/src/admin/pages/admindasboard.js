import Axios from "axios";
import { AdminNavbar } from "../components/navbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../ad/sidebar/sidebar";
import { Dashboard } from "../system/dashboard";
import { AirportList } from "../system/airportList/airportList";
import { FlightList } from "../ad/flightList/flightList";
import { PlaneList } from "../system/planeList/planeList";
import { PassengerList } from "../ad/passengerList/passengerList";
import { MyProfile } from "../ad/myProfile";
export const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let c = params.get("content");
  if (c == null) c = "Dashboard";
  const [content, setContent] = useState(c);
  const [info, setInfo] = useState(null);
  useEffect(() => {
    Axios.get("http://localhost:3001/emauth").then((res, err) => {
      if (err) console.log(err); // You are not authenticated
      if (res.data.Status === "Success") {
        if (res.data.Info.Position === "System") navigate("/system");
        setInfo(res.data.Info);
        return;
      } else navigate("/admin/login");
    });
    setContent(c);
  }, [c, navigate]);
  const [page, setPage] = useState("Dashboard"); // ["Dashboard", "My Profile"]
  return (
    <div className="bg-slate-100">
      <AdminNavbar info={info} setPage={setPage} />
      {page === "My Profile" ? (
        <MyProfile />
      ) : (
        <div className="min-h-calc flex">
          <Sidebar current={content} setContent={setContent} />
          <div className="w-full bg-slate-100">
            {content === "Dashboard" && <Dashboard />}
            {content === "AirportList" && <AirportList />}
            {content === "FlightList" && <FlightList />}
            {content === "PassengerList" && <PassengerList />}
            {content === "PlaneList" && <PlaneList />}
          </div>
        </div>
      )}
    </div>
  );
};
