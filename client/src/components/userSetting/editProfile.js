import Axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyProfile } from "./myProfile";
import { Row, ButtonWrap } from "./myProfileComps";
import { Popup } from "../modal/popup";

export const EditProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const { id } = useParams();
  const edit = useRef(null);
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    TelNo: "",
  });

  useEffect(() => {
    Axios.get("http://localhost:3001").then((res, err) => {
      if (err) console.log(err);
      if (res.data.Status !== "Success") navigate("/"); // Not logged in user
    });
    Axios.post("http://localhost:3001/showProfile", { id: id }).then(
      (res, err) => {
        if (err) console.log(err);
        if (res.data.Status === "Success") setUser(res.data.Data);
        else alert(res.data.Error);
      }
    );
  }, []);

  const handleSubmit = () => {
    const form = edit.current;
    const values = {
      id: id,
      FirstName: form["fn"].value,
      LastName: form["ln"].value,
      Email: form["em"].value,
      TelNo: form["tel"].value,
    };
    Axios.post("http://localhost:3001/editProfile", values).then((res, err) => {
      if (err) console.log(err);
      if (res.data.Status === "Edit user successfully! :)") {
        // alert(res.data.Status);
        setUser(values);
        setIsEditing(false);
      } else {
        alert(res.data.Error);
        setIsEditing(false);
      }
    });
  };

  return (
    <>
      <div className="container flex flex-col items-center w-full max-w-5xl">
        {isEditing ? (
          <>
            <form ref={edit} className="w-full">
              <Row head={"First Name"}>
                <input
                  name="fn"
                  type="text"
                  className="w-full rounded-r border border-neutral-300 bg-white px-3 py-1 outline-none focus:ring ring-blue-200/40"
                  defaultValue={user.FirstName}
                />
              </Row>

              <Row head={"Last Name"}>
                <input
                  name="ln"
                  type="text"
                  className="w-full rounded-r border border-neutral-300 bg-white px-3 py-1 outline-none focus:ring ring-blue-200/40"
                  defaultValue={user.LastName}
                />
              </Row>

              <Row head={"Email"}>
                <input
                  name="em"
                  type="email"
                  className="w-full rounded-r border border-neutral-300 bg-white px-3 py-1 outline-none focus:ring ring-blue-200/40 "
                  defaultValue={user.Email}
                />
              </Row>

              <Row head={"Phone Number"}>
                <input
                  name="tel"
                  type="text"
                  className="w-full rounded-r border border-neutral-300 bg-white px-3 py-1 outline-none focus:ring ring-blue-200/40"
                  defaultValue={user.TelNo}
                />
              </Row>

              <ButtonWrap>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing(false);
                  }}
                  className="text-gray-500 rounded mx-3 font-semibold active:bg-gray-100 border border-gray-400 py-2 px-6 hover:ring ring-gray-300/60 bg-white"
                >
                  Cancle
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsChecking(true);
                  }}
                  className="bg-green-500 text-white rounded mx-3 border border-green-500 font-semibold py-2 px-6 hover:ring ring-green-400/60 active:bg-green-600"
                >
                  Save changes
                </button>
              </ButtonWrap>
              {isChecking ? (
                <Popup>
                  <div className="p-5 text-center rounded bg-white border shadow">
                    <span className="text-2xl w-full">Are you sure?</span>
                    <div className="flex space-x-3 pt-5">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsChecking(false);
                        }}
                        className="w-1/2 bg-white text-blue-500 border border-blue-500 py-1 px-2 rounded hover:ring ring-blue-200/40 focus:bg-blue-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                        className="w-1/2 bg-blue-500 text-white border border-blue-500 py-1 px-2 rounded hover:ring ring-blue-200 focus:bg-blue-600"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </Popup>
              ) : null}
            </form>
          </>
        ) : (
          <MyProfile user={user} setIsEditing={setIsEditing} />
        )}
      </div>
    </>
  );
};
