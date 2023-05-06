import Axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, ErrorMessage } from "./myProfileComps";
export const ChangePassword = () => {
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const change = useRef(null);
  const [isMatch, setIsMatch] = useState(true);
  const [isLong, setIsLong] = useState(true);
  const [correct, setCorrect] = useState(true);
  useEffect(() => {
    setIsMatch(true);
    setIsLong(true);
  }, [edit]);
  const handleSubmit = () => {
    setIsMatch(true);
    setIsLong(true);
    setCorrect(true);
    const form = change.current;
    const values = {
      id: id,
      oldPass: form["OldPass"].value,
      newPass: form["NewPass"].value,
      newPass2: form["NewPass2"].value,
    };
    if (
      values.oldPass === "" ||
      values.newPass === "" ||
      values.newPass2 === ""
    ) {
      alert("Please fill in all fields.");
      return null;
    }
    if (values.newPass !== values.newPass2) {
      setIsMatch(false);
      if (values.newPass.length < 8) {
        setIsLong(false);
        return null;
      }
      return null;
    }
    if (values.newPass.length < 8) {
      setIsLong(false);
      return null;
    }
    Axios.post("http://localhost:3001/user/changePassword", values).then(
      (res, err) => {
        if (err) console.log(err);
        else if (res.data.Status === "Change password successfully! :)") {
          alert(res.data.Status);
        } else if (res.data.Error === "Current password is not correct.") {
          setCorrect(false);
        } else {
          alert(res.data.Error);
        }
      }
    );
  };
  return (
    <>
      <Card>
        {!edit ? (
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">Change Password</h4>
              <span className="text-gray-300">●●●●●●●●●●</span>
            </div>
            <div
              className="cursor-pointer px-3 py-1 text-xl font-bold text-blue-500 rounded hover:bg-blue-50 transition duration-100 linear"
              onClick={() => setEdit(true)}
            >
              Edit
            </div>
          </div>
        ) : (
          <>
            <h4 className="text-lg font-semibold">Change Password</h4>
            <form ref={change}>
              <ul>
                <li className="flex items-center">
                  <p className="w-44 min-w-[10.25rem] pr-1 whitespace-nowrap">
                    Current Password
                  </p>
                  <input
                    name="OldPass"
                    required
                    type="password"
                    className="rounded text-sm border w-full hover:ring outline-none p-1 my-1 ml-2 focus:ring ring-blue-200/40"
                  />
                </li>
                <li className="flex items-center">
                  <p className="w-44 min-w-[10.25rem] pr-1 whitespace-nowrap">
                    New Password
                  </p>
                  <input
                    name="NewPass"
                    required
                    type="password"
                    className="rounded text-sm border w-full hover:ring outline-none p-1 my-1 ml-2 focus:ring ring-blue-200/40"
                  />
                </li>
                <li className="flex items-center">
                  <p className="min-w-[10.25rem] pr-1 whitespace-nowrap">
                    Confirm New Password
                  </p>
                  <input
                    name="NewPass2"
                    required
                    type="password"
                    className="rounded text-sm border w-full hover:ring outline-none p-1 my-1 ml-2 focus:ring ring-blue-200/40"
                  />
                </li>
                {correct && (
                  <ErrorMessage err={"Current password is not correct."} />
                )}
                {isMatch && (
                  <ErrorMessage err={"New password does not match."} />
                )}
                {isLong && (
                  <ErrorMessage
                    err={"Password must be at least 8 characters long."}
                  />
                )}
                <div className="flex space-x-2">
                  <div
                    className="w-1/2 font-semibold bg-white text-gray-500 p-2 rounded text-center my-2 cursor-pointer border border-gray-400 hover:bg-gray-200 ring-gray-200 hover:ring"
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`w-1/2 font-semibold bg-blue-500 text-white p-2 rounded text-center my-2 border hover:ring cursor-pointer
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    Confirm
                  </div>
                </div>
              </ul>
            </form>
          </>
        )}
      </Card>
    </>
  );
};
