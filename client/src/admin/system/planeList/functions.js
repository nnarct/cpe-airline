import Axios from "axios";
import Swal from "sweetalert2";
export const getPlanes = async (setPlanes, setAirlines) => {
  try {
    const res = await fetch("http://localhost:3001/system/planeList");
    const data = await res.json();
    setPlanes(data.Data);
    setAirlines(data.Airlines);
  } catch (error) {
  }
};
// Todo - edit plane
export const editPlane = (plane) => {
  Swal.fire({
    title: "Edit Plane",
    html: `<div class="">You are editing Plane ID
              <span class="text-red-500 font-bold">${plane?.PlaneID
              }</span>
            </div>
            <form>
              <div class="flex items-center justify-center">
                <label htmlFor="PlaneID" class="w-24 block">PlaneID</label>
                <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="PlaneID" value="
                ${plane?.PlaneID}">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="AirlineID" class="w-24 block">AirlineID</label>
                <input id="swal-input2" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="AirlineID" value="
                ${plane?.AirlineID}">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="PlaneModel" class="w-24 block">PlaneModel</label>
                <input id="swal-input3" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="PlaneModel" value="
                ${plane?.PlaneModel}">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="SeatingPlan" class="w-24 block">SeatingPlan</label>
                <input id="swal-input4" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="SeatingPlan" value="
                ${plane?.SeatingPlan}">
              </div>
              </div>
              </form>
          `,
    confirmButtonText: "Save",
    showCancelButton: true,
    focusCancel: true,
    confirmButtonColor: "#3085d6",

    preConfirm: () => {
      const planeID = document.getElementById("swal-input1").value;
      const airlineID = document.getElementById("swal-input2").value;
      const planeModel = document.getElementById("swal-input3").value;
      const seatingPlan = document.getElementById("swal-input4").value;
      
      if (!planeID) Swal.showValidationMessage("Please enter a planeID");
      if (!airlineID) Swal.showValidationMessage("Please enter a airlineID");
      if (!planeModel) Swal.showValidationMessage("Please enter a planeModel");
      if (!seatingPlan) Swal.showValidationMessage("Please enter a seatingPlan");
      return { PlaneID: planeID, AirlineID: airlineID, PlaneModel: planeModel, SeatingPlan: seatingPlan };
    },
  }).then((result) => { 
    if (result.isConfirmed)
      Axios.post("http://localhost:3001/system/editPlane", {
        id: plane.PlaneID,
        // PlaneID: result.value.PlaneID.trim(),
        AirlineID: result.value.AirlineID.trim(),
        PlaneModel: result.value.PlaneModel.trim(),
        SeatingPlan: result.value.SeatingPlan.trim(),
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
export const deletePlane = (plane, airlines) => {
  Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    html: `You are deleting plane ${plane.PlaneID}, <span class="font-semibold text-red-500">${plane.PlaneModel}</span>
        <div class="py-1 bg-red-100 text-red-700 w-full rounded mt-4">This will be very <span class="font-semibold">harmful</span>  to the client side website! <br>This action cannot be undone !</div>`,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    focusCancel: true,
  }).then((result) => {
    if (result.isConfirmed)
      Axios.post("http://localhost:3001/system/deletePlane", {
        id: plane.PlaneID,
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
          }).then(() => {
            getPlanes(plane, airlines);
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
//Todo - add plane
export const addPlane = (plane, airlines) => {
  Swal.fire({
    title: "Add Plane",
    html: `<div class="">You are adding Plane
                </div>
                <form>
                <div class="flex items-center justify-center">
                    <label htmlFor="PlaneID" class="w-28 block">PlaneID</label>
                    <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="PlaneID">
                  </div>
                  <div class="flex items-center justify-center">
                    <label htmlFor="AirlineID" class="w-28 block">AirlineID</label>
                    <input id="swal-input2" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="AirlineID">
                  </div>
                  <div class="flex items-center justify-center">
                    <label htmlFor="PlaneModel" class="w-28 block">PlaneModel</label>
                    <input id="swal-input3" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="PlaneModel">
                  </div>
                  <div class="flex items-center justify-center">
                    <label htmlFor="SeatingPlan" class="w-28 block">SeatingPlan</label>
                    <input id="swal-input4" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="SeatingPlan">
                  </div>
                  </div>
              </form>
              `,
    preConfirm: () => {
      const planeID = document.getElementById("swal-input1").value;
      const airlineID = document.getElementById("swal-input2").value;
      const planeModel = document.getElementById("swal-input3").value;
      const seatingPlan = document.getElementById("swal-input4").value;

      if (!planeID) Swal.showValidationMessage("Please enter a planeID");
      if (!airlineID) Swal.showValidationMessage("Please enter a airlineID");
      if (!planeModel) Swal.showValidationMessage("Please enter a planeModel");
      if (!seatingPlan) Swal.showValidationMessage("Please enter a seatingPlan");
      return { airlineID, planeModel, seatingPlan };
    },
    confirmButtonText: "Save",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed)
      Axios.post("http://localhost:3001/system/addPlane", {
        id: plane.PlaneID,
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
  

