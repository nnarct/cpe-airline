import Axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Star } from "../../components/star";
export const AddFlight = ({ airlines, airports, planes }) => {
  const [values, setValues] = useState({
    FlightNumber: "",
    AirlineID: 1,
    DepartureTime: new Date(),
    ArrivalTime: "",
    PlaneID: "",
    OriginAirportID: 1,
    DestinationAirportID: 1,
  });
  const handleSubmit = (e) => {
    const p = document.getElementById("Plane").value;
    const ori = document.getElementById("OriginAirport").value;
    const des = document.getElementById("DestinationAirport").value;
    
    setValues({ ...values, PlaneID: p , OriginAirportID: ori, DestinationAirportID: des});
  
    if (values.FlightNumber === "") {
      Swal.fire({
        icon: "info",
        title: "Sorry",
        text: "Please input flight number again.",
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }
    if (values.AirlineID === "") {
      Swal.fire({
        icon: "info",
        title: "Sorry",
        text: "Please select airline again.",
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }
    if (values.DepartureTime === "") {
      Swal.fire({
        icon: "info",
        title: "Sorry",
        text: "Please select departure time again.",
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }
    if (values.ArrivalTime === "") {
      Swal.fire({
        icon: "info",
        title: "Sorry",
        text: "Please select arrival time again.",
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }
    if (p === 0 ||p === "") {
      Swal.fire({
        icon: "info",
        title: "Sorry",
        text: "Please select plane again.",
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }
    if (
      values.DestinationAirportID === 0 ||
      values.DestinationAirportID === ""
    ) {
      Swal.fire({
        icon: "info",
        title: "Sorry",
        text: "Please select destiantion airport again.",
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }
    if (values.OriginAirportID === 0 || values.OriginAirportID === "") {
      Swal.fire({
        icon: "info",
        title: "Sorry",
        text: "Please select origin airport again.",
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }
    if (values.OriginAirportID === values.DestinationAirportID) {
      Swal.fire({
        icon: "info",
        title: "Sorry",
        text: "Origin airport and destination airport must be different.",
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }
    Axios.post("http://localhost:3001/system/insertFlight", values).then(
      (res, err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err,
            timer: 5000,
            timerProgressBar: true,
          });
          return;
        }
        if (res.data.Status === "Create new flight successfully! :)")
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.Status,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        else
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.Error,
            timer: 5000,
            timerProgressBar: true,
          });
      }
    );
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
            defaultValue={1}
            onChange={(e) =>
              setValues({ ...values, AirlineID: e.target.value })
            }
          >
            {airlines?.map((airline, i) => {
              return (
                <option key={`airline${i}`} value={airline.AirlineID}>
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
            onChange={(e) =>
              setValues({ ...values, ArrivalTime: e.target.value })
            }
          />

          <label htmlFor="Plane" className="w-24 block">
            Plane
          </label>
          <select
            id="Plane"
            className="w-full px-2 py-1.5 active:ring rounded border my-2"
            defaultValue={values.PlaneID}
            onChange={(e) => {
              setValues({ ...values, PlaneID: e.target.value });
            }}
          >
            {planes?.map((p, i) => {
              if (Number(p.AirlineID) === Number(values.AirlineID)){
                return (
                  <option key={p.PlaneID} value={p.PlaneID}>
                    {p.PlaneModel} {p.airline}
                  </option>
                );}
              return null;
            })}
          </select>

          <label htmlFor="OriginAirport">Origin Airport</label>
          <select
            name="OriginAirport"
            id="OriginAirport"
            className="mb-2 border rounded p-1"
            defaultValue={0}
            onChange={(e) =>
              setValues({
                ...values,
                OriginAirportID: e.target.value,
              })
            }
          >
            {airports?.map((airport, i) => {
              return (
                <option key={`origin${i}`} value={airport.AirportID}>
                  {i + 1}. {airport.Name} ({airport.IATA})
                </option>
              );
            })}
          </select>
          <label htmlFor="DestinationAirport">Destination Airport</label>
          <select
            name="DestinationAirport"
            id="DestinationAirport"
            className="mb-2 border rounded p-1"
            defaultValue={0}
            onChange={(e) =>
              setValues({
                ...values,
                DestinationAirportID: e.target.value,
              })
            }
          >
            {airports?.map((airport, i) => {
              return (
                <option key={`destination${i}`} value={airport.AirportID}>
                  {i + 1}. {airport.Name} ({airport.IATA})
                </option>
              );
            })}
          </select>
          <label htmlFor="Price">Economy Price</label>
          <input
            className="mb-2 border rounded p-1"
            type="number"
            min={0}
            onChange={(e) => setValues({ ...values, EconomyPrice: e.target.value })}
          />
          
          <label htmlFor="Price">Premium Price</label>
          <input
            className="mb-2 border rounded p-1"
            type="number"
            min={0}
            onChange={(e) => setValues({ ...values, PremiumPrice: e.target.value })}
          />

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
