import { useEffect, useState } from "react";
import { Content } from "./components/content";
import { Header } from "./components/header";
import moment from "moment";
import { AddFlight } from "./components/addFlight";

export const FlightList = () => {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    const getFlights = async () => {
      const res = await fetch("http://localhost:3001/system/flightList");
      const data = await res.json();
      setFlights(data.Data);
    };
    getFlights();
  }, []);
  const ToDATETIME = (time) => {
    return moment(time).format("DD/MM/YYYY hh:mm a");
  };
  return (
    <>
      <Content>
        <Header>Flight List</Header>
        <table className="">
          <thead>
            <tr>
              <th className="p-2 border border-1 border-black">Edit</th>
              <th className="p-2 border border-1 border-black">FlightID</th>
              <th className="p-2 border border-1 border-black">
                Flight Number
              </th>
              <th className="p-2 border border-1  border-black">AirlineID</th>
              <th className="p-2 border border-1  border-black">
                Departure time
              </th>
              <th className="p-2 border border-1  border-black">
                Arrival time
              </th>
              <th className="p-2 border border-1  border-black">Plane ID</th>
              <th className="p-2 border border-1  border-black">Origin</th>
              <th className="p-2 border border-1  border-black">Destination</th>
            </tr>
          </thead>
          <tbody>
            {flights &&
              flights.map((flight, i) => {
                return (
                  <>
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
        </table>
        <AddFlight />
      </Content>
    </>
  );
};
