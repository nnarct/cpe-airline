import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
export const Login = () => {
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
      Axios.post("http://localhost:3001/login", values)
        .then((res) => {
          if (res.data.Status === "Successfully login") {
            setAuth(true);
            // window.location.reload(false);
            navigate("/");
          } else {
            alert(res.data.Error);
          }
        })
        .then((err) => console.log(err));
    }
  };
  return (
    <>
      <form
        className="flex flex-col text-left items-center justify-center space-y-2 w-60 bg-slate-50 m-auto mt-20 rounded p-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1 className="text-3xl">Login</h1>
        <label className="w-full bg-red-300">Email</label>
        <input
          type="email"
          placeholder="nan@example.com"
          className="px-2 w-full"
          onChange={(e) => {
            setValues({ ...values, email: e.target.value });
          }}
        />
        <label className="w-full bg-red-300">Password</label>
        <input
          type="password"
          placeholder="*******"
          className="px-2 w-full"
          onChange={(e) => {
            setValues({ ...values, password: e.target.value });
          }}
        />
        <button
          className="bg-blue-500 text-white rounded px-5 py-1 hover:opacity-40"
          type="submit"
        >
          Login
        </button>
        <p className="">Don't have account? </p>
        <Link to="/register">
          <p className="text-blue-400 cursor-pointer hover:opacity-50">
            create account
          </p>
        </Link>
      </form>
    </>
  );
};
