import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Axios from "axios";

import { isPhoneNumber } from "./../../feature/verification/phone";
import { isName } from "./../../feature/verification/name";
export const Register = ({ auth }) => { 
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    telNo: "",
    email: "",
    password: "",
  });

  const verifyValues = () => {
    let errText = "";
    if (!isName(values.firstName))
      errText += "\u2022Please check your first name.\n";
    if (!isName(values.lastName))
      errText += "\u2022Please check your last name.\n";
    if (values.email === null || values.email === "")
      errText += "\u2022 Please enter your email.\n";
    if (values.telNo[0] !== "0")
      errText += "\u2022 Phone number must start with 0.\n";
    else if (values.telNo.length !== 10)
      errText += "\u2022 Phone number must be just 10 numbers.\n";
    else if (!isPhoneNumber(values.telNo))
      errText += "\u2022 Wrong phone number format.";
    if (values.password.length < 8)
      errText += "\u2022 Password must be at least 8 characters.\n";
    if (errText.length > 0) {
      alert(errText);
      return false;
    }
    return true;
  };

 
  const handleSubmit = (e) => {
    if (verifyValues() === true) {
      Axios.post("http://localhost:3001/register", values)
        .then((res) => {
          if (res.data.Status === "Create new user successfully! :)") {
            navigate("/login");
          } else {
            alert(res.data.Error);
          }
        })
        .then((err) => {
          if (err) console.log(err);
        });
    }
  };

  return (
    <>
      {auth===true ? (
        <Navigate to="/" />
      ) : (
        <form
          className="flex flex-col text-left items-center justify-center space-y-2 w-60 bg-slate-50 m-auto mt-20 rounded p-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h1 className="text-3xl">Register</h1>
          <label htmlFor="firstName" className="w-full bg-red-300">
            First Name
          </label>
          <input
            required
            type="text"
            placeholder="suay"
            name="firstName"
            className="px-2 w-full"
            onChange={(e) => {
              setValues({ ...values, firstName: e.target.value });
            }}
          />
          <label htmlFor="lastName" className="w-full bg-red-300">
            Last Name
          </label>
          <input
            required
            type="text"
            placeholder="mak"
            name="lastName"
            className="px-2 w-full"
            onChange={(e) => {
              setValues({ ...values, lastName: e.target.value });
            }}
          />
          <label htmlFor="email" className="w-full bg-red-300">
            Email
          </label>
          <input
            required
            type="email"
            placeholder="nan@example.com"
            name="email"
            className="px-2 w-full"
            onChange={(e) => {
              setValues({ ...values, email: e.target.value });
            }}
          />
          <label htmlFor="telNo" className="w-full bg-red-300">
            Tel Phone
          </label>
          <input
            required
            type="tel"
            placeholder="0885557777"
            name="telNO"
            className="px-2 w-full"
            onChange={(e) => {
              setValues({ ...values, telNo: e.target.value });
            }}
          />
          <label htmlFor="password" className="w-full bg-red-300">
            Password
          </label>
          <input
            required
            type="password"
            placeholder="*******"
            name="password"
            className="px-2 w-full"
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
            }}
          />
          <button
            className="cursor-pointer active:opacity-70 bg-blue-500 text-white rounded px-5 py-1 hover:opacity-40"
            type="submit"
          >
            Register
          </button>
          <p className=""> Already ave account? </p>
          <Link to="/login">
            <p className="text-blue-400 cursor-pointer hover:opacity-50">
              Login
            </p>
          </Link>
        </form>
      )}
    </>
  );
};
