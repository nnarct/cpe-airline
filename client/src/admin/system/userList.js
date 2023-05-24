import Axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Content } from "./components/content";
import { Header } from "./components/header";
import { Table, THead, Th, Edit } from "./components/table";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
export const UserList = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const res = await fetch("http://localhost:3001/system/userList");
    const data = await res.json();
    setUsers(data.Data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const editUser = (id) => {
    Swal.fire({
      title: "Edit User",
      text: `User ID${id}`,
      html: `
      <div>
        You are editing user ID
        <span class="font-bold">${id}</span>
        <span class="text-blue-500 font-bold">${
          users.find((user) => user.UserID === id).FirstName
        } ${users.find((user) => user.UserID === id).LastName}</span>
      </div>
      <form id="editUserForm">
        <div class="flex items-center justify-center py-1">
          <label for="FirstName" class="w-24 block">FirstName</label>
          <input type="text" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" id="FirstName" value="${
            users.find((user) => user.UserID === id).FirstName
          }">
        </div>
        <div class="flex items-center justify-center py-1">
          <label for="LastName" class="w-24 block">LastName</label>
          <input type="text" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" id="LastName" value="${
            users.find((user) => user.UserID === id).LastName
          }">
        </div>
        <div class="flex items-center justify-center py-1">
          <label for="Email" class="w-24 block">Email</label>
          <input type="email" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" id="Email" value="${
            users.find((user) => user.UserID === id).Email
          }">
        </div>
        <div class="flex items-center justify-center py-1">
          <label for="TelNo" class="w-24 block">TelNo</label>
          <input type="text" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" id="TelNo" value="${
            users.find((user) => user.UserID === id).TelNo
          }">
        </div>
      </form>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      confirmButtonColor: "#3085d6",
      reverseButtons: true,
      preConfirm: () => {
        const FirstName = document.getElementById("FirstName").value;
        const LastName = document.getElementById("LastName").value;
        const Email = document.getElementById("Email").value;
        const TelNo = document.getElementById("TelNo").value;
        // Todo - phone number validation
        // Todo - email validation - must be unique from any others in database
        // Todo - first name and last name validation - must be alphabet only and max 40 characters
        if (
          FirstName === "" ||
          LastName === "" ||
          Email === "" ||
          TelNo === ""
        ) {
          Swal.showValidationMessage(`Please enter all information.`);
        }
        return {
          id: id,
          FirstName: FirstName,
          LastName: LastName,
          Email: Email,
          TelNo: TelNo,
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
                title: "Oops...",
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
            getUsers();
          }
        );
    });
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Delete User",
      text: `User ID${id}`,
      html: `
      <div>
        You are deleting user ID
        <span class="font-bold">${id}</span>
        <span class="text-blue-500 font-bold">${
          users.find((user) => user.UserID === id).FirstName
        } ${users.find((user) => user.UserID === id).LastName}</span>
      </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed)
        Axios.post("http://localhost:3001/system/deleteUser", {
          UserID: id,
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
          getUsers();
        });
    });
  };
  return (
    <>
      <Content>
        <Header>User List</Header>
        <Table className="container">
          <THead>
            <Edit />
            <Th className="w-16">UserID</Th>
            <Th>FirstName</Th>
            <Th>LastName</Th>
            <Th className="min-w-fit w-72">Email</Th>
            <Th className="w-36">TelNo</Th>
            <Th className="w-20">Delete</Th>
          </THead>
          <tbody>
            {users &&
              users.map((user, i) => {
                return (
                  <tr key={`user${i}`}>
                    <td
                      className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => editUser(user.UserID)}
                    >
                      <AiOutlineEdit className="mx-auto" />
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {user.UserID ? user.UserID : "-"}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {user.FirstName ? user.FirstName : "-"}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {user.LastName ? user.LastName : "-"}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {user.Email ? user.Email : "-"}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {user.TelNo ? user.TelNo : "-"}
                    </td>
                    <td className="border px-3 py-2 select-none hover:bg-gray-300 cursor-pointer">
                      <RiDeleteBin6Line className="mx-auto" />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
