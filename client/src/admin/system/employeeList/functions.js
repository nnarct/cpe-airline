import Axios from "axios";
import Swal from "sweetalert2";

export const getEmployeeList = async (setEmployees) => {
  try {
    const res = await fetch("http://localhost:3001/system/employeeList");
    const data = await res.json();
    setEmployees(data.Data);
  } catch (error) {
    console.log(error);
  }
};

export const editEmployee = (employee) => {
  Swal.fire({
    title: "Edit Employee",
    html: `<div class="">You are editing employee ID
              <span class="text-red-500 font-bold">${employee.EmployeeID}</span>
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
      `,
  });
};

export const deleteEmployee = (id) => {};
