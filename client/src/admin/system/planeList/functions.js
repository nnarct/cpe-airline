import Axios from "axios";
import Swal from "sweetalert2";
export const getPlanes = async (setPlanes, setAirlines) => {
  try {
    const res = await fetch("http://localhost:3001/system/planeList");
    const data = await res.json();
    setPlanes(data.Data);
    setAirlines(data.Airlines);
  } catch (error) {
    console.log(error);
  }
};

export const editPlane = (plane, airlines) => {
  Swal.fire({
    title: "Edit Plane",
    html: `<div class="">You are editing Plane ID
              <span class="text-red-500 font-bold">${plane?.PlaneID}</span>
            </div>
            <form>
              <div class="flex items-center justify-center">
                <label htmlFor="PlaneID" class="w-24 block">PlaneID</label>
                <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="PlaneID" value="${plane?.PlaneID}">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="AirlineID" class="w-24 block">AirlineID</label>
                <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="AirlineID" value="${plane?.AirlineID}">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="PlaneModel" class="w-24 block">PlaneModel</label>
                <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="PlaneModel" value="${plane?.PlaneModel}">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="SeatingPlan" class="w-24 block">SeatingPlan</label>
                <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="SeatingPlan" value="${plane?.SeatingPlan}">
              </div>
              </div>
              </form>
          `,
    confirmButtonText: "Save",
    showCancelButton: true,
    focusCancel: true,
    confirmButtonColor: "#3085d6",
  });
};

export const deletePlane = (plane, airlines) => {
  Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    html: `You are deleting plane ${plane.PlaneID}, <span class="font-semibold text-red-500">${plane.PlaneModel}</span>
        <div class="py-1 bg-red-100 text-red-700 w-full rounded mt-4">This will be very <span class="font-semibold">harmful</span>  to the client side website! <br>This action cannot be undone !</div>`,
    showValidationMessage: "no",
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

export const addPlane = (airlines) => {
  Swal.fire({
    title: "Add Plane",
    html: `<div class="">You are adding Plane
                </div>
                <form>
                  <div class="flex items-center justify-center">
                    <label htmlFor="AirlineID" class="w-28 block">AirlineID</label>
                    <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="AirlineID">
                  </div>
                  <div class="flex items-center justify-center">
                    <label htmlFor="PlaneModel" class="w-28 block">PlaneModel</label>
                    <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="PlaneModel">
                  </div>
                  <div class="flex items-center justify-center">
                    <label htmlFor="SeatingPlan" class="w-28 block">SeatingPlan</label>
                    <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="SeatingPlan">
                  </div>
                  </div>
              </form>
              `,
    confirmButtonText: "Save",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
  });
};
