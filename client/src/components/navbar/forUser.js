import Axios from "axios";
import { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { BsPersonCircle, BsPersonFillGear } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

export const ForUser = () => {
  const [info, setInfo] = useState({ UserID: "", firstName: "", lastName: "" });
  useEffect(() => {
    Axios.get("http://localhost:3001/userName").then((res, err) => {
      if (err) console.log(err); // You are not authenticated
      if (res.data.Status === "Success") {
        setInfo({
          UserID: res.data.Data[0],
          firstName: res.data.Data[1],
          lastName: res.data.Data[2],
        });
      } else {
        console.log(res);
      }
    });
  }, []);

  const handleLogout = () => {
    Axios.get("http://localhost:3001/logout")
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  const ref = useDetectClickOutside({ onTriggered: closeDropdown });

  return (
    <>
      <div ref={ref} className="relative font-semibold">
        <div
          className={`m-1 w-10 h-10 flex items-center justify-center hover:bg-black/20 transition duration-200 cursor-pointer rounded-full ${
            isOpen ? "bg-black/20" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <BsPersonCircle color="fff" size={28} />
        </div>
        {isOpen ? (
          <div className="absolute top-14 right-0 bg-white border border-primary rounded">
            <h2 className="p-4 text-center whitespace-nowrap">
              {info.firstName} {info.lastName[0]}.
            </h2>
            <hr />
            <Link to={`/myProfile/${info.UserID}`}>
              <div className="w-full flex items-center px-4 hover:bg-primary/10 transition duration-200">
                <span className="pr-3">
                  <BsPersonFillGear size={18} />
                </span>
                <span className="py-2 whitespace-nowrap">My Profile</span>
              </div>
            </Link>
            <button
              className="w-full flex items-center px-4 hover:bg-primary/10 transition duration-200"
              onClick={() => handleLogout()}
            >
              <span className="pr-3">
                <FiLogOut />
              </span>
              <span className="py-2 whitespace-nowrap">Log out</span>
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};
