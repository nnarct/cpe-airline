import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Content } from "../components/content";
import { Header } from "../components/header";
import { AddFlight } from "../components/addFlight";
import { Table, THead, Th, Edit } from "../components/table";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

import { getFlights, getPlanes, editFlight } from "./functions";
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

  const deleteFlight = (id) => {};

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
        <Table>
          <THead>
            <Edit />
            <Th>FlightID</Th>
            <Th>Flight No.</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Departure time</Th>
            <Th>Arrival time</Th>
            <Th>Airline</Th>
            <Th>Plane ID</Th>
            <Th>Delete</Th>
          </THead>
          <tbody>
            {loading &&
              [...Array(8)].map((tr, index) => {
                return (
                  <tr key={index} className="p-4 animate-pulse">
                    {[...Array(10)].map((td, i) => {
                      return (
                        <td
                          key={i}
                          className="p-2 border border-1 text-center "
                        >
                          <div className="bg-slate-200 rounded-full m-px h-3"></div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            {!loading &&
              flights &&
              flights.map((flight, i) => {
                return (
                  <tr key={i}>
                    <td
                      className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
                      onClick={() =>
                        editFlight({ flight, airlines, airports, planes })
                      }
                    >
                      <AiOutlineEdit className="mx-auto" />
                    </td>
                    {[
                      flight.FlightID,
                      flight.FlightNumber,
                      flight.oriIATA,
                      flight.desIATA,
                      moment(flight.DepartureTime).format("HH:MM - DD MMM YY"),
                      moment(flight.ArrivalTime).format("HH:MM - DD MMM YY"),
                      flight.airline,
                      flight.PlaneID,
                    ].map((item, i) => {
                      return (
                        <td key={i} className="p-2 border border-1 text-center">
                          {item || "-"}
                        </td>
                      );
                    })}

                    <td
                      className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => deleteFlight(flight?.FlightID)}
                    >
                      <RiDeleteBin6Line className="mx-auto" />
                    </td>
                  </tr>
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
