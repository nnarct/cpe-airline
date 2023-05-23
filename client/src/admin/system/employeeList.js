import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { AddAdmin } from "./admin-register";
import { Content } from "./components/content";
import { Header } from "./components/header";
import { Table } from "./components/table";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const getEmployeeList = async () => {
    try {
      const res = await fetch("http://localhost:3001/system/employeeList");
      const data = await res.json();
      setEmployees(data.Data);
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  const [modal, setAddAdminModal] = useState(false);
  // Todo - edit employee
  // Todo - delete employee
  const editEmployee = (id) => {
    const employee = employees?.find((e) => e.EmployeeID === id);
    Swal.fire({
      title: "Edit Employee",
      html: `<div class="">You are editing employee ID
                <span class="text-red-500 font-bold">${id}</span>
                <span class="text-blue-500 font-bold pr-2">${
                  employees?.find((e) => e.EmployeeID === id)?.FirstName
                } ${
        employees?.find((e) => e.EmployeeID === id)?.LastName
      }</span>
              </div>
              <form>
                <div class="flex items-center justify-center">
                  <label htmlFor="FirstName" class="w-24 block">FirstName</label>
                  <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="FirstName" value="${
                    employee?.FirstName
                  }">
                </div>
                <div class="flex items-center justify-center">
                  <label htmlFor="FirLastNamestName" class="w-24 block">LastName</label>
                  <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="LastName" value="${
                    employee?.LastName
                  }">
                </div>
        `,
    });
  };

  const deleteEmployee = (id) => {};
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
                "Delete",
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
            {employees?.map((employee, i) => {
              return (
                <tr key={i}>
                  <td
                    className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
                    onClick={(e) => editEmployee(employee.EmployeeID)}
                  >
                    <AiOutlineEdit className="mx-auto"/>
                  </td>
                  {[
                    employee?.username,
                    employee?.FirstName,
                    employee?.LastName,
                    employee?.Email,
                    employee?.TelNo,
                    employee?.Position,
                    employee?.AirlineID,
                  ].map((item, i) => {
                    return (
                      <td key={i} className="border px-3 py-2 text-center">
                        {item || "-"}
                      </td>
                    );
                  })}
                  <td
                    className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
                    onClick={(e) => deleteEmployee(employee?.EmployeeID)}
                  >
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
