import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Star } from "../../admin/components/star";
export const Login = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect");
  Axios.defaults.withCredentials = true;
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [auth, setAuth] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:3001").then((res, err) => {
      if (err) setAuth(false); // You are not authenticated
      if (res.data.Status === "Success") {
        setAuth(true);
        if (redirect === "/search") navigate(-1);
        navigate("/");
      } else {
        setAuth(false);
      }
    });
  });
  const verifyValues = () => {
    let errText = "";
    if (values.email === null || values.email === "")
      errText += "\u2022 Please enter your email.\n";
    if (values.password.length < 8)
      errText += "\u2022 Password must be at least 8 characters.\n";
    if (errText.length > 0) {
      alert(errText);
      return false;
    }
    return true;
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (verifyValues() === true) {
      Axios.post("http://localhost:3001/login", values).then((res, err) => {
        if (err) console.log(err);
        if (res.data.Status === "Successfully login") {
          setAuth(true);
          // window.location.reload(false);
          navigate("/");
        } else {
          alert(res.data.Error);
        }
      });
    }
  };
  return (
    <>
      <div className="w-screen h-screen bg-red-200 flex items-center bg-gradient-to-tr from-indigo-800 via-purple-800 to-fuchsia-600">
        <form
          className="w-60 m-auto p-5 flex flex-col items-center justify-center space-y-2 bg-white text-left rounded"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h1 className="text-3xl">Login</h1>
          <label className="w-full">
            Email <Star />
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            className="w-full py-1 px-2 border border-gray rounded text-sm focus:ring ring-blue-200 focus:outline-none focus:border-blue-400"
            onChange={(e) => {
              setValues({ ...values, email: e.target.value });
            }}
          />
          <label className="w-full">
            Password <Star />
          </label>
          <input
            type="password"
            placeholder="*******"
            className="w-full py-1 px-2 border border-gray rounded text-sm focus:ring ring-blue-200 focus:outline-none focus:border-blue-200"
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
            }}
          />
          <button
            className="bg-indigo-500 text-white rounded px-5 py-1 hover:opacity-40 transition duration-300 ease-in-out"
            type="submit"
          >
            Login
          </button>
          <p className="">Don't have account? </p>
          <Link to="/register">
            <p className="text-blue-500 cursor-pointer hover:opacity-50">
              create account
            </p>
          </Link>
        </form>
      </div>
    </>
  );
};
