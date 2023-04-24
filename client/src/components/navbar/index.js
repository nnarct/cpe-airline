import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";



const ForNoob = () => {
  return (
    <div className="h-12 flex items-center justify-center space-x-3 bg-cyan-950">
      <Link to="/login">
        <span className="p-2 rounded bg-white">Login</span>
      </Link>
      <Link to="/register">
        <span className="p-2 rounded bg-white">Register</span>
      </Link>
    </div>
  );
};

const ForUser = () => {
  const handleDelete = () => {
    Axios.get("http://localhost:3001/logout")
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      className="p-2 rounded bg-blue-300 hover:opacity-40 active:opacity-70 w-32 text-center mx-4"
      onClick={() => handleDelete()}
    >
      Log out
    </div>
  );
};
export const Navbar = () => {
  const [auth,setAuth] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:3001").then((res, err) => {
      if (err) setAuth(false); // You are not authenticated
      if (res.data.Status === "Success") {
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  });
  return <div>{auth ? <ForUser /> : <ForNoob />}</div>;
};
