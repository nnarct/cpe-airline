import Axios from "axios";
import { useEffect, useState } from "react";
import { Logo, TimeAndAirport, Price, LineIcon } from "./components";
import Swal from "sweetalert2";
export const SelectedFlight = ({ id }) => {
  const [flight, setFlight] = useState({});
  useEffect(() => {
    Axios.post("http://localhost:3001/search/getFlight", { id }).then(
      (res, err) => {
        if (err) console.log(err);
        if (res.data.Status === "Success") setFlight(res.data.Flight[0]);
        else Swal.fire({ icon: "error", title: res.data.Error });
      }
    );
  }, [id]);

  const name = (name) => {
    if (!name) {
      return;
    }
    name = name.replace(" International", "").replace(" Airport", "");
    if (name === "Suvarnabhumi" || name === "Don Mueang") return "Bangkok";
    return name;
  };
  return (
    <>
      <div className="relative container lg:max-w-[1200px] my-1 p-8 bg-white rounded border flex flex-wrap justify-between items-center border-primary border-4">
        <span className="top-0 left-0 absolute uppercase py-2 px-8">
          selected{" "}
          <span className="font-semibold text-blue-600">Departure </span>
          flight
        </span>
        <Logo airlineName={flight.AirlineName} flight={flight.FlightNumber} />
        <div className="flex items-center justify-center space-x-4">
          <TimeAndAirport
            className="text-right"
            time={flight.DepartureTime}
            iata={flight.OriIATA}
            name={name(flight.Origin)}
          />
          <LineIcon />
          <TimeAndAirport
            time={flight.ArrivalTime}
            iata={flight.DesIATA}
            name={name(flight.Destination)}
          />
        </div>
        <ul className="w-36 flex flex-col justify-between items-end">
          <Price price="1,092" />
        </ul>
      </div>
      <h4 className="text-3xl font-bold py-2 text-left w-full container lg:max-w-1000 ">
        Please select return flight
      </h4>
    </>
  );
};
