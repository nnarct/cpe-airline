import Axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { formatDate } from "./function";
import { TbPlaneInflight } from "react-icons/tb";

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
      return "not found airport list";
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
              <div
                className="bg-white container cursor-pointer rounded-md border my-2 hover:ring ring-gray-200 p-5"
                key={i}
              >
                <div className="w-full py-4 container flex justify-between">
                  <div className="w-64 pr-2">
                    <div className="h-14 flex items-center space-x-2">
                      <h1 className="text-3xl text-gray-900 font-bold tracking-tight">
                        {flight.AirlineID}
                      </h1>
                    </div>

                    <div className="py-4 mx-auto container flex justify-between">
                      <ul className="list-none">
                        <li>Flight</li>
                        <span className="font-bold text-xl">
                          {flight.FlightNumber}
                        </span>
                      </ul>
                      <ul>
                        <li>Date</li>
                        <span className="font-bold text-xl">
                          {formatDate(v.departure)}
                        </span>
                      </ul>
                    </div>
                  </div>
                  <div className="w-64 sm:w-72 md:w-80 l:w-96 lg:w-full lg:max-w-[550px] xl:max-w-[800px]">
                    <div className="flex justify-between items-center">
                      <ul>
                        <li>From</li>
                        <li className="font-bold text-4xl">
                          {moment(flight.DepartureTime).format("HH:mm")}
                        </li>
                        {/* <li className="font-bold text-2xl">
                          {formatDate(flight.DepartureTime.substring(0, 9))}
                        </li> */}
                      </ul>
                      <div className="p-2 bg-primary rounded-full">
                        <TbPlaneInflight size="2.5em" color="white" />
                      </div>

                      <ul>
                        <li>To</li>
                        <li className="font-bold text-4xl">
                          {moment(flight.ArrivalTime).format("HH:mm ")}
                        </li>
                        {/* <li className="font-bold text-2xl text-right">
                          {flight.DestinationAirportID}
                        </li> */}
                      </ul>
                    </div>
                    <div className="mt-2 border-b-2 border-gray-200"></div>
                    {/* <li>
                      Booking ID: <span>{BookingID}</span>
                    </li> */}
                    <div className="w-full h-1/2 flex justify-between items-end">
                      <span className="text-4xl font-bold text-red-500">
                        1200
                        <span className="pl-2 text-sm">B</span>
                      </span>
                      <Link
                        to={`/contact?adult=${v.adult}&child=${v.child}&infant=${v.infant}`}
                      >
                        <span className="w-32 px-2 py-1 rounded bg-blue-500 text-center font-semibold text-xl text-white hover:ring focus:bg-blue-700">
                          Check
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
