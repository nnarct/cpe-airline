import Axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlightDetail } from "./flightdetail";
import { SelectedFlight } from "./selectedFlight";
import { Link } from "react-router-dom";
export const SearchResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const v = {
    from: params.get("from"),
    to: params.get("to"),
    departure: params.get("departure"),
    arrival: params.get("arrival"),
    adult: params.get("adult"),
    child: params.get("child"),
    infant: params.get("infant"),
    class: params.get("class"),
    isReturn: params.get("isReturn"),
    departureFlightID: params.get("departureFlightID"),
  };

  const [flights, setFlights] = useState([{ Origin: "" }]);
  const [noFlight, setNoFlight] = useState(true);
  useEffect(() => {
    if (v.departureFlightID) {
      v.arrival = params.get("departure");
      v.departure = params.get("arrival");
    }
    Axios.post("http://localhost:3001/search/SearchFlights", v).then(
      (res, err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Sorry",
            text: "Something went wrong",
            showConfirmButton: true,
            confirmButtonText: "Back to homepage",
          }).then((res) => navigate("/"));
        }
        if (res.data.Status === "Success") {
          setNoFlight(false);
          setFlights(res.data.Flights);
        } else if (res.data.Status === "No flight found.") {
          Swal.fire({
            icon: "warning",
            text: "No flight on this route",
            title: "Sorry",
            showConfirmButton: true,
            confirmButtonText: "Back to homepage",
          }).then(res => navigate("/"));
        } else
          Swal.fire({
            icon: "error",
            text: res.data.Error,
            title: "Error",
            showConfirmButton: true,
            timer: 5000,
            timerProgressBar: true,
          }).then(res => navigate("/"));
      }
    );
  }, [v]);

  const prevDay = (e) => {
    e.preventDefault();
    const date = new Date(v.departure);
    const limit = new Date("2023-05-29");
    if (date <= limit) return;
    date.setDate(date.getDate() - 1);
    const newDate = moment(date).format("YYYY-MM-DD");
    if (v.isReturn === 1)
      navigate(
        "/search?from=" +
          v.from +
          "&to=" +
          v.to +
          "&departure=" +
          newDate +
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
          v.departureFlightID
      );
    else
      navigate(
        "/search?from=" +
          v.from +
          "&to=" +
          v.to +
          "&departure=" +
          newDate +
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
          v.isReturn
      );
    // window.location.reload();
  };
  const nextDay = (e) => {
    e.preventDefault();
    const date = new Date(v.departure);
    const limit = new Date("2023-06-06");
    if (date >= limit) return;
    date.setDate(date.getDate() + 1);
    const newDate = moment(date).format("YYYY-MM-DD");
    if (v.isReturn === "1")
      navigate(
        "/search?from=" +
          v.from +
          "&to=" +
          v.to +
          "&departure=" +
          newDate +
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
          v.departureFlightID
      );
    else
      navigate(
        "/search?from=" +
          v.from +
          "&to=" +
          v.to +
          "&departure=" +
          newDate +
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
          v.isReturn
      );
    // window.location.reload();
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen w-screen flex flex-col items-center pb-20">
        {/* <Head
            from={airportName(flights[0].Origin, flights[0].OriIATA)}
            to={airportName(flights[0].Destination, flights[0].DesIATA)}
            departure={formatDate(v.departure)}
          /> */}
        {noFlight ? null : (
          <>
            {v.departureFlightID && v.departureFlightID !== "null" ? (
              <SelectedFlight id={v.departureFlightID} />
            ) : (
              <div>
                <button
                  onClick={prevDay}
                  className="bg-blue-300 hover:ring border rounded mx-3 px-3"
                >
                  Previous Day
                </button>
                <button
                  onClick={nextDay}
                  className="bg-blue-300 hover:ring border rounded mx-3 px-3"
                >
                  Next Day
                </button>
              </div>
            )}

            {flights?.map((flight, i) => {
              return (
                <FlightDetail cheap={i} key={flight.FlightID} v={v} flight={flight} />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
