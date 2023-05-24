import moment from "moment";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { editPassenger, deletePassenger } from "./functions";
export const Passenger = ({passenger}) => {
  return (
    <tr>
      <td
        className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
        onClick={(e) => editPassenger(passenger)}
      >
        <AiOutlineEdit className="mx-auto" />
      </td>
      {[
        passenger?.PassengerID,
        passenger?.FirstName,
        passenger?.LastName,
        moment(passenger?.DOB).format("DD MMM YYYY"),
        passenger?.Gender,
        passenger?.Nationality,
        passenger?.BookingID,
      ].map((item, i) => {
        return (
          <td key={i} className="border px-3 py-2 text-center">
            {item}
          </td>
        );
      })}
      <td
        className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
        onClick={(e) => deletePassenger(passenger.PassengerID)}
      >
        <RiDeleteBin6Line className="mx-auto" />
      </td>
    </tr>
  );
};
