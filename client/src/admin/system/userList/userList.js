import Axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Content } from "../components/content";
import { Header } from "../components/header";
import { Table, THead, Th, Edit } from "../components/table";

import { User } from "./oneUser";
import { getUsers} from "./functions";
export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers(setUsers);
    console.log(users);
  }, []);

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
      focusCancel: true,
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
            {users?.map((user, i) => {
              return <User key={user.UserID} user={user} />;
            })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
