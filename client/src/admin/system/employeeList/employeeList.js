import { useEffect, useState } from "react";
import { AddAdmin } from "../admin-register";
import { Content } from "../components/content";
import { Header } from "../components/header";
import { Edit, THead, Table, Th } from "../components/table";
import { getEmployeeList } from "./editEmployee";
import { Employee } from "./oneEmployee";
export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployeeList(setEmployees);
  }, []);

  const [modal, setAddAdminModal] = useState(false);
  // Todo - edit employee
  // Todo - delete employee

  return (
    <>
      <Content>
        <AddAdmin status={modal} setStatus={setAddAdminModal} />
        <Header>
          <span>Employee List</span>
          <button
            className="text-base shadow focus:ring-2 rounded px-2 bg-blue-600 text-white  hover:ring"
            onClick={() => setAddAdminModal(true)}
          >
            Add Admin +
          </button>
        </Header>

        <Table>
          <THead>
            <Edit />
            <Th>Username</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>TelNo</Th>
            <Th>Position</Th>
            <Th>Airline ID</Th>
            <Th>Delete</Th>
          </THead>
          <tbody>
            {employees?.map((employee, i) => {
              return <Employee {...employee} />;
            })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
