import Axios from "axios";
import Swal from "sweetalert2";

export const getUsers = async (setUsers) => {
  const res = await fetch("http://localhost:3001/system/userList");
  const data = await res.json();
  setUsers(data.Data);
};
export const editUser = (user, setUsers) => {
  Swal.fire({
    title: "Edit User",
    html: `
    <div>
      You are editing user ID
      <span class="font-bold">${user.UserID}</span>
      <span class="text-blue-500 font-bold">${user.LastName}</span>
    </div>
    <form id="editUserForm">
      <div class="flex items-center justify-center py-1">
        <label for="FirstName" class="w-24 block">FirstName</label>
        <input type="text" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" id="FirstName" value="${user.FirstName}">
      </div>
      <div class="flex items-center justify-center py-1">
        <label for="LastName" class="w-24 block">LastName</label>
        <input type="text" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" id="LastName" value="${user.LastName}">
      </div>
      <div class="flex items-center justify-center py-1">
        <label for="Email" class="w-24 block">Email</label>
        <input type="email" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" id="Email" value="${user.Email}">
      </div>
      <div class="flex items-center justify-center py-1">
        <label for="TelNo" class="w-24 block">TelNo</label>
        <input type="text" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" id="TelNo" value="${user.TelNo}">
      </div>
    </form>
    `,
    showCancelButton: true,
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    focusCancel: true,
    confirmButtonColor: "#3085d6",

    preConfirm: () => {
      const FirstName = document.getElementById("FirstName").value;
      const LastName = document.getElementById("LastName").value;
      const Email = document.getElementById("Email").value;
      const TelNo = document.getElementById("TelNo").value;
      if (FirstName === "" || LastName === "" || Email === "" || TelNo === "")
        Swal.showValidationMessage(`Please enter all information.`);
      if (!/^[a-zA-Z\s]+$/.test(FirstName) || !/^[a-zA-Z\s]+$/.test(LastName))
        Swal.showValidationMessage(
          `First name and last name must be alphabet only.`
        );
      if (FirstName.length > 40 || LastName.length > 40)
        Swal.showValidationMessage(
          `First name and last name must be less than 40 characters.`
        );
      if (TelNo.length !== 10)
        Swal.showValidationMessage(`Phone number must be 10 numbers.`);
      if (TelNo[0] !== "0")
        Swal.showValidationMessage(`Phone number must start with 0.`);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email))
        Swal.showValidationMessage(`Please enter a valid email.`);
      return {
        id: user.UserID,
        FirstName,
        LastName,
        Email,
        TelNo,
      };
    },
  }).then((result) => {
    if (result.isConfirmed)
      Axios.post("http://localhost:3001/system/editUser", result.value).then(
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
          else if (res.data.Status === "Edit user successfully! :)")
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
              title: "Sorry",
              text: res.data.Error,
              timer: 3000,
              timerProgressBar: true,
            });
          else
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              timer: 3000,
              timerProgressBar: true,
            });
          getUsers(setUsers);
        }
      );
  });
};

export const deleteUser = (user, setUsers) => {
  Swal.fire({
    title: "Delete User",
    text: `User ID${user.UserID}`,
    html: `
    <div>
      You are deleting user ID
      <span class="font-bold">${user.UserID}</span>
      <span class="text-blue-500 font-bold">${user.FirstName} ${user.LastName}</span>
      <div class="py-1 bg-red-100 text-red-700 w-full rounded mt-4">This action cannot be undone !</div>
    </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    focusCancel: true,
    confirmButtonColor: "#d33",
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed)
      Axios.post("http://localhost:3001/system/deleteUser", {
        id: user.UserID,
      }).then((res, err) => {
        if (err)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        else if (res.data.Status === "Delete user successfully! :)")
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
        getUsers(setUsers);
      });
  });
};
