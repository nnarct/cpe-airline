import Axios from "axios";
import Swal from "sweetalert2";


export const getEmployeeList = async (setEmployees,setAirlines) => {
  try {
    const res = await fetch("http://localhost:3001/system/employeeList");
    const data = await res.json();
    setEmployees(data.Data);
    setAirlines(data.Airlines);
  } catch (error) {
    console.log(error);
  }
};

export const editEmployee = (employee,airlines) => {
  console.log(airlines);
  Swal.fire({
    title: "Edit Employee",
    html: `<div class="">You are editing employee ID
              <span class="text-red-500 font-bold">${employee?.EmployeeID}</span>
              <span class="text-blue-500 font-bold pr-2">${employee?.FirstName} ${employee?.LastName}</span>
            </div>
            <form>
              <div class="flex items-center justify-center">
                <label htmlFor="FirstName" class="w-24 block">FirstName</label>
                <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="FirstName" value="${employee?.FirstName}">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="LastName" class="w-24 block">LastName</label>
                <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="LastName" value="${employee?.LastName}">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="Email" class="w-24 block">Email</label>
                <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="Email" value="${employee?.Email}">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="TelNo" class="w-24 block">TelNo</label>
                <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="TelNo" value="${employee?.TelNo}">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="Position" class="w-24 block">Position</label>
                <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="Position" value="${employee?.Position}">
              </div>
              <div class="flex items-center justify-center">
              <label htmlFor="AirlineID" class="w-24 block">Airline ID</label>
              <select id="AirlineID" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-4" value="${
                employee?.AirlineID
              }">
              ${airlines?.map((a, i) => {
              return `<option key=${i} value=${a.AirlineID} ${
                a.AirlineID === employee.AirlineID ? "selected" : ""
              }>
                  ${a.AirlineID}. ${a.Name}
                </option>`;
              })}
              </select>
              </div>
              </form>
          `,  
  });
};

export const deleteEmployee = (employee) => {
Swal.fire({
  icon: "warning",
  title: "Are you sure?",
  html: `You are deleting employee ${employee.EmployeeID}, <span class="font-semibold text-red-500">${
    employee.Name
  }</span>
  <div class="py-1 bg-red-100 text-red-700 w-full rounded">This will be very <span class="font-semibold">harmful</span>  to the client side website! <br>This action cannot be undone !</div>`,
  showValidationMessage: "no",
  showCancelButton: true,
  confirmButtonColor: "#d33",
  confirmButtonText: "Confirm",
  cancelButtonText: "Cancel",
}).then((result) => {
  if (result.isConfirmed)
    Axios.post("http://localhost:3001/system/deleteEmployee", {
      id: employee.EmployeeID,
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

