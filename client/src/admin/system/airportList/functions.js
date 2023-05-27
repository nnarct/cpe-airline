import Axios from "axios";
import Swal from "sweetalert2";

export  const getAirports = async (setAirports) => {
  const res = await fetch("http://localhost:3001/system/airportList");
  const data = await res.json();
  setAirports(data.Data);
};

export const editAirport = (setAirports, airport) => {
  const sselected = airport?.section === "South" ? "selected" : "";
  const cselected = airport?.section === "Central" ? "selected" : "";
  const nselected = airport?.section === "North" ? "selected" : "";
  const neselected = airport?.section === "Northeast" ? "selected" : "";
  Swal.fire({
    title: "Edit Airport",
    html: `<div>You are editing airport ID
              <span class="font-bold">${airport?.AirportID}</span>
              <span class="text-blue-500 font-bold">${
                airport?.IATA
              }</span>
            </div>
          <div class="flex items-center justify-center py-1">
            <label htmlFor="name" class="w-24 block">Name</label>
            <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="Name" value="${
              airport?.Name
            }">
          </div>
          <div class="flex items-center justify-center py-1">
            <label htmlFor="iata" class="w-24 block">IATA</label>
            <input id="swal-input2" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="IATA" value="${
              airport?.IATA
            }">
          </div>
          <div class="flex items-center justify-center py-1">
            <label htmlFor="state" class="w-24 block">State</label>
            <input id="swal-input3" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="State" value="${
              airport?.State
            }">
          </div>
          <div class="flex items-center justify-center py-1">
            <label htmlFor="province" class="w-24 block">Province</label>
            <input id="swal-input4" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="Province" value="${
              airport?.Province
            }">
            </div>
          <div class="flex items-center justify-center py-1">
              <label htmlFor="section" class="w-24 block">section</label>
              <select id="swal-input5" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" value="${
                airport?.section
              }">
                <option value="South" ${sselected}>South</option>
                <option value="Central" ${cselected}>Central</option>
                <option value="North" ${nselected}>North</option>
                <option value="Northeast" ${neselected}>Northeast</option>
              </select>
            </div>`,
    showCancelButton: true,
    confirmButtonText: "Save",
    confirmButtonColor: "#2563eb",
    cancelButtonText: "Cancel",
    focusCancel: true,

    preConfirm: () => {
      const Name = document.getElementById("swal-input1").value;
      const IATA = document.getElementById("swal-input2").value;
      const State = document.getElementById("swal-input3").value;
      const Province = document.getElementById("swal-input4").value;
      const section = document.getElementById("swal-input5").value;
      if (!Name) Swal.showValidationMessage(`Please enter airport name`);
      else if (!IATA) Swal.showValidationMessage(`Please enter airport IATA`);
      else if (!State)
        Swal.showValidationMessage(`Please enter airport state`);
      else if (!Province)
        Swal.showValidationMessage(`Please enter airport province`);
      else if (!section)
        Swal.showValidationMessage(`Please enter airport section`);  
      return { Name, IATA, State, Province, section };
    },
  }).then((result) => {
    if (result.isConfirmed)
      Axios.post(
        "http://localhost:3001/system/editAirport",
        result.value
      ).then((res, err) => {
        if (err)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        else if (res.data.Status === "Edit airport successfully! :)")
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.Status,
            timer: 3000,
            timerProgressBar: true,
            confirmButtonColor: "#2563eb",
          }).then(() => getAirports(setAirports));
        else if (res.data.Error)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.Error,
            timer: 3000,
            timerProgressBar: true,
          });
      });
  });
};

export const deleteAirport = (airport) => {
  Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    html: `You are deleting Airport ${airport.AirportID}, <span class="font-semibold text-red-500">${
      airport.Name
    }</span>
    <div class="py-1 bg-red-100 text-red-700 w-full rounded mt-4">This will be very <span class="font-semibold">harmful</span>  to the client side website! <br>This action cannot be undone !</div>`,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    focusCancel: true,
  }).then((result) => {
    if (result.isConfirmed)
      Axios.post("http://localhost:3001/system/deleteAirport", {
        id: airport.AirportID,
      }).then((res, err) => {
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
  });
};
