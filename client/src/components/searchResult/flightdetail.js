import moment from "moment";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FaPlane } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import ThaiSmile from "../../assets/airlinesLogo/thaiSmile.png";

export const FlightDetail = ({ v, flight, airports }) => {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
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
      // To do - select flight
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

  return (
    <>
      <div className="container lg:max-w-1000 my-1 p-8 bg-white rounded border flex flex-wrap justify-between items-center">
        <div className="w-52 flex items-center">
          <img className="object-cover w-16" src={ThaiSmile} alt="" />
          <span className="pl-4 text-lg font-semibold">Thai Smile</span>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <ul className="text-right">
            <li className="font-bold text-xl">
              {moment(flight.DepartureTime).format("HH:mm")}
            </li>
            <li>{iata(flight.OriginAirportID)}</li>
            <li>{name(flight.OriginAirportID)}</li>
          </ul>
          <ul className="flex items-center">
            <li className="">
              <FaPlane />
            </li>
            <li className="h-px bg-primary mx-2 w-12 md:w-24 lg:w-56"></li>
            <li>
              <MdLocationOn />
            </li>
          </ul>
          <ul>
            <li className="font-bold text-xl">
              {moment(flight.ArrivalTime).format("HH:mm")}
            </li>
            <li>{iata(flight.DestinationAirportID)}</li>
            <li>{name(flight.DestinationAirportID)}</li>
          </ul>
        </div>
        <ul className="w-36 flex flex-col justify-between items-end">
          <li className="text-red-500 font-bold">
            <span className="text-sm">B</span>
            <span className="text-2xl">1,293.09</span>
          </li>
          <li className="text-xs">Price for one passenger</li>
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
