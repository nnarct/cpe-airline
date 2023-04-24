import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminNavbar = ({info}) => {
  // const [adminAuth, setAdminAuth] = useState(false);
  // const [info, setInfo] = useState(null);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/admin").then((res, err) => {
  //     if (err) console.log(err); // You are not authenticated
  //     if (res.data.Status === "Success") {
  //       setAdminAuth(true);
  //       setInfo(res.data.Info);
  //     } else {
  //       setAdminAuth(false);
  //       navigate("/admin/login");
  //     }
  //   });
  // });

  const handleDelete = () => {
    Axios.get("http://localhost:3001/admin/logout")
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex h-12 bg-cyan-950 text-white flex justify-center">
        <div className="container border-white flex justify-between items-center">
          <p>Logo</p>
          <div className="flex items-center space-x-2 text-base">
            <p>O</p>
            <span className="hover: bg-cyan-800 cursor-pointer rounded px-2 py-1">
              {info ? info.username : "username"}
            </span>
            <span className="hover: bg-cyan-800 cursor-pointer rounded px-2 py-1"></span>
            <button className="mx-2 " onClick={() => handleDelete()}>
              logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
