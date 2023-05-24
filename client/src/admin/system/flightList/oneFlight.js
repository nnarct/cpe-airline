import moment from "moment";
import { editFlight, deleteFlight } from "./functions";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
export const Flight = ({ flight , airlines, airports, planes,  }) => {
  return (
    <>
      <tr>
        <td
          className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
          onClick={() => editFlight({ flight, airlines, airports, planes })}
        >
          <AiOutlineEdit className="mx-auto" />
        </td>
        {[
          flight.FlightID,
          flight.FlightNumber,
          flight.oriIATA,
          flight.desIATA,
          moment(flight.DepartureTime).format("HH:MM - DD MMM YY"),
          moment(flight.ArrivalTime).format("HH:MM - DD MMM YY"),
          flight.airline,
          flight.PlaneID,
        ].map((item, i) => {
          return (
            <td key={i} className="p-2 border border-1 text-center">
              {item || "-"}
            </td>
          );
        })}

        <td
          className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
          onClick={(e) => deleteFlight(flight?.FlightID)}
        >
          <RiDeleteBin6Line className="mx-auto" />
        </td>
      </tr>
    </>
  );
};
