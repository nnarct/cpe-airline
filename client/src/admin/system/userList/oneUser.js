import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { editUser } from "./functions";
export const User = (user) => {
  return (
    <>
      <tr>
        <td
          className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
          onClick={(e) => editUser(user)}
        >
          <AiOutlineEdit className="mx-auto" />
        </td>
        <td className="border px-3 py-2 text-center">{user?.UserID || "-"}</td>
        <td className="border px-3 py-2 text-center">
          {user?.FirstName || "-"}
        </td>
        <td className="border px-3 py-2 text-center">
          {user?.LastName || "-"}
        </td>
        <td className="border px-3 py-2 text-center">{user?.Email || "-"}</td>
        <td className="border px-3 py-2 text-center">{user?.TelNo || "-"}</td>
        <td className="border px-3 py-2 select-none hover:bg-gray-300 cursor-pointer">
          <RiDeleteBin6Line className="mx-auto" />
        </td>
      </tr>
    </>
  );
};
