import Axios from "axios";
import { useEffect, useState } from "react";
import { Logo, TimeAndAirport, Price, LineIcon } from "./components";
export const SelectedFlight = ({ id, airports }) => {
  const [flight, setFlight] = useState({});
  useEffect(() => {
    Axios.post("http://localhost:3001/search/getFlight", {id}).then(
      (res, err) => {
        if (err) console.log(err);
        console.log(res.data);
        if (res.data.Status === "Success") setFlight(res.data.Flight[0]);
        else console.log(res.data.Error);
      }
    );
  },[]);
  const iata = (id) => {
    if (airports) {
      const airport = airports.find(
        (airport) => airport.AirportID === Number(id)
      );
      if (airport) return airport.IATA;
    } else return "-";
  };

  const name = (id) => {
    if (airports) {
      const airport = airports.find(
        (airport) => airport.AirportID === Number(id)
      );
      if (airport) {
        const name = airport.Name.replace(" International", "").replace(
          " Airport",
          ""
        );
        if (name === "Suvarnabhumi" || name === "Don Mueang") return "Bangkok";
        return name;
      }
    }
  };
  return (
    <div className="relative container lg:max-w-[1200px] my-1 p-8 bg-white rounded border flex flex-wrap justify-between items-center border-primary border-4">
      <span className="top-0 left-0 absolute uppercase py-2 px-8">selected <span className="font-semibold text-blue-600">Departure </span>flight</span>
      <Logo id={flight.AirlineID} flight={flight.FlightNumber} />
      <div className="flex items-center justify-center space-x-4">
        <TimeAndAirport
          className="text-right"
          time={flight.DepartureTime}
          iata={iata(flight.OriginAirportID)}
          name={name(flight.OriginAirportID)}
        />
        <LineIcon />
        <TimeAndAirport
          time={flight.ArrivalTime}
          iata={iata(flight.DestinationAirportID)}
          name={name(flight.DestinationAirportID)}
        />
      </div>
      <ul className="w-36 flex flex-col justify-between items-end">
        <Price price="1,092" />
      </ul>
    </div>
  );
};
