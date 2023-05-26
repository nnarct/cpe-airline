import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "./../../assets/logo/logo.png";
export const AdminNavbar = ({ info, setPage }) => {
  const navigate = useNavigate();
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
          <div className="flex h-full items-center space-x-2">
            <img
              alt="logo"
              src={Logo}
              className="py-2 object-contain h-full cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div
              onClick={() => setPage("My Profile")}
              className="h-full flex items-center cursor-pointer px-4 hover:bg-blue-500/40 transition linear duration-500"
            >
              My Profile
            </div>
            <div
              onClick={() => setPage("Dashboard")}
              className="h-full flex items-center cursor-pointer px-4 hover:bg-blue-500/40 transition linear duration-500"
            >
              Dashboard
            </div>
          </div>
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
