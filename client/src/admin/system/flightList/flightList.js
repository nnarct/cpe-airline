import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Content } from "../components/content";
import { Header } from "../components/header";
import { AddFlight } from "../components/addFlight";
import { Table, THead, Th, Edit } from "../components/table";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

import { getFlights, getPlanes, editFlight } from "./functions";
import { Flight } from "./oneFlight";
export const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [planes, setPlanes] = useState([]);

  const addFlight = useRef(null);
  const handleClick = () => {
    addFlight.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getFlights({ setFlights, setAirlines, setAirports, setLoading });
    getPlanes({ setPlanes });
  }, []);

  // Todo - edit flight
  // Todo - delete flight
  // Todo - Pagination

  // const handleAirline = (e) => {
  //   if (e.target.value === "none")
  //     setAirlineGroup({ status: false, airline: "" });
  //   else setAirlineGroup({ status: true, airline: e.target.value });
  // };
  const [selectedAirline, setSelectedAirline] = useState({
    status: false,
    airline: "",
  });
  const [selectedFrom, setSelectedFrom] = useState({ status: false, from: "" });
  const [selectedTo, setSelectedTo] = useState({ status: false, to: "" });
  const [selectedDate, setSelectedDate] = useState({ status: false, date: "" });

  const handleAirlineChange = (event) => {
    if (event.target.value !== "ALL")
      setSelectedAirline({ status: true, airline: event.target.value });
    else setSelectedAirline({ status: false, airline: "" });
  };

  const handleFromChange = (event) => {
    if (event.target.value !== "ALL")
      setSelectedFrom({ status: true, from: event.target.value });
    else setSelectedFrom({ status: false, from: "" });
  };

  const handleToChange = (event) => {
    if (event.target.value !== "ALL")
      setSelectedTo({ status: true, to: event.target.value });
    else setSelectedTo({ status: false, to: "" });
  };

  const handleDateChange = (event) => {
    event.target.value !== "ALL"
      ? setSelectedDate({ status: true, date: event.target.value })
      : setSelectedDate({ status: false, date: "" });
  };

  const filteredFlights = flights.filter((flight) => {
    if (selectedAirline.status && flight.airline !== selectedAirline.airline)
      return false;
    if (selectedFrom.status && flight.oriIATA !== selectedFrom.from)
      return false;
    if (selectedTo.status && flight.desIATA !== selectedTo.to) return false;
    return true;
  });

  return (
    <>
      <Content>
        <Header>
          <span className="whitespace-nowrap">Flight List</span>
          <button
            onClick={handleClick}
            className="text-base shadow focus:ring-2 rounded px-2 bg-blue-600 text-white hover:ring"
          >
            Add Flight +
          </button>
        </Header>
        <Header>
          <table className="w-full text-base font-normal border-collapse">
            <thead className="">
              <tr className="">
                <th className="">
                  <div className="font-normal py-1 bg-primary/20 my-auto border border-slate-900 rounded-tl-xl">
                    Airline :{" "}
                  </div>
                </th>
                <th className="">
                  <div className="font-normal py-1 bg-primary/20 my-auto border border-x-0 border-slate-900 ">
                    From :{" "}
                  </div>
                </th>
                <th className="">
                  <div className="font-normal py-1 bg-primary/20 my-auto border border-slate-900 rounded-tr-xl">
                    To :{" "}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="">
                  <select
                    id="airlineFilter"
                    className="w-full border border-t-0 text-base px-2 py-1 border-slate-900 rounded-bl-xl"
                    onChange={handleAirlineChange}
                  >
                    <option value="ALL">All</option>
                    {airlines.map((airline) => {
                      return (
                        <option key={airline.id} value={airline.Name}>
                          {airline.Name}
                        </option>
                      );
                    })}
                    {/* Add more airline options as needed */}
                  </select>
                </td>
                <td className=" ">
                  <select
                    className="w-full border border-t-0 border-x-0 text-base px-2 py-1 border-slate-900"
                    id="fromFilter"
                    onChange={handleFromChange}
                  >
                    <option value="ALL">All</option>
                    {airports.map((airport) => {
                      return (
                        <option key={airport.id} value={airport.IATA}>
                          {airport.IATA} {airport.Name}
                        </option>
                      );
                    })}
                    {/* Add more location options as needed */}
                  </select>
                </td>
                <td className="">
                  <select
                    className="w-full border border-t-0 text-base px-2 py-1 border-slate-900 rounded-br-xl"
                    id="toFilter"
                    onChange={handleToChange}
                  >
                    <option value="ALL">All</option>
                    {airports.map((airport) => {
                      return (
                        <option key={airport.id} value={airport.IATA}>
                          {airport.IATA} {airport.Name}
                        </option>
                      );
                    })}
                    {/* Add more location options as needed */}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </Header>
        <Table>
          <THead>
            <Edit />
            <Th className="w-20"> FlightID</Th>
            <Th>Flight No.</Th>
            <Th className="w-20">From</Th>
            <Th className="w-20">To</Th>
            <Th className="w-40">Departure time</Th>
            <Th className="w-40">Arrival time</Th>
            <Th>Airline</Th>
            <Th className="w-20">Plane ID</Th>
            <Th>Delete</Th>
          </THead>
          <tbody>
            {loading &&
              [...Array(8)].map((tr, index) => {
                return (
                  <tr key={index} className="p-4 animate-pulse">
                    {[...Array(10)].map((td, i) => {
                      return (
                        <td key={i} className="p-2 border border-1 text-center">
                          <div className="bg-slate-200 rounded-full m-px h-3" />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            {!loading &&
              filteredFlights &&
              filteredFlights.map((flight, i) => {
                return (
                  <Flight
                    flight={flight}
                    airlines={airlines}
                    airports={airports}
                    planes={planes}
                  />
                );
              })}
          </tbody>
        </Table>
        <div ref={addFlight} />
        <AddFlight airlines={airlines} airports={airports} />
      </Content>
    </>
  );
};
