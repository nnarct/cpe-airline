import { editEmployee, deleteEmployee } from "./functions";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
export const Employee = ({ employee }) => {
  return (
    <>
      <tr>
        <td
          className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
          onClick={(e) => editEmployee(employee)}
        >
          <AiOutlineEdit className="mx-auto" />
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
    </>
  );
};
