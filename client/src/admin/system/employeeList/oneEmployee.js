import { editEmployee, deleteEmployee } from "./functions";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
export const Employee = ({ setEmployees, setAirlines, employee, airlines }) => {
  return (
    <>
      <tr>
        <td
          className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
          onClick={(e) =>
            editEmployee(setEmployees, setAirlines, employee, airlines)
          }
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
              <span className="line-clamp-1">{item || "-"}</span>
            </td>
          );
        })}
        <td
          className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
          onClick={(e) => deleteEmployee(setEmployees, setAirlines, employee)}
        >
          <RiDeleteBin6Line className="mx-auto" />
        </td>
      </tr>
    </>
  );
};
