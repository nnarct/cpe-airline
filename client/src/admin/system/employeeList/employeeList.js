import { useEffect, useState } from "react";
import { Content } from "../components/content";
import { Header } from "../components/header";
import { Edit, THead, Table, Th } from "../components/table";
import { getEmployeeList, addEmployee } from "./functions";
import { Employee } from "./oneEmployee";
export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [airlines, setAirlines] = useState([]);
  useEffect(() => {
    getEmployeeList(setEmployees,setAirlines);
  }, []);

  // Todo - edit employee
  // Todo - delete employee
  return (
    <>
      <Content>
        {/* <AddAdmin status={modal} setStatus={setAddAdminModal} /> */}
        <Header>
          <span>Employee List</span>
          <button
            className="text-base shadow focus:ring-2 rounded px-2 bg-blue-600 text-white  hover:ring"
            onClick={() => addEmployee(setEmployees,setAirlines,airlines)}
          >
            Add Employee +
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
            <Th className="w-20">Delete</Th>
          </THead>
          <tbody>
            {employees?.map((employee, i) => {
              return <Employee setEmployees={setEmployees} setAirlines={setAirlines} employee={employee} key={i} airlines={airlines}/>;
            })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
