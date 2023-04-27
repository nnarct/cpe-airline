import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export const LoginAdmin = () => {
  const navigate = useNavigate();
  const [adminAuth, setAdminAuth] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = () => {
    Axios.post("http://localhost:3001/admin/login", values)
      .then((res) => {
        if (res.data.Status === "Successfully login admin") {
          setAdminAuth(true);
          if (res.data.Position === "Admin") navigate("/admin");
          if (res.data.Position === "System") navigate("/system");
          else navigate("/error");
        } else {
          alert(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/emauth").then((res, err) => {
      if (err) console.log(err); // You are not authenticated
      if (res.data.Status === "Success") {
        setAdminAuth(true);
        if (res.data.Info.Position === "Admin") navigate("/admin");
        if (res.data.Info.Position === "System") navigate("/system");
      } else {
        setAdminAuth(false);
      }
    });
  });
  return (
    <>
      <div className="w-screen h-screen bg-slate-300 flex flex-col items-center justify-center space-y-5">
        <h1 className="text-4xl font-bold">Admin Login</h1>
        <h1 className="text-2xl font-semibold">
          auth: {adminAuth ? "true" : "false"}
        </h1>

        <form
          className="bg-white rounded w-56 p-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label htmlFor="email">Username</label>
          <input
            name="username"
            type="text"
            className="px-1 w-full"
            placeholder="username"
            onChange={(e) => {
              setValues({ ...values, username: e.target.value });
            }}
          />
          <label htmlFor="password">password</label>
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
            Login
          </button>
        </form>
      </div>
    </>
  );
};
