import { useEffect, useState } from "react";
import { toDATETIME } from "../../feature/formatTime";
import { getAirportName } from "../../feature/getAirportName";
import { Content } from "./components/content";
import { Header } from "./components/header";
import { AddFlight } from "./components/addFlight";
import { Table } from "./components/table";

export const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  useEffect(() => {
    const getFlights = async () => {
      const res = await fetch("http://localhost:3001/system/flightList");
      const data = await res.json();
      setFlights(data.Data);
      setAirlines(data.Airlines);
      setAirports(data.Airports);
    };
    getFlights();
  }, []);

  return (
    <>
      <Content>
        <Header>
          <span>Flight List</span>
          <button className="text-base shadow focus:ring-2 rounded px-2 bg-blue-600 text-white  hover:ring">
            Add Flight +
          </button>
        </Header>
        <Table>
          <thead>
            <tr>
              {[
                "Edit",
                "FlightID",
                "Flight Number",
                "Airline ID",
                "Departure time",
                "Arrival time",
                "Plane ID",
                "From",
                "To",
              ].map((e, i) => {
                return (
                  <th
                    className="p-2 border border-1 border-black"
                    key={`head${i}`}
                  >
                    {e}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {flights &&
              flights.map((flight, i) => {
                return (
                  <tr key={i}>
                    <th className="p-2 border border-1">Edit</th>
                    <th className="p-2 border border-1">
                      {flight.FlightID ? flight.FlightID : "-"}
                    </th>
                    <th className="p-2 border border-1">
                      {flight.FlightNumber ? flight.FlightNumber : "-"}
                    </th>
                    <th className="p-2 border border-1">
                      {flight.AirlineID ? flight.AirlineID : "-"}
                    </th>
                    <th className="p-2 border border-1 whitespace-nowrap">
                      {flight.DepartureTime
                        ? toDATETIME(flight.DepartureTime)
                        : "-"}
                    </th>
                    <th className="p-2 border border-1 whitespace-nowrap">
                      {flight.ArrivalTime
                        ? toDATETIME(flight.ArrivalTime)
                        : "-"}
                    </th>
                    <th className="p-2 border border-1">
                      {flight.PlaneID ? flight.PlaneID : "-"}
                    </th>
                    <th className="p-2 border border-1">
                      {flight.OriginAirportID
                        ? getAirportName(airports, flight.OriginAirportID)
                        : "-"}
                    </th>
                    <th className="p-2 border border-1">
                      {flight.DestinationAirportID
                        ? getAirportName(airports, flight.DestinationAirportID)
                        : "-"}
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <AddFlight airlines={airlines} airports={airports} />
      </Content>
    </>
  );
};
