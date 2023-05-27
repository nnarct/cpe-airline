import Axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Star } from "../components/star";
export const LoginAdmin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [seePass, setSeePass] = useState("password");
  const handleSubmit = () => {
    Axios.post("http://localhost:3001/admin/login", values).then((res, err) => {
      if (err) console.log(err);
      if (res.data?.Status === "Successfully login admin") {
        if (res.data.Position === "Admin") navigate("/admin");
        if (res.data.Position === "System") navigate("/system");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.Error,
        }).then((result) => {
          navigate("/admin/login");
        });
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/emauth").then((res, err) => {
      if (err) console.log(err); // You are not authenticated
      if (res.data.Status === "Success") {
        if (res.data.Info.Position === "Admin") navigate("/admin");
        if (res.data.Info.Position === "System") navigate("/system");
      }
    });
  });
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center space-y-5 bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        <form
          className="bg-white rounded w-72 p-6 flex flex-col shadow-xl"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h1 className="text-4xl font-semibold text-center mb-5">
            Admin Login
          </h1>
          <label htmlFor="email">
            Username <Star />
          </label>
          <input
            required
            name="username"
            type="text"
            className="w-full border border-gray-200 rounded mb-4 p-1 focus:ring outline-none"
            placeholder="Username"
            onChange={(e) => {
              setValues({ ...values, username: e.target.value });
            }}
          />
          <label htmlFor="password">
            Password <Star />
          </label>
          <div className="relative">
            <input
              required
              name="password"
              type={seePass}
              className="w-full border border-gray-200 rounded mb-4 p-1 focus:ring outline-none"
              placeholder="********"
              onChange={(e) => {
                setValues({ ...values, password: e.target.value });
              }}
            />
            {seePass === "password" ? (
              <AiOutlineEyeInvisible
                className="absolute right-3 top-2 text-gray-400 cursor-pointer"
                onClick={() => setSeePass("text")}
              />
            ) : (
              <AiOutlineEye
                className="absolute right-3 top-2 text-gray-400 cursor-pointer"
                onClick={() => setSeePass("password")}
              />
            )}
          </div>

          <button
            className="w-full bg-blue-500 text-white rounded py-1 hover:bg-blue-700 active:opacity-80 transition linear"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};
