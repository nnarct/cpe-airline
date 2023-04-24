import { useEffect, useState } from "react";
import { AddAdmin } from "./admin-register";
import { Employee } from "./components/employee";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const getEmployeeList = async () => {
      const res = await fetch("http://localhost:3001/admin/employeeList");
      const data = await res.json();
      setEmployees(data.Data);
    };

    getEmployeeList();
  }, []);

  const [editThisRow, setEditThisRow] = useState(0);

  const [modal, setAddAdminModal] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center px-2 ">
        <AddAdmin status={modal} setStatus={setAddAdminModal} />
        <div className="font-bold py-4   w-full flex justify-center">
          <div className="container flex justify-between">
            <h1 className="text-3xl ">Employee List</h1>
            <button
              className="shadow focus:ring-2 rounded px-2 bg-white hover:bg-gray-300 "
              onClick={() => setAddAdminModal(true)}
            >
              Add Admin
            </button>
          </div>
        </div>
        <table className="table-auto border-collapse container bg-white px-2 mb-4">
          <thead>
            <tr>
              <th className="border px-3 py-2 min-w-[60px] max-w-[60px] w-[60px]">
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
                    className="border px-3 py-2 w-1/6 whitespace-nowrap"
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
        </table>
      </div>
    </>
  );
};
