import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { LineIcon, Logo, Price, TimeAndAirport } from "./components";
export const FlightDetail = ({ v, flight }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cookies.userToken === undefined)
      Swal.fire({
        icon: "warning",
        text: "Please login first",
        showConfirmButton: true,
        confirmButtonColor: "#337AFF",
        confirmButtonText: "Login",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) navigate("/login?redirect=/search");
      });
    else if (v.isReturn === "1") {
      if (v.departureFlightID)
        navigate(
          "/contact?adult=" +
            v.adult +
            "&child=" +
            v.child +
            "&infant=" +
            v.infant +
            "&isReturn=" +
            v.isReturn +
            "&departureFlightID=" +
            v.departureFlightID +
            "&returnFlightID=" +
            flight.FlightID + 
            "&class=" +
            v.class
        );
      else
        navigate(
          "/search?from=" +
            v.to +
            "&to=" +
            v.from +
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
            flight.FlightID + 
            "&class=" +
            v.class
        );
    } else if (v.isReturn === "0") {
      navigate(
        "/contact?adult=" +
          v.adult +
          "&child=" +
          v.child +
          "&infant=" +
          v.infant +
          "&isReturn=" +
          v.isReturn +
          "&departureFlightID=" +
          flight.FlightID +
          "&class=" +
          v.class
      );
    }

    return;
  };

  const name = (name) => {
    if (name) {
      let sname = name.replace(" International", "").replace(" Airport", "");
      if (sname === "Suvarnabhumi" || sname === "Don Mueang") return "Bangkok";
      return sname;
    }
    return "-";
  };
  return (
    <>
      <div className="container lg:max-w-1000 my-1 p-8 bg-white rounded border flex flex-wrap justify-between items-center">
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
          <Price price={flight?.Price} />
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
};
