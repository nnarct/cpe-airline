import { useEffect, useRef, useState } from "react";
import { Content } from "../components/content";
import { Header } from "../components/header";
import { AddFlight } from "../components/addFlight";
import { Table, THead, Th, Edit } from "../components/table";
import { getFlights, getPlanes } from "./functions";
import { Flight } from "./oneFlight";
import { paginateData, RenderPaginationLinks } from "./pagination";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSubset, setDataSubset] = useState([]);

  useEffect(() => {
    getFlights({ setFlights, setAirlines, setAirports, setLoading });
    getPlanes({ setPlanes });

    const subset = paginateData(flights, currentPage);
    setDataSubset(subset);
  }, [flights, currentPage]);

  
  // Todo - delete flight
  // Todo - Pagination

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

  const filteredFlights = dataSubset?.filter((flight) => {
    if (selectedAirline.status && flight.airline !== selectedAirline.airline)
      return false;
    if (selectedFrom.status && flight.oriIATA !== selectedFrom.from)
      return false;
    if (selectedTo.status && flight.desIATA !== selectedTo.to) return false;
    return !(
      selectedDate.status &&
      flight.DepartureTime.split("T")[0] !== selectedDate.date
    );
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
        <RenderPaginationLinks {...{flights, currentPage, setCurrentPage}}/>
        <Header>
          <table className="text-base font-normal">
            <thead className="">
              <tr className="rounded-t-xl">
                <th className="font-semibold text-gray-600 text-sm text-left pl-2">
                  Airline :
                </th>
                <th className="font-semibold text-gray-600 text-sm text-left pl-2">
                  From :
                </th>
                <th className="font-semibold text-gray-600 text-sm text-left pl-2">
                  To :
                </th>
                <th className="font-semibold text-gray-600 text-sm text-left pl-2">
                  Date :
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pr-3">
                  <select
                    id="airlineFilter"
                    className="w-full border text-base px-2 py-1 border-primary/50"
                    onChange={handleAirlineChange}
                  >
                    <option value="ALL">All</option>
                    {airlines?.map((airline) => {
                      return (
                        <option key={airline.AirlineID} value={airline.Name}>
                          {airline.Name}
                        </option>
                      );
                    })}
                    {/* Add more airline options as needed */}
                  </select>
                </td>
                <td className="pr-3">
                  <select
                    className="w-full border text-base px-2 py-1 border-primary/50"
                    id="fromFilter"
                    onChange={handleFromChange}
                  >
                    <option value="ALL">All</option>
                    {airports?.map((airport) => {
                      return (
                        <option key={airport.AirportID} value={airport.IATA}>
                          {airport.IATA} {airport.Name}
                        </option>
                      );
                    })}
                    {/* Add more location options as needed */}
                  </select>
                </td>
                <td className="pr-3">
                  <select
                    className="w-full border text-base px-2 py-1 border-primary/50"
                    id="toFilter"
                    onChange={handleToChange}
                  >
                    <option value="ALL">All</option>
                    {airports?.map((airport) => {
                      return (
                        <option key={airport.AirportID} value={airport.IATA}>
                          {airport.IATA} {airport.Name}
                        </option>
                      );
                    })}
                    {/* Add more location options as needed */}
                  </select>
                </td>
                <td className="pr-3">
                  <input
                    className="w-full border text-base px-2 py-1 border-primary/50"
                    type="date"
                    id="dateFilter"
                    onChange={handleDateChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Header>
        <Table>
          <THead>
            <Edit />
            <Th className="w-20"> FlightID</Th>
            <Th className="w-40">Flight No.</Th>
            <Th className="w-20">From</Th>
            <Th className="w-20">To</Th>
            <Th>Departure time</Th>
            <Th>Arrival time</Th>
            <Th>Airline</Th>
            <Th className="w-20">Plane ID</Th>
            <Th className="w-20">Delete</Th>
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
              filteredFlights?.map((flight, i) => {
                return (
                  <Flight
                    key={flight?.FlightID}
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
        <AddFlight airlines={airlines} airports={airports} planes={planes} />
      </Content>
    </>
  );
};
