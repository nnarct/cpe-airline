import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { LineIcon, Logo, Price, TimeAndAirport } from "./components";
export const FlightDetail = ({ v, flight, airports }) => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  // console.log(flight);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cookies.userToken === undefined) {
      Swal.fire({
        icon: "warning",
        text: "Please login first",
        showConfirmButton: true,
        confirmButtonColor: "#337AFF",
        confirmButtonText: "Login",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login?redirect=/search");
        }
      });
    } else {
      if (v.isReturn) {
        navigate(
          "/search?from=" +
            v.from +
            "&to=" +
            v.to +
            "&departure=" +
            v.departure +
            "&arrival=" +
            v.arrival +
            "&adult=" +
            v.adult +
            "&child=" +
            v.child +
            "&infant=" +
            v.infant +
            "&class=" +
            v.class +
            "&isReturn=" +
            v.isReturn +
            "&departureFlightID=" +
            flight.FlightID
        );
      }
    }
    return;
  };

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

  if(flight) return (
    <>
      <div className="container lg:max-w-1000 my-1 p-8 bg-white rounded border flex flex-wrap justify-between items-center">
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
          <Link to="">
            <li>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 px-6 mt-2 py-1 rounded text-white hover:ring focus:bg-blue-400"
              >
                Select
              </button>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
  else return <><div className="p-8 rounded bg-red-200 text-red-800 font-black text-3xl">Flight is null</div></>;
};
