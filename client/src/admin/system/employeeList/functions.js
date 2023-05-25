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

export const deleteEmployee = (id) => {};
