import Axios from "axios";
import { useEffect, useState } from "react";
import { ForNoob } from "./forNoob";
import { ForUser } from "./forUser";
import { Menu } from "./menu";
import logo from "./../../assets/logo/logo.png";

export const Navbar = () => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:3001").then((res, err) => {
      if (err) setAuth(false); // You are not authenticated
      if (res.data.Status === "Success") setAuth(true);
      else setAuth(false);
    });
  });
  return (
    <>
      <div className="z-30 fixed top-0 left-0 w-full flex justify-center bg-gradient-to-r from-cyan-500 to-primary shadow">
        <div className="w-full container flex justify-between px-3">
          <div className="">
            <ul className="flex items-center">
              <Menu to="/">
                <img src={logo} className="h-8" alt={"CPE Flying"} />
              </Menu>
              <Menu>Menu 1</Menu>
              <Menu>Menu 2</Menu>
              <Menu>Menu 3</Menu>
            </ul>
          </div>
          <div className="flex items-center">
            {auth ? <ForUser /> : <ForNoob />}
          </div>
        </div>
      </div>
      <div className="h-12 opacity-0 "></div>
    </>
  );
};
