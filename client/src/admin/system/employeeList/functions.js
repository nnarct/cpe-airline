import Axios from "axios";
import Swal from "sweetalert2";

export const getEmployeeList = async (setEmployees, setAirlines) => {
  try {
    const res = await fetch("http://localhost:3001/system/employeeList");
    const data = await res.json();
    setEmployees(data.Data);
    setAirlines(data.Airlines);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Something went wrong!",
    });
  }
};

export const editEmployee = (setEmployees, setAirlines, employee, airlines) => {
  Swal.fire({
    title: "Edit Employee",
    html: `<div class="">You are editing employee ID
              <span class="text-red-500 font-bold">${
                employee?.EmployeeID
              }</span>
              <span class="text-blue-500 font-bold pr-2">${
                employee?.FirstName
              } ${employee?.LastName}</span>
            </div>
            <form>
              <div class="flex items-center justify-center">
                <label htmlFor="FirstName" class="w-24 block">FirstName</label>
                <input id="FirstName" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="FirstName" value="${
                  employee?.FirstName
                }">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="LastName" class="w-24 block">LastName</label>
                <input id="LastName" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="LastName" value="${
                  employee?.LastName
                }">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="Email" class="w-24 block">Email</label>
                <input id="Email" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="Email" value="${
                  employee?.Email || ""
                }">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="TelNo" class="w-24 block">TelNo</label>
                <input id="TelNo" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="TelNo" value="${
                  employee?.TelNo || ""
                }">
              </div>
              <div class="flex items-center justify-center">
                <label htmlFor="Position" class="w-24 block">Position</label>
                <input id="Position" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="Position" value="${
                  employee?.Position
                }">
              </div> 
              <div id="airlineInput" class="flex items-center justify-center">
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
            </form>`,
    didOpen: () => {
      const position = document.getElementById("Position");
      const airlineInput = document.getElementById("airlineInput");
      airlineInput.classList.add("hidden");
      if (position.value === "Admin") airlineInput.classList.remove("hidden");
      else airlineInput.classList.add("hidden");
    },
    preConfirm: () => {
      const firstName = document.getElementById("FirstName").value;
      const lastName = document.getElementById("LastName").value;
      const email = document.getElementById("Email").value;
      let TelNo = document.getElementById("TelNo").value;
      const position = document.getElementById("Position").value;
      const airlineID =
        position === "Admin"
          ? document.getElementById("AirlineID").value
          : null;
      if (!firstName) Swal.showValidationMessage("Please enter FirstName");
      else if (!lastName) Swal.showValidationMessage("Please enter LastName");
      else if (!email) Swal.showValidationMessage("Please enter Email");
      else if (!position) Swal.showValidationMessage("Please enter Position");
      else if (position === "Admin" && !airlineID)
        Swal.showValidationMessage("Please enter AirlineID");
      if (TelNo === "") TelNo = null;
      else if (TelNo) {
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
          return Swal.showValidationMessage("Email is invalid");
        if (TelNo && !/^\d{10}$/.test(TelNo))
          return Swal.showValidationMessage("Phone number is invalid");
      }
      const val = {
        // return {
        id: employee?.EmployeeID,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        TelNo,
        Position: position,
        AirlineID: airlineID,
      };
      return val;
    },
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#3b82f6",
    showCancelButton: true,
    focusCancel: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.post(
        "http://localhost:3001/system/editEmployee",
        result.value
      ).then((res, err) => {
        if (err) {
          Swal.fire({
            title: "Error!",
            text: err,
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return;
        }
        if (res.data.Status) {
          Swal.fire({
            title: "Success!",
            text: res.data.Status,
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            getEmployeeList(setEmployees, setAirlines);
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: res.data.Status,
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      });
    }
  });
};

export const deleteEmployee = (setEmployees, setAirlines, employee) => {
  Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    html: `You are deleting employee ${employee.EmployeeID}, <span class="font-semibold text-red-500">${employee.username}</span>
  <div class="py-1 bg-red-100 text-red-700 w-full rounded mt-4">This action cannot be undone !</div>`,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    focusCancel: true,
  }).then((result) => {
    if (result.isConfirmed) {
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
          }).then(() => {
            getEmployeeList(setEmployees, setAirlines);
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

export const addEmployee = (setEmployees, setAirlines, airlines) => {
  Swal.fire({
    title: "Add New Employee",
    html: `<form>
      <div class="flex items-center justify-center">
        <label htmlFor="username" class="w-32 block">username<span class="text-red-500">*</span></label>
        <input id="username" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="username">
      </div>
      <div class="flex items-center justify-center">
        <label htmlFor="FirstName" class="w-32 block">First Name<span class="text-red-500">*</span></label>
        <input id="FirstName" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="first name">
      </div>
      <div class="flex items-center justify-center">
        <label htmlFor="LastName" class="w-32 block">Last Name<span class="text-red-500">*</span></label>
        <input id="LastName" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="last name">
      </div>
      <div class="flex items-center justify-center">
        <label htmlFor="TelNo" class="w-32 block">Phone No.</label>
        <input id="TelNo" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="0887772222">
      </div>
      <div class="flex items-center justify-center">
        <label htmlFor="Email" type="email" class="w-32 block">Email<span class="text-red-500">*</span></label>
        <input id="Email" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="example@mail.com">
      </div>
      <div class="flex items-center justify-center">
        <label htmlFor="Position" class="w-32 block">Position<span class="text-red-500">*</span></label>
        <select id="Position" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-4">
          <option value="System">System admin</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div id="airlineInput" class="flex items-center justify-center">
        <label htmlFor="Airline" class="w-32 block">Airline<span class="text-red-500">*</span></label>
        <select id="Airline" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-4">>
          ${airlines?.map((a, i) => {
            return `<option key=${i} value=${a.AirlineID}>
              ${a.AirlineID}. ${a.Name}
            </option>`;
          })}
        </select>
      </div>
      <div class="flex items-center justify-center">
        <label htmlFor="Password" class="w-32 block">Password<span class="text-red-500">*</span></label>
        <input autocomplete="off" type="password" id="Password" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="username">
      </div>
    </form>`,
    didOpen: () => {
      const position = document.getElementById("Position");
      const airlineInput = document.getElementById("airlineInput");
      airlineInput.classList.add("hidden");
      position.addEventListener("input", (e) => {
        if (e.target.value === "Admin") airlineInput.classList.remove("hidden");
        else airlineInput.classList.add("hidden");
      });
    },
    preConfirm: () => {
      const username = document.getElementById("username").value;
      const FirstName = document.getElementById("FirstName").value;
      const LastName = document.getElementById("LastName").value;
      const TelNo = document.getElementById("TelNo").value;
      const Email = document.getElementById("Email").value;
      const Position = document.getElementById("Position").value;
      const AirlineID =
        Position === "Admin" ? document.getElementById("Airline").value : null;
      const Password = document.getElementById("Password").value;

      if (!username) return Swal.showValidationMessage("Username is required");
      if (!FirstName)
        return Swal.showValidationMessage("First name is required");
      if (!LastName) return Swal.showValidationMessage("Last name is required");
      if (!Email) return Swal.showValidationMessage("Email is required");
      else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(Email))
        return Swal.showValidationMessage("Email is invalid");
      if (TelNo && !/^\d{10}$/.test(TelNo))
        return Swal.showValidationMessage("Phone number is invalid");
      else if (TelNo && TelNo[0] !== "0")
        return Swal.showValidationMessage("Phone number must start with 0");
      if (!Position) return Swal.showValidationMessage("Position is required");
      if (!Password) return Swal.showValidationMessage("Password is required");

      const val = {
        username,
        firstName: FirstName,
        lastName: LastName,
        TelNo,
        email: Email,
        position: Position,
        airlineID: AirlineID,
        password: Password,
      };
      return val;
    },
    showCancelButton: true,
    confirmButtonText: "Add",
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.post("http://localhost:3001/admin/register", result.value).then(
        (res, err) => {
          if (err) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: err,
              timer: 5000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            return;
          }
          if (res.data.Error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: res.data.Error,
              timer: 5000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            return;
          }
          if (res.data.Status) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: res.data.Status,
              timer: 5000,
              timerProgressBar: true,
              confirmButtonText: "Close",
              confirmButtonColor: "#3085d6",
            }).then(() => getEmployeeList(setEmployees, setAirlines));
            return;
          }
        }
      );
    }
  });
};
