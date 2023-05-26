import Axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Content } from "../components/content";
import { Header } from "../components/header";
import { Table, THead, Th, Edit } from "../components/table";

import { User } from "./oneUser";
import { addUser, getUsers } from "./functions";
export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  return (
    <>
      <Content>
        <Header>
          <span>User List</span>
          <button
            className="text-base shadow focus:ring-2 rounded px-2 bg-blue-600 text-white hover:ring"
            onClick={() => addUser(setUsers)}
          >
            Add User +
          </button>
        </Header>
        <Table className="container">
          <THead>
            <Edit />
            <Th className="w-16">UserID</Th>
            <Th className="w-44">FirstName</Th>
            <Th className="w-44">LastName</Th>
            <Th className="min-w-fit w-72">Email</Th>
            <Th className="w-36">TelNo</Th>
            <Th className="w-20">Delete</Th>
          </THead>
          <tbody>
            {users?.map((user, i) => {
              return (
              <User key={user.UserID} user={user} setUsers={setUsers} />
            );
            })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
