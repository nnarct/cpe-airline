import Axios from "axios";
import Swal from "sweetalert2";

export const getAirlines = async (setAirlines) => {
  const res = await fetch("http://localhost:3001/system/airlineList");
  const data = await res.json();
  setAirlines(data.Data);
};

export const editAirline = (airline, setAirlines) => {
  Swal.fire({
    title: "Edit Airline",
    html: `<div class="">You are editing airline ID 
              <span class="text-red-500 font-bold">${airline.AirlineID}</span>
            </div>
          <div class="flex items-center justify-center">
            <label htmlFor="Name" class="w-24 block">Name</label>
            <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="Name" value="${airline.Name}">
          </div>
          <div class="flex items-center justify-center">
            <label htmlFor="link" class="w-24 block">Link</label>
            <input id="swal-input2" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="Link" value="${airline.Link}">
          </div>`,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Save",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    focusCancel: true,
    // Todo - validate name input , alphabet and . only and maximum 40 characters
    preConfirm: () => {
      const name = document.getElementById("swal-input1").value;
      const link = document.getElementById("swal-input2").value;
      if (!name) {
        Swal.showValidationMessage("Please enter a name");
      }
      if (!link) {
        Swal.showValidationMessage("Please enter a link");
      }
      return { Name: name, Link: link };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.post("http://localhost:3001/system/editAirline", {
        id: airline.AirlineID,
        Name: result.value.Name,
        Link: result.value.Link,
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
        else {
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
          getAirlines(setAirlines);
        }
      });
    }
  });
};

export const deleteAirline = (airline, setAirlines) => {
  Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    html: `You are deleting airline ID ${airline.AirlineID}, <span class="font-semibold text-red-500">${airline.Name}</span>
    <div class="py-1 bg-red-100 text-red-700 w-full rounded mt-4">This will be very <span class="font-semibold">harmful</span>  to the client side website! <br>This action cannot be undone !</div>`,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    focusCancel: true,
  }).then((result) => {
    if (result.isConfirmed)
      Axios.post("http://localhost:3001/system/deleteAirline", {
        id: airline.AirlineID,
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
        getAirlines(setAirlines);
      });
  });
};

export const addAirline = (setAirlines) => {
  Swal.fire({
    title: "Add New Airline",
    html: `<form>
          <div class="flex items-center justify-center">
            <label htmlFor="Name" class="w-24 block">Name</label>
            <input id="Name" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="Name">
          </div>
          <div class="flex items-center justify-center">
            <label htmlFor="link" class="w-24 block">Link</label>
            <input id="Link" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="Link">
          </div>
          </form>`,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Add",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    focusCancel: true,
    preConfirm: () => {
      const name = document.getElementById("Name").value;
      const link = document.getElementById("Link").value;
      if (!name) Swal.showValidationMessage("Please enter a name");
      if (!link) Swal.showValidationMessage("Please enter a link");
      return { Name: name, Link: link };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.post(
        "http://localhost:3001/system/insertAirline",
        result.value
      ).then((res, err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: err,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return;
        }
        if (res.data.Error) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: res.data.Error,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return;
        }
        if (res.data.Status) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: res.data.Status,
            timer: 2000,
            timerProgressBar: true,
            confirmButtonColor: "#3085d6",
          });
          getAirlines(setAirlines);
        }
      });
    }
  });
};
