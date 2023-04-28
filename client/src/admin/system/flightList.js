import moment from "moment";
import { useEffect, useState } from "react";
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
  const ToDATETIME = (time) => {
    return moment(time).format("ddd DD-MM-YYYY hh:mm a");
  };
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
              <th className="p-2 border border-1 border-black">Edit</th>
              <th className="p-2 border border-1 border-black">FlightID</th>
              <th className="p-2 border border-1 border-black">
                Flight Number
              </th>
              <th className="p-2 border border-1 border-black">AirlineID</th>
              <th className="p-2 border border-1 border-black">
                Departure time
              </th>
              <th className="p-2 border border-1 border-black">
                Arrival time
              </th>
              <th className="p-2 border border-1 border-black">Plane ID</th>
              <th className="p-2 border border-1 border-black">Origin</th>
              <th className="p-2 border border-1 border-black">Destination</th>
            </tr>
          </thead>
          <tbody>
            {flights &&
              flights.map((flight, i) => {
                return (
                  <>
                    <tr key={`flight${i}`}>
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
                          ? ToDATETIME(flight.DepartureTime)
                          : "-"}
                      </th>
                      <th className="p-2 border border-1 whitespace-nowrap">
                        {flight.ArrivalTime
                          ? ToDATETIME(flight.ArrivalTime)
                          : "-"}
                      </th>
                      <th className="p-2 border border-1">
                        {flight.PlaneID ? flight.PlaneID : "-"}
                      </th>
                      <th className="p-2 border border-1">
                        {flight.OriginAirportID ? flight.OriginAirportID : "-"}
                      </th>
                      <th className="p-2 border border-1">
                        {flight.DestinationAirportID
                          ? flight.DestinationAirportID
                          : "-"}
                      </th>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>
        <AddFlight airlines={airlines} airports={airports} />
      </Content>
    </>
  );
};
