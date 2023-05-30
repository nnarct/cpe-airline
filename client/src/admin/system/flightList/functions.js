import Swal from "sweetalert2";
import moment from "moment";
import Axios from "axios";

export const getFlights = async ({
  setFlights,
  setAirlines,
  setAirports,
  setLoading,
}) => {
  try {
    const res = await fetch("http://localhost:3001/system/flightList");
    const data = await res.json();
    if (data.Error)
      Swal.fire({
        icon: "error",
        title: data.Error,
        html: `<div class="text-red-900 bg-red-200 rounded py-1 px-4 mx-auto w-fit">${
          data.SQL || ""
        }</div>`,
      });
    setFlights(data.Data);
    setAirlines(data.Airlines);
    setAirports(data.Airports);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

export const getPlanes = async ({ setPlanes }) => {
  try {
    const res = await fetch("http://localhost:3001/system/planeList");
    const data = await res.json();
    setPlanes(data.Data);
  } catch (err) {
    console.log(err);
  }
};

export const editFlight = ({ flight, airlines, airports, planes }) => {
  const id = flight.FlightID;
  const depDate = flight?.DepartureTime.split("T")[0];
  const depTime = moment(new Date(flight?.DepartureTime)).format("HH:mm");
  const arrDate = flight?.ArrivalTime.split("T")[0];
  const arrTime = moment(new Date(flight?.ArrivalTime)).format("HH:mm");
  Swal.fire({
    title: "Edit Flight",
    html: `<div class="">You are editing flight ID
      <span class="text-red-500 font-bold">${id}</span>
      <span class="text-blue-500 font-bold pr-2">${flight?.oriIATA}-${
      flight?.desIATA
    }</span>
    </div>
    <form>
      <div class="flex items-center justify-center">
        <label htmlFor="FlightNumber" class="w-24 block">Flight No.</label>
        <input id="FlightNumber" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="Flight Number" value="${
          flight?.FlightNumber
        }">
      </div>
      <div class="flex items-center justify-center">
        <label htmlFor="Airline" class="w-24 block">Airline</label>
        <select id="AirlineSelect" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" value="${
          flight?.AirlineID
        }">
        ${airlines?.map((a, i) => {
          return `<option key=${i} value=${a.AirlineID} ${
            a.AirlineID === flight.AirlineID ? "selected" : ""
          }>
              ${a.AirlineID}. ${a.Name}
            </option>`;
        })}
        </select>
      </div>
      <div class="flex items-center justify-center">
      <label htmlFor="OriginAirport" class="w-24 block">From</label>
      <select id="OriginAirportSelect" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" value="${
        flight.OriginAirportID
      }">
      ${airports?.map((a, i) => {
        return `<option key=${i} value=${a.AirportID} ${
          a.AirportID === flight.OriginAirportID ? "selected" : ""
        }>
            (${a.AirportID}) ${a.IATA} ${a.Name}
          </option>`;
      })}
      </select>
      </div>
      <div class="flex items-center justify-center">
        <label htmlFor="DestinationAirport" class="w-24 block">To</label>
        <select id="DestinationAirportSelect" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" value="${
          flight.DestinationAirportID
        }">
        ${airports?.map((a, i) => {
          return `<option key=${i} value=${a.AirportID} ${
            a.AirportID === flight.DestinationAirportID ? "selected" : ""
          }>
              ${a.AirportID}. ${a.IATA} ${a.Name}
            </option>`;
        })}
        </select>
      </div>
      <div class="flex items-center">
        <label htmlFor="depDateTime" class="w-24 block">Departure</label>
        <input id="depDate" type="date" class="w-34 px-2 py-1.5 active:ring rounded border my-2 mr-2" min="2023-05-29" max="2023-06-04" value=${depDate}>
        <input id="depTime" type="time" class="w-28 px-2 py-1.5 active:ring rounded border my-2" placeholder="depTime" value=${depTime}>
      </div>
      <div class="flex items-center">
        <label htmlFor="arrDatTime" class="w-24 block">Arrival</label>
        <input id="arrDate" type="date" class="w-34 px-2 py-1.5 active:ring rounded border my-2 mr-2" min="2023-05-29" max="2023-06-04" value=${arrDate}>
        <input id="arrTime" type="time" class="w-28 px-2 py-1.5 active:ring rounded border my-2" placeholder="arrTime" value=${arrTime}>
      </div>
      <div class="flex items-center justify-center">
        <label htmlFor="Plane" class="w-24 block">Plane</label>
        <select id="PlaneSelect" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2">
        </select>
        
    </form>`,
    confirmButtonText: "Save",
    showCancelButton: true,
    focusCancel: true,
    confirmButtonColor: "#3b82f6",
    didOpen: () => {
      const select1 = document.getElementById("AirlineSelect");
      const select2 = document.getElementById("PlaneSelect");

      for (const plane of planes) {
        select2.innerHTML += `<option value=${plane.PlaneID} ${
          plane.PlaneID === flight.PlaneID
            ? "selected"
            : plane.AirlineID === flight.AirlineID
            ? ""
            : "disabled"
        }>
              (${plane.PlaneID}) ${plane.PlaneModel} (${plane.airline})
            </option>`;
      }
      select1.addEventListener("input", (e) => {
        select2.innerHTML = "";
        const selectedValue = select1.value;
        const correctPlanes = planes?.filter(
          (p) => p.AirlineID === Number(selectedValue)
        );
        const otherPlanes = planes?.filter(
          (p) => p.AirlineID !== Number(selectedValue)
        );
        for (let i = 0; i < correctPlanes.length; i++) {
          select2.innerHTML += `<option ${i === 0 ? "selected" : ""} value=${
            correctPlanes[i].PlaneID
          }>(${correctPlanes[i].PlaneID}) ${correctPlanes[i].PlaneModel} ${
            correctPlanes[i].airline
          }}</option>`;
        }
        for (const otherPlane of otherPlanes) {
          select2.innerHTML += `<option disabled value=${otherPlane.PlaneID}>(${otherPlane.PlaneID}) ${otherPlane.PlaneModel} ${otherPlane.airline}</option>`;
        }
      });
    },
    preConfirm: () => {
      const flightNumber = document.getElementById("FlightNumber").value;
      const airline = document.getElementById("AirlineSelect").value;
      const originAirport = document.getElementById(
        "OriginAirportSelect"
      ).value;
      const destinationAirport = document.getElementById(
        "DestinationAirportSelect"
      ).value;
      const plane = document.getElementById("Plane").value;
      const depDate = document.getElementById("depDate").value;
      const depTime = document.getElementById("depTime").value;
      const arrDate = document.getElementById("arrDate").value;
      const arrTime = document.getElementById("arrTime").value;

      if (!flightNumber)
        Swal.showValidationMessage("Please enter flight number");
      else if (!airline)
        Swal.showValidationMessage("Please select airline name");
      else if (!originAirport)
        Swal.showValidationMessage("Please select origin airport name");
      else if (!destinationAirport)
        Swal.showValidationMessage("Please select destination airport name");
      else if (!plane) Swal.showValidationMessage("Please select plane");
      else if (!depDate)
        Swal.showValidationMessage("Please select departure date");
      else if (!depTime)
        Swal.showValidationMessage("Please select departure time");
      else if (!arrDate)
        Swal.showValidationMessage("Please select arrival date");
      else if (!arrTime)
        Swal.showValidationMessage("Please select arrival time");
      else if (originAirport === destinationAirport) {
        Swal.showValidationMessage(
          "Origin and destination airports cannot be the same. Please select again."
        );
      } else if (arrTime <= depTime)
        Swal.showValidationMessage(
          "Arrival time must be later than departure time"
        );

      return {
        id: flight?.FlightID,
        FlightNumber: flightNumber,
        AirlineID: Number(airline),
        OriginAirportID: Number(originAirport),
        DestinationAirportID: Number(destinationAirport),
        PlaneID: Number(plane),
        DepartureTime: `${depDate}T${depTime}`,
        ArrivalTime: `${arrDate}T${arrTime}`,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.post("http://localhost:3001/system/editFlight", result.value).then(
        (res, err) => {
          if (err)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err,
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          else if (res.data.Status === "Edit flight successfully! :)")
            Swal.fire({
              icon: "success",
              title: "Success",
              text: res.data.Status,
              timer: 3000,
              timerProgressBar: true,
              confirmButtonColor: "#2563eb",
            });
          else if (res.data.Error)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.data.Error,
              timer: 3000,
              timerProgressBar: true,
            });
        }
      );
    }
  });
};
// Todo -delete flight
export const deleteFlight = (flight) => {
  // todo - popup to make sure u wanna delete the flight
  // if confirm - send request to database to delete to flight where flight id =id
  Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    html: `You are deleting Airport ${flight.FlightID}, <span class="font-semibold text-red-500">${flight.FlightNumber}</span>
    <div class="py-1 bg-red-100 text-red-700 w-full rounded mt-4">This will delete all passenger data of this flight.</div>
    <div class="py-1 bg-red-100 text-red-700 w-full rounded mt-4">This will delete all booking data of this flight.</div>
    <div class="py-1 bg-red-100 text-red-700 w-full rounded mt-4">This action cannot be undone !</div>`,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    focusCancel: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      Axios.post("http://localhost:3001/system/deleteFlight", {
        id: flight.FlightID,
      }).then((res, err) => {
        Swal.close();
        if (err)
          Swal.fire({
            title: "Error!",
            text: err,
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        if (res.data.Status)
          Swal.fire({
            title: "Success!",
            text: res.data.Status,
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
            showConfirmButton: true,
          });
        else if (res.data.Error)
          Swal.fire({
            title: "Error!",
            text: res.data.Error,
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
      });
    }
  });
};
