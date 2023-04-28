import { useEffect, useState } from "react";
import { AddAdmin } from "./admin-register";
import { Employee } from "./components/employee";
import { Content } from "./components/content";
import { Header } from "./components/header";
import { Table } from "./components/table";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const getEmployeeList = async () => {
      const res = await fetch("http://localhost:3001/system/employeeList");
      const data = await res.json();
      setEmployees(data.Data);
    };

    getEmployeeList();
  }, []);

  const [editThisRow, setEditThisRow] = useState(0);

  const [modal, setAddAdminModal] = useState(false);
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
          <thead>
            <tr>
              <th className="border border-black px-3 py-2 min-w-[60px] max-w-[60px] w-[60px]">
                Edit
              </th>
              {[
                "Username",
                "First Name",
                "Last Name",
                "Email",
                "TelNo",
                "Position",
                "Airline ID",
              ].map((e, i) => {
                return (
                  <th
                    className="border border-black px-3 py-2 w-1/6 whitespace-nowrap"
                    key={e}
                  >
                    {e}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((employee, i) => {
                return (
                  <Employee
                    key={i}
                    employee={employee}
                    editThisRow={editThisRow}
                    setEditThisRow={setEditThisRow}
                  />
                );
              })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
