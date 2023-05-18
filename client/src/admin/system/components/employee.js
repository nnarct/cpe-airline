import Axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { Label } from "./employeeLabel";
import { AiOutlineEdit } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { isPhoneNumber } from "../../../feature/verification/phone";

const InputStyle =
  "whitespace-nowrap w-full h-[40px] px-3 m-0 outline-none rounded-none active:rounded-none focus:outline-none focus:ring-2 focus:ring-opacity-50";

const Td = ({ children }) => {
  return (
    <td className="whitespace-nowrap border h-[45px] bg-sky-100/80 ">
      {children}
    </td>
  );
};

export const Employee = ({ editThisRow, setEditThisRow, employee }) => {
  const username = useRef(null);
  const FirstName = useRef(null);
  const LastName = useRef(null);
  const Email = useRef(null);
  const TelNo = useRef(null);
  const AirlineID = useRef(null);

  const isCurrentTaskEdit = employee.EmployeeID === editThisRow;
  const [values, setValues] = useState({
    EmployeeID: employee.EmployeeID,
    username: employee.username,
    FirstName: employee.FirstName,
    LastName: employee.LastName,
    Email: employee.Email,
    TelNo: employee.TelNo,
    Position: employee.Position,
    AirlineID: employee.AirlineID,
  });
  useEffect(() => {
    setValues({
      EmployeeID: employee.EmployeeID,
      username: employee.username,
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      Email: employee.Email,
      TelNo: employee.TelNo,
      Position: employee.Position,
      AirlineID: employee.AirlineID,
    });
  }, [isCurrentTaskEdit]);

  const verify = () => {
    if (values.username === "") {
      Swal.fire({
        icon: "warning",
        title: "Sorry...",
        text: "username can't be NULL",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setValues({ ...values, username: employee.username });
      username.current.value = employee.username;
      return false;
    }
    if (values.FirstName === "") {
      Swal.fire({
        icon: "warning",
        title: "Sorry...",
        text: "First Name can't be NULL",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setValues({ ...values, FirstName: employee.FirstName });
      FirstName.current.value = employee.FirstName;
      return false;
    }
    if (values.LastName === "") {Swal.fire({
      icon: "warning",
      title: "Sorry...",
      text: "Last Name can't be NULL",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
      setValues({ ...values, LastName: employee.LastName });
      LastName.current.value = employee.LastName;
      return false;
    }
    if (values.Email === "" || values.Email === null) {
      setValues({ ...values, Email: null });
    }
    if (values.TelNo === "" || values.TelNo === null) {
      setValues({ ...values, TelNo: null });
    } else if (isPhoneNumber(values.TelNo) === false) {
      {Swal.fire({
        icon: "warning",
        title: "Sorry...",
        text: "Phone number is invalid",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return false;
    }
    if (values.Position === "" || values.Position === null) {
      setValues({ ...values, Position: null });
    }
    if (values.AirlineID === "" || values.AirlineID === null) {
      setValues({ ...values, AirlineID: null });
    }

    return true;
  };
  const handleEdit = (e) => {
    if (verify()) {
      Axios.post("http://localhost:3001/system/editEmployee", values)
        .then((res) => {
          if (res.data.Status === "Edit employee successfully! :)") {
            setEditThisRow(0);
            window.location.reload();
          } else 
          Swal.fire({
            icone: "error",
            title: "Sorry...",
            text: res.data.Error,
          })
        })
        .then((err) => {
          if (err) console.log(err);
        });
    }
  };

  const changeCurrentTask = () => {
    setEditThisRow(employee.EmployeeID);
    if (editThisRow !== 0) {
      Swal.fire({
        icon: "warning",
        title: "Sorry...",
        text: "Please finish the current task first!",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };
  return (
    <>
      {isCurrentTaskEdit ? (
        <tr>
          <td className="border text-center cursor-pointer text-white">
            <div className="flex justify-evenly h-[45px]">
              <span
                onClick={() => handleEdit()}
                className="w-1/2 flex justify-center items-center bg-green-500 h-[45px]  opacity-50 hover:opacity-100 h-full w-full"
              >
                <BsCheckCircleFill />
              </span>
              <span
                onClick={() => setEditThisRow(0)}
                className="w-1/2 flex justify-center items-center bg-red-500  h-[45px] opacity-50 hover:opacity-100 h-full w-full"
              >
                <BsCheckCircleFill />
              </span>
            </div>
          </td>
          <Td>
            <input
              ref={username}
              className={InputStyle}
              name="username"
              defaultValue={values.username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </Td>

          <Td>
            <input
              ref={FirstName}
              className={InputStyle}
              name="FirstName"
              defaultValue={values.FirstName}
              onChange={(e) =>
                setValues({ ...values, FirstName: e.target.value })
              }
            />
          </Td>

          <Td>
            <input
              ref={LastName}
              className={InputStyle}
              name="LastName"
              defaultValue={values.LastName}
              onChange={(e) =>
                setValues({ ...values, LastName: e.target.value })
              }
            />
          </Td>

          <Td>
            <input
              ref={Email}
              className={InputStyle}
              name="Email"
              defaultValue={values.Email}
              onChange={(e) => setValues({ ...values, Email: e.target.value })}
            />
          </Td>

          <Td>
            <input
              ref={TelNo}
              className={InputStyle}
              name="TelNo"
              defaultValue={values.TelNo}
              onChange={(e) => setValues({ ...values, TelNo: e.target.value })}
            />
          </Td>

          <Td>
            <select
              className="w-full h-[40px] px-3 py-2 bg-sky-100/80 rounded-none active:rounded-none focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
              defaultValue={values.Position}
              onChange={(e) =>
                setValues({ ...values, Position: e.target.value })
              }
            >
              <option value={null}>No position</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value={"System"}>System Admin</option>
            </select>
            {/* <input
              ref={Position}
              className={InputStyle}
              name="Position"
              defaultValue={values.Position}
              onChange={(e) =>
                setValues({ ...values, Position: e.target.value })
              }
            /> */}
          </Td>
          <Td>
            <input
              ref={AirlineID}
              className={InputStyle}
              name="AirlineID"
              defaultValue={values.AirlineID}
              onChange={(e) =>
                setValues({ ...values, AirlineID: e.target.value })
              }
            />
          </Td>
        </tr>
      ) : (
        <tr>
          <td
            className="border w-[20px] px-3 text-center hover:bg-gray-200 cursor-pointer"
            onClick={() => changeCurrentTask()}
          >
            <span className="flex justify-center">
              <AiOutlineEdit />
            </span>
          </td>
          <Label e={employee.username} />
          <Label e={employee.FirstName} />
          <Label e={employee.LastName} />
          <Label e={employee.Email} />
          <Label e={employee.TelNo} />
          <Label e={employee.Position} />
          <Label e={employee.AirlineID} />
        </tr>
      )}
    </>
  );
};
