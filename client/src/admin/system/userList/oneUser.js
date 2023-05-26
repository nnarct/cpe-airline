import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteUser, editUser } from "./functions";
export const User = ({ user, setUsers }) => {
  return (
    <>
      <tr>
        <td
          className="border px-3 py-2 text-center  hover:bg-gray-200 cursor-pointer"
          onClick={(e) => editUser(user, setUsers)}
        >
          <AiOutlineEdit className="mx-auto" />
        </td>
        <td className="border px-3 py-2 text-center ">{user?.UserID || "-"}</td>
        <td className="min-w-24 whitespace-nowrap border px-3 py-2 text-center ">
          {user?.FirstName || "-"}
        </td>
        <td className="min-w-24 whitespace-nowrap border px-3 py-2 text-center ">
          {user?.LastName || "-"}
        </td>
        <td className="border px-3 py-2 text-center ">{user?.Email || "-"}</td>
        <td className="border px-3 py-2 text-center ">{user?.TelNo || "-"}</td>
        <td
          className="border px-3 py-2 select-none hover:bg-gray-300 cursor-pointer"
          onClick={() => deleteUser(user, setUsers)}
        >
          <RiDeleteBin6Line className="mx-auto" />
        </td>
      </tr>
    </>
  );
};
