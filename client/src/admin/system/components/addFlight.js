import Axios from "axios";
import { useEffect, useState } from "react";
const Star = () => {
  return <span className="text-red-500">*</span>;
};
export const AddFlight = () => {
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  useEffect(() => {
    const getFlights = async () => {
      const res = await fetch("http://localhost:3001/system/flightList");
      const data = await res.json();
      setAirlines(data.Airlines);
      setAirports(data.Airports);
    };
    getFlights();
  }, []);
  const [values, setValues] = useState({
    FlightNumber: "",
    AirlineID: "",
    DepartureTime: new Date(),
    ArrivalTime: "",
    PlaneID: "",
    OriginAirportID: "",
    DestinationAirportID: "",
  });
  const handleSubmit = (e) => {
    Axios.post("http://localhost:3001/system/insertFlight", values)
      .then((res) => {
        if (res.data.Status === "Create new flight successfully! :)") {
          alert(res.data.Status);
        } else {
          alert(res.data.Error);
        }
      })
      .then((err) => {
        if (err) console.log(err);
      });
  };
  return (
    <>
      <div className="flex flex-col items-center bg-gray-50 border rounded mt-4 p-3">
        <h1 className="text-xl">Add New Flight</h1>
        <form
          className="rounded w-96 flex flex-col p-4 "
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label htmlFor="flightNumber">
            Flight Number <Star />
          </label>
          <input
            required
            name="flightNumber"
            type="text"
            className="mb-2 border rounded p-1"
            placeholder="Flight Number"
            onChange={(e) =>
              setValues({ ...values, FlightNumber: e.target.value })
            }
          />
          <label htmlFor="airlineID">Airline</label>
          <select
            name="airlineID"
            id="AirlineID"
            className="mb-2 border rounded p-1"
          >
            {airlines.map((airline, i) => {
              return (
                <option key={i} value={airline.AirlineID}>
                  {airline.AirlineID}-{airline.Name}
                </option>
              );
            })}
          </select>
          <label htmlFor="DepartureTime">Departure time</label>
          <input
            className="mb-2 border rounded p-1"
            type="datetime-local"
            min={new Date().toISOString().slice(0, -8)}
            onChange={(e) =>
              setValues({ ...values, DepartureTime: e.target.value })
            }
          />
          <label htmlFor="ArrivalTime">Arrival time</label>
          <input
            className="mb-2 border rounded p-1"
            type="datetime-local"
            min={new Date(values.DepartureTime).toISOString().slice(0, -8)}
          />
          <label htmlFor="PlaneID">Plane ID</label>
          <input type="text" className="mb-2 border rounded p-1" />
          <label htmlFor="OriginAirport">Origin Airport</label>
          <select
            name="OriginAirport"
            id="OriginAirport"
            className="mb-2 border rounded p-1"
          >
            {airports.map((airport, i) => {
              return (
                <option key={i} value={airport.AirportID}>
                  {i + 1}. {airport.Name} ({airport.IATA})
                </option>
              );
            })}
          </select>
          <label htmlFor="OriginAirport">Destination Airport</label>
          <select
            name="DestinationAirport"
            id="DestinationAirport"
            className="mb-2 border rounded p-1"
          >
            {airports.map((airport, i) => {
              return (
                <option key={i} value={airport.AirportID}>
                  {i + 1}. {airport.Name} ({airport.IATA})
                </option>
              );
            })}
          </select>

          <button
            className="bg-blue-500 text-white rounded py-1 px-3 hover:opacity-40  active:opacity-80"
            type="submit"
          >
            Add Flight
          </button>
        </form>
      </div>
    </>
  );
};
