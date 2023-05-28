import Axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

export const getPassengers = async ({ setPassengers }) => {
  const res = await fetch("http://localhost:3001/system/passengerList");
  const data = await res.json();
  setPassengers(data.Data);
};
export const getPassengersGroupByBookingID = async ({ setPassengers }) => {
  const res = await fetch(
    "http://localhost:3001/system/passengerListGroupByBookingID"
  );
  const data = await res.json();
  setPassengers(data.Data);
};
export const editPassenger = (passenger) => {
  const fselected = passenger?.Gender === "female" ? "selected" : "";
  const mselected = passenger?.Gender === "male" ? "selected" : "";
  const d = passenger?.DOB.split("T")[0];
  Swal.fire({
    title: "Edit Passenger",
    html: `<div class="">You are editing passenger ID
              <span class="text-red-500 font-bold">${
                passenger.PassengerID
              }</span>
              <span class="text-blue-500 font-bold pr-2">${
                passenger?.FirstName
              } ${passenger?.LastName}</span>
            </div>
            <form>
              <div class="flex items-center justify-center ">
                <label htmlFor="FirstName" class="w-24 block">FirstName</label>
                <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="FirstName" value="${
                  passenger?.FirstName
                }">
              </div>
              <div class="flex items-center justify-center py-2.5">
                <label htmlFor="LastName" class="w-24 block">LastName</label>
                <input id="swal-input2" class="w-full md:w-4/5 px-2 py-2.5 active:ring rounded border" placeholder="LastName" value="${
                  passenger?.LastName
                }">
              </div>
              <div class="flex items-center justify-center py-2.5">
                <label htmlFor="DOB" class="w-24 block">DOB</label>
                <input type="date" id="swal-input3" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="DOB" value="${d}" max=${moment(
      new Date()
    ).format("YYYY-MM-DD")}>
              </div>
              <div class="flex items-center justify-center py-2.5">
                <label htmlFor="gender" class="w-24 block">Gender</label>
                <select id="swal-input4" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" value="${
                  passenger?.Gender
                }">
                  <option value="male" ${mselected}>male</option>
                  <option value="female" ${fselected}>female</option>
                </select>
              </div>
              <div class="flex items-center justify-center py-2.5">
                <label htmlFor="nationality" class="w-24 block">Nationality</label>
                <input id="swal-input5" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="nationality" value="${
                  passenger?.Nationality
                }">
              </div>
          </form>`,

    showCancelButton: true,
    confirmButtonText: "Save",
    confirmButtonColor: "#2563eb",
    cancelButtonText: "Cancel",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      // Todo - validate input to match database
      const FirstName = document.getElementById("swal-input1").value;
      const LastName = document.getElementById("swal-input2").value;
      const DOB = document.getElementById("swal-input3").value;
      const Gender = document.getElementById("swal-input4").value;
      const Nationality = document.getElementById("swal-input5").value;
      if (FirstName === "")
        Swal.showValidationMessage(`Please enter First Name`);
      else if (LastName === "")
        Swal.showValidationMessage(`Please enter Last Name`);
      else if (Nationality === "")
        Swal.showValidationMessage(`Please enter Nationality`);
      return {
        id: passenger.PassengerID,
        FirstName,
        LastName,
        DOB,
        Gender,
        Nationality: Nationality,
      };
    },
  }).then((result) => {
    if (result.isConfirmed)
      Axios.post(
        "http://localhost:3001/system/editPassenger",
        result.value
      ).then((res, err) => {
        if (err)
          Swal.fire({
            icon: "error",
            title: "Please try again",
            text: err,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        else if (res.data.Status)
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.Status,
            timer: 3000,
            timerProgressBar: true,
            confirmButtonColor: "#2563eb",
            confirmButtonText: "OK",
          });
        else
          Swal.fire({
            icon: "error",
            title: "Please try again",
            text: res.data.Error,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
      });
  });
};

export const deletePassenger = (passenger) => {
  Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    html: `You are deleting passenger ${passenger.PassengerID}, <span class="font-semibold text-red-500">${passenger.FirstName}</span>
      <div class="py-1 bg-red-100 text-red-700 w-full rounded mt-4">This action cannot be undone !</div>`,
    showValidationMessage: "no",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    focusCancel: true,
  }).then((result) => {
    if (result.isConfirmed)
      Axios.post("http://localhost:3001/system/deletePassenger", {
        id: passenger.PassengerID,
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

