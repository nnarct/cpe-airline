import { AiOutlineEdit } from "react-icons/ai";
import { editAirport,deleteAirport } from "./functions";
import { RiDeleteBin6Line } from "react-icons/ri";
export const Airport = ({setAirports,airport}) => {
  return ( <tr >
  <td
    className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
    onClick={(e) => editAirport(setAirports,airport)}
  >
    <AiOutlineEdit className="mx-auto" />
  </td>
  <td className="border p-2 text-center">
    {airport.AirportID ? airport.AirportID : "-"}
  </td>
  <td className="border p-2">
    {airport.Name ? airport.Name : "-"}
  </td>

  <td className="border p-2 text-center">
    {airport.IATA ? airport.IATA : "-"}
  </td>
  <td className="border p-2">
    {airport.State ? airport.State : "-"}
  </td>
  <td className="border p-2">
    {airport.Province ? airport.Province : "-"}
  </td>
  <td className="border p-2">
    {airport.section ? airport.section : "-"}
  </td>
  <td
    className="border p-2 text-center font-bold select-none cursor-pointer hover:bg-gray-200"
    onClick={() => {
        deleteAirport(airport);
    }}
  >
    <RiDeleteBin6Line className="mx-auto" />
  </td>
</tr>)
}
