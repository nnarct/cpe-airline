import Axios from "axios";
import Swal from "sweetalert2";
import Logo from "../../assets/logo/logo.png";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { isPhoneNumber } from "./../../feature/verification/phone";
import { isName } from "./../../feature/verification/name";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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
          if (res.data.Status === "Create new user successfully! :)")
            Swal.fire({
              icon: "success",
              title: "Register Success",
              text: "We will take you to login page soon",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            }).then((res) => navigate("/login"));
          else
            Swal.fire({
              icon: "error",
              title: "Register Failed",
              text: res.data.Error,
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
        })
        .then((err) => {
          if (err) console.log(err);
        });
    }
  };
  const [see, setSee] = useState(false);
  return (
    <>
      {auth === true ? (
        <Navigate to="/" />
      ) : (
        <div className="w-screen h-screen bg-red-200 flex items-center bg-gradient-to-tr from-indigo-800 via-purple-800 to-fuchsia-600 flex flex-col justify-center">
          <a href="/">
            <img src={Logo} alt="logo" className="cursor-pointer" />
          </a>
          <form
            className="flex flex-col text-left items-center justify-center space-y-2 w-100 bg-slate-50 mt-5 rounded p-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <h1 className="text-3xl font-semibold">Register</h1>
            <label htmlFor="firstName" className="w-full ">
              FirstName
            </label>
            <input
              required
              type="text"
              placeholder="First Name"
              name="firstName"
              className="px-2 w-full block border border-grey-light rounded-full"
              onChange={(e) => {
                setValues({ ...values, firstName: e.target.value });
              }}
            />
            <label htmlFor="lastName" className="w-full">
              LastName
            </label>
            <input
              required
              type="text"
              placeholder="Last Name"
              name="lastName"
              className="px-2 w-full block border border-grey-light rounded-full"
              onChange={(e) => {
                setValues({ ...values, lastName: e.target.value });
              }}
            />
            <label htmlFor="email" className="w-full">
              Email
            </label>
            <input
              required
              type="email"
              placeholder="example@mail.com"
              name="email"
              className="px-2 w-full block border border-grey-light rounded-full"
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
              }}
            />
            <label htmlFor="telNo" className="w-full">
              Tel Phone
            </label>
            <input
              required
              type="tel"
              placeholder="0885557777"
              name="telNO"
              className="px-2 w-full block border border-grey-light rounded-full"
              onChange={(e) => {
                setValues({ ...values, telNo: e.target.value });
              }}
            />
            <label htmlFor="password" className="w-full">
              Password
            </label>
            <span className="w-full relative">
              <input
                required
                type={see ? "text" : "password"}
                placeholder="type your password"
                name="password"
                className="px-2 w-full block border border-grey-light rounded-full"
                onChange={(e) => {
                  setValues({ ...values, password: e.target.value });
                }}
              />
              <span className="absolute right-3 top-[20%] cursor-pointer" onClick={() => setSee(!see)}>
                {see ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </span>
            <button
              className="cursor-pointer active:opacity-70 bg-blue-500 text-white rounded-full px-5 py-1 hover:opacity-40 w-full"
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
        </div>
      )}
    </>
  );
};
