import { useEffect, useState } from "react";
import { Content } from "./components/content";
import { Header } from "./components/header";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("http://localhost:3001/system/userList");
      const data = await res.json();
      setUsers(data.Data);
    };
    getUsers();
  });
  const editUser = (e) => {};
  return (
    <>
      <Content>
        <Header>User List</Header>
        <table className="container">
          <thead>
            <tr>
              <th className="p-2 border border-1 border-black">Edit</th>
              <th className="p-2 border border-1 border-black w-14">UserID</th>
              <th className="p-2 border border-1 border-black">FirstName</th>
              <th className="p-2 border border-1 border-black">LastName</th>
              <th className="p-2 border border-1 border-black">Email</th>
              <th className="p-2 border border-1 border-black">TelNo</th>
              <th className="p-2 border border-1 border-black">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, i) => {
                return (
                  <>
                    <tr key={i}>
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
                  </>
                );
              })}
          </tbody>
        </table>
      </Content>
    </>
  );
};
