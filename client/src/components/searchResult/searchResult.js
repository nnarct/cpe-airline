import Axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { formatDate } from "./function";
import { FlightDetail } from "./flightdetail";

export const SearchResult = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const v = {
    from: params.get("from"),
    to: params.get("to"),
    departure: params.get("departure"),
    arrival: params.get("arrival"),
    adult: params.get("adult"),
    child: params.get("child"),
    infant: params.get("infant"),
    class: params.get("class"),
    isReturn: params.get("isReturn"),
  };

  const [Flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  useEffect(() => {
    const getAirports = async () => {
      const res = await fetch("http://localhost:3001/airportList");
      const data = await res.json();
      const err = data.Error;
      if (err) console.log(err);
      setAirports(data.Data);
    };
    getAirports();
    Axios.post("http://localhost:3001/search/SearchFlights", v).then(
      (res, err) => {
        if (err) console.log(err);
        if (res.data.Status === "Success") {
          console.log(res.data.Flights);
          setFlights(res.data.Flights);
        } else {
          console.log(res.data.Error);
        }
      }
    );
  }, []);

  const airportName = (id) => {
    if (airports) {
      const airport = airports.find(
        (airport) => airport.AirportID === Number(id)
      );
      if (airport) {
        airport.Name = airport.Name.replace(" International", "");
        airport.Name = airport.Name.replace(" Airport", "");
        return airport.Name + " (" + airport.IATA + ")";
      }
      return "-"; //not found airport list
    }
    return "unknown airport";
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen w-screen flex flex-col items-center">
        <div className="container text-3xl py-4 px-3">
          Flight from
          <span className="text-cyan-600 font-semibold ">
            {" "}
            {airportName(v.from)}
          </span>{" "}
          to{" "}
          <span className="text-cyan-600 font-semibold ">
            {airportName(v.to)}
          </span>{" "}
          on{" "}
          <span className="px-1 bg-gray-200 rounded">
            {formatDate(v.departure)}
          </span>
        </div>
        {Flights &&
          Flights.map((flight, i) => {
            return (
              <FlightDetail key={i} v={v} flight={flight} airports={airports} />
            );
          })}
      </div>
    </>
  );
};
