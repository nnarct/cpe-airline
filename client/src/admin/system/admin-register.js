import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { BsXLg } from "react-icons/bs";
import { AiFillFileAdd } from "react-icons/ai";

export const AddAdmin = ({ status, setStatus }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: null,
    TelNo: null,
    position: null,
    password: "",
  });
  const handleSubmit = (e) => {
    Axios.post("http://localhost:3001/admin/register", values)
      .then((res) => {
        if (res.data.Status === "Create new admin successfully! :)") {
          alert(res.data.Status);
          setStatus(false);
          window.location.reload(false);
        } else {
          alert(res.data.Error);
        }
      })
      .then((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <>
      {status ? (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black/70 backdrop-blur flex flex-col items-center justify-center space-y-5 ">
          <h1 className="text-4xl font-bold text-white flex items-center space-x-3">
            <span className="pb-2"> Create New Admin </span>
            <span
              className="rounded-full p-1 hover:bg-black/50 cursor-pointer"
              onClick={() => setStatus(false)}
            >
              <BsXLg />
            </span>
          </h1>

          <form
            className="bg-white rounded w-[400px] p-4 space-y-3 "
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <label htmlFor="email">First Name</label>
            <input
              name="firstName"
              type="text"
              className="px-1 w-full"
              placeholder="nannapat"
              onChange={(e) => {
                setValues({ ...values, firstName: e.target.value });
              }}
            />
            <label htmlFor="email">Last Name</label>
            <input
              name="lastName"
              type="text"
              className="px-1 w-full"
              placeholder="intharasing"
              onChange={(e) => {
                setValues({ ...values, lastName: e.target.value });
              }}
            />
            <label htmlFor="email">username</label>
            <input
              name="username"
              type="text"
              className="px-1 w-full"
              placeholder="username"
              onChange={(e) => {
                setValues({ ...values, username: e.target.value });
              }}
            />
            <label htmlFor="email">Email</label>
            <input
              name="Email"
              type="email"
              className="px-1 w-full"
              placeholder="Email"
              onChange={(e) => {
                setValues({ ...values, Email: e.target.value });
              }}
            />
            <label htmlFor="email">TelNo</label>
            <input
              name="TelNo"
              type="tel"
              className="px-1 w-full"
              placeholder="0888888888"
              onChange={(e) => {
                setValues({ ...values, TelNo: e.target.value });
              }}
            />
            <label htmlFor="password">Position</label>
            <input
              name="position"
              type="text"
              className="px-1 w-full"
              placeholder="position"
              onChange={(e) => {
                setValues({ ...values, position: e.target.value });
              }}
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              className="px-1 w-full"
              placeholder="********"
              onChange={(e) => {
                setValues({ ...values, password: e.target.value });
              }}
            />
            <button
              className="w-full bg-blue-500 text-white rounded py-1 hover:opacity-40 active:opacity-80"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
