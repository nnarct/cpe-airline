import { useEffect, useState } from "react";
import { Content } from "./components/content";
import { Header } from "./components/header";
import { Table } from "./components/table";
import { Table,Th } from "./components/table";
import {Table, THead, Th, Edit} from "./components/table";
import {AiOutlineEdit} from "react-icons/ai";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("http://localhost:3001/system/userList");
      const data = await res.json();
      setUsers(data.Data);
    };
    getUsers();
  }, []);
  const editUser = (e) => {};
  return (
    <>
      <Content>
        <Header>User List</Header>
        <Table className="container">
          <THead>
              <Edit/>
              <Th className="w-14">UserID</Th>
              <Th>FirstName</Th>
              <Th>LastName</Th>
              <Th>Email</Th>
              <Th>TelNo</Th>
              <Th>Delete</Th>
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
                      e
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
                    <td className="border px-3 py-2 text-center font-bold select-none hover:bg-red-500 cursor-pointer hover:ring ring-red-200 active:bg-red-500/50">
                      X
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
