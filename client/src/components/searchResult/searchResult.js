import Axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "./function";
import { FlightDetail } from "./flightdetail";
import { Head } from "./components";
import { SelectedFlight } from "./selectedFlight";

export const SearchResult = () => {
  const navigate = useNavigate();
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
    departureFlightID: params.get("departureFlightID"),
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
        if (res.data.Status === "Success") setFlights(res.data.Flights);
        else console.log(res.data.Error);
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
  const prevDay = (e) => {
    e.preventDefault();

    const date = new Date(v.departure);
    const limit = new Date("2023-05-29");
    if (date <= limit) return;
    date.setDate(date.getDate() - 1);
    const newDate = moment(date).format("YYYY-MM-DD");
    if (v.isReturn === 1)
      navigate(
        "/search?from=" +
          v.from +
          "&to=" +
          v.to +
          "&departure=" +
          newDate +
          "&arrival=" +
          v.arrival +
          "&adult=" +
          v.adult +
          "&child=" +
          v.child +
          "&infant=" +
          v.infant +
          "&class=" +
          v.class +
          "&isReturn=" +
          v.isReturn +
          "&departureFlightID=" +
          v.departureFlightID
      );
    else
      navigate(
        "/search?from=" +
          v.from +
          "&to=" +
          v.to +
          "&departure=" +
          newDate +
          "&arrival=" +
          v.arrival +
          "&adult=" +
          v.adult +
          "&child=" +
          v.child +
          "&infant=" +
          v.infant +
          "&class=" +
          v.class +
          "&isReturn=" +
          v.isReturn
      );
    window.location.reload();
  };
  const nextDay = (e) => {
    e.preventDefault();
    const date = new Date(v.departure);
    const limit = new Date("2023-06-06");
    if (date >= limit) return;
    date.setDate(date.getDate() + 1);
    const newDate = moment(date).format("YYYY-MM-DD");
    if (v.isReturn === "1")
      navigate(
        "/search?from=" +
          v.from +
          "&to=" +
          v.to +
          "&departure=" +
          newDate +
          "&arrival=" +
          v.arrival +
          "&adult=" +
          v.adult +
          "&child=" +
          v.child +
          "&infant=" +
          v.infant +
          "&class=" +
          v.class +
          "&isReturn=" +
          v.isReturn +
          "&departureFlightID=" +
          v.departureFlightID
      );
    else
      navigate(
        "/search?from=" +
          v.from +
          "&to=" +
          v.to +
          "&departure=" +
          newDate +
          "&arrival=" +
          v.arrival +
          "&adult=" +
          v.adult +
          "&child=" +
          v.child +
          "&infant=" +
          v.infant +
          "&class=" +
          v.class +
          "&isReturn=" +
          v.isReturn
      );
    window.location.reload();
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen w-screen flex flex-col items-center">
        <Head
          from={airportName(v.from)}
          to={airportName(v.to)}
          departure={formatDate(v.departure)}
        />
        {v.departureFlightID !== "null" ? (
          <SelectedFlight id={v.departureFlightID} airports={airports} />
        ) : (
          <div>
            <button
              onClick={prevDay}
              className="bg-blue-300 hover:ring border rounded mx-3 px-3"
            >
              Previous Day
            </button>
            <button
              onClick={nextDay}
              className="bg-blue-300 hover:ring border rounded mx-3 px-3"
            >
              Next Day
            </button>{" "}
          </div>
        )}

        {Flights &&
          Flights.map((flight, i) => {
            return (
              <FlightDetail key={i} airports={airports} v={v} flight={flight} />
            );
          })}
      </div>
    </>
  );
};
