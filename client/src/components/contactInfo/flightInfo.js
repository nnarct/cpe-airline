import Axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BsArrowLeftRight } from "react-icons/bs";
import { IoAirplane } from "react-icons/io5";
import { airlineLogo } from "./../searchResult/function";
export const FlightInfo = ({ pass, classType }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const data = {
    isReturn: params.get("isReturn"),
    departureFlightID: params.get("departureFlightID"),
    returnFlightID: params.get("returnFlightID"),
  };
  const [dep, setDep] = useState({});
  const [ret, setRet] = useState({});
  useEffect(() => {
    Axios.post("http://localhost:3001/contact/flightInfo", data).then(
      (res, err) => {
        if (err) console.log(err);
        if (res.data.Status === "Success") {
          if (data.isReturn === "0") setDep(res.data.DepFlight);
          else {
            setDep(res.data.DepFlight);
            setRet(res.data.RetFlight);
          }
        } else console.log(res.data.Error);
      }
    );
  }, []);

  return (
    <>
      <div className="h-min sm:w-2/5 md:w-2/6 bg-white border border-primary/40 rounded-md py-3 px-3">
        <div className="font-bold flex items-center justify-center space-x-2">
          <span>{dep.OriIATA}</span>
          <BsArrowLeftRight style={{ stroke: "black", strokeWidth: "1" }} />
          <span>{dep.DesIATA}</span>
        </div>
        <div className="flex items-center flex-wrap justify-center text-xs whitespace-nowrap">
          {moment(dep.DepartureTime).format("DD MMM")}
          {data.isReturn === "1" &&
            " - " + moment(ret.DepartureTime).format("DD MMM")}{" "}
          | Passenger {pass} | {classType}
        </div>
        <div className="border-t mt-1 py-1">
          <div className="flex items-center justify-between space-x-2">
            <ul className="font-bold flex items-center space-x-2">
              <li>{dep.OriIATA} </li>
              <li>
                <IoAirplane color="gray" />
              </li>
              <li>{dep.DesIATA}</li>
            </ul>
            <div className="py-1 flex items-center space-x-1 pr-2">
              <img className="h-4" src={airlineLogo(dep.AirlineName)} alt="" />
              <span className="text-xs">{dep.AirlineName}</span>
            </div>
          </div>
          <div className="text-xs">
            <span className="font-semibold">
              {moment(dep.DepartureTime).format("hh:mm")}
            </span>
            <span className="font-semibold">{" - "}</span>
            <span className="font-semibold">
              {moment(dep.ArrivalTime).format("hh:mm")}
            </span>
            <span>{" | "}</span>
            <span>{moment(dep.DepartureTime).format("ddd DD MMM YYYY")}</span>
          </div>
        </div>
        {data.isReturn === "1" ? (
          <div className="border-t mt-1 py-1">
            <div className="flex items-center justify-between space-x-2">
              <ul className="font-bold flex items-center space-x-2">
                <li>{ret.OriIATA} </li>
                <li>
                  <IoAirplane color="gray" />
                </li>
                <li>{ret.DesIATA}</li>
              </ul>
              <div className="py-1 flex items-center space-x-1 pr-2">
                <img
                  className="h-4"
                  src={airlineLogo(ret.AirlineName)}
                  alt=""
                />
                <span className="text-xs">{ret.AirlineName}</span>
              </div>
            </div>
            <div className="text-xs">
              <span className="font-semibold">
                {moment(ret.DepartureTime).format("hh:mm")}
              </span>
              <span className="font-semibold">{" - "}</span>
              <span className="font-semibold">
                {moment(ret.ArrivalTime).format("hh:mm")}
              </span>
              <span>{" | "}</span>
              <span>{moment(ret.DepartureTime).format("ddd DD MMM YYYY")}</span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
