import { editPlane, deletePlane } from "./functions";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

export const Plane = ({ plane, airlines, setPlanes, setAirlines }) => {
    return   (
      <>
            <tr>
            <td className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
                onClick={(e) => editPlane(setPlanes,plane,airlines,setAirlines)}>
                <AiOutlineEdit className="mx-auto" />
            </td>
            {[
                plane?.PlaneID,
                plane?.AirlineID,
                plane?.PlaneModel,
            ].map((item, i) => {
                return (
                    <td key={i} className="border px-3 py-2 text-center">
                        {item || "-"}
                    </td>
                    );
                })}
               <td className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
                onClick={(e) => deletePlane(plane)}
                    >
                <RiDeleteBin6Line className="mx-auto" />
            </td>
          </tr>
        </>
        );
    }
  