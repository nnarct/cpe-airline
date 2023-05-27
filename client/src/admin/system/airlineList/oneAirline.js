import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { editAirline, deleteAirline } from "./functions";
export const Airline = ({ airline, setAirlines }) => {
  return (
    <>
      <tr>
        <td
          className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
          onClick={(e) => editAirline(airline, setAirlines)}
        >
          <AiOutlineEdit className="mx-auto" />
        </td>
        <td className="border px-3 py-2 text-center">
          {airline.AirlineID ? airline.AirlineID : "-"}
        </td>
        <td className="whitespace-nowrap border px-3 py-2">
          {airline.Name ? airline.Name : "-"}
        </td>

        <td className="border px-3 py-2">
          {airline.Link ? (
            <a
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:bg-gray-100 p-1 rounded underline"
              href={airline.Link}
            >
              {airline.Link}
            </a>
          ) : (
            "-"
          )}
        </td>
        <td
          className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
          onClick={(e) => deleteAirline(airline, setAirlines)}
        >
          <RiDeleteBin6Line className="mx-auto" />
        </td>
      </tr>
    </>
  );
};
