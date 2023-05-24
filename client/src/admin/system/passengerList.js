import Axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { useEffect, useState } from "react";
import { Content } from "./components/content";
import { Header } from "./components/header";
import { Table, THead, Th, Edit } from "./components/table";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

export const PassengerList = () => {
  const [passengers, setPassengers] = useState([]);
  const getPassengers = async () => {
    const res = await fetch("http://localhost:3001/system/passengerList");
    const data = await res.json();
    setPassengers(data.Data);
  };
  useEffect(() => {
    getPassengers();
  }, []);
  const editPassengers = (id) => {
    const passenger = passengers.find((p) => p.PassengerID === id);
    const fselected = passenger?.Gender === "female" ? "selected" : "";
    const mselected = passenger?.Gender === "male" ? "selected" : "";
    const d = passenger?.DOB.split("T")[0];
    Swal.fire({
      title: "Edit Passenger",
      html: `<div class="">You are editing passenger ID
                <span class="text-red-500 font-bold">${id}</span>
                <span class="text-blue-500 font-bold pr-2">${
                  passenger?.FirstName
                } ${passenger?.LastName}</span>
              </div>
              <form>
                <div class="flex items-center justify-center">
                  <label htmlFor="FirstName" class="w-24 block">FirstName</label>
                  <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="FirstName" value="${
                    passenger?.FirstName
                  }">
                </div>
                <div class="flex items-center justify-center">
                  <label htmlFor="LastName" class="w-24 block">LastName</label>
                  <input id="swal-input2" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="LastName" value="${
                    passenger?.LastName
                  }">
                </div>
                <div class="flex items-center justify-center">
                  <label htmlFor="DOB" class="w-24 block">DOB</label>
                  <input type="date" id="swal-input3" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="DOB" value="${d}" max=${moment(new Date()).format("YYYY-MM-DD")}>
                </div>
                <div class="flex items-center justify-center">
                  <label htmlFor="gender" class="w-24 block">Gender</label>
                  <select id="swal-input4" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" value="${
                    passenger?.Gender
                  }">
                    <option value="male" ${mselected}>male</option>
                    <option value="female" ${fselected}>female</option>
                  </select>
                </div>
                <div class="flex items-center justify-center">
                  <label htmlFor="nationality" class="w-24 block">Nationality</label>
                  <input id="swal-input5" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="nationality" value="${
                    passenger?.Nationality
                  }">
                </div>
            </form>`,

      showCancelButton: true,
      confirmButtonText: "Save",
      confirmButtonColor: "#2563eb",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        // Todo - validate input to match database
        const FirstName = document.getElementById("swal-input1").value;
        const LastName = document.getElementById("swal-input2").value;
        const DOB = document.getElementById("swal-input3").value;
        const Gender = document.getElementById("swal-input4").value;
        const Nationality = document.getElementById("swal-input5").value;
        if (FirstName === "")
          Swal.showValidationMessage(`Please enter First Name`);
        else if (LastName === "")
          Swal.showValidationMessage(`Please enter Last Name`);
        else if (Nationality === "")
          Swal.showValidationMessage(`Please enter Nationality`);
        return {
          id: id,
          FirstName: FirstName,
          LastName: LastName,
          DOB: DOB,
          Gender: Gender,
          Nationality: Nationality,
        };
      },
    }).then((result) => {
      if (result.isConfirmed)
        Axios.post(
          "http://localhost:3001/system/editPassenger",
          result.value
        ).then((res, err) => {
          if (err)
            Swal.fire({
              icon: "error",
              title: "Please try again",
              text: err,
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          else if (res.data.Status)
            Swal.fire({
              icon: "success",
              title: "Success",
              text: res.data.Status,
              timer: 3000,
              timerProgressBar: true,
              confirmButtonColor: "#2563eb",
              confirmButtonText: "OK",
            });
          else
            Swal.fire({
              icon: "error",
              title: "Please try again",
              text: res.data.Error,
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
        });
    });
  };
  // Todo - delete passenger ** must effect seat
  const deletePassenger = (id) => {
    console.log(id);
  };
  return (
    <>
      <Content>
        <Header>All Passengers</Header>
        <Table>
          <THead>
            <Edit />
            <Th className="w-14">PassengerID</Th>
            <Th>FirstName</Th>
            <Th>LastName</Th>
            <Th>DOB</Th>
            <Th>Gender</Th>
            <Th>Nationality</Th>
            <Th>BookingID</Th>
            {/* <Th>AddOnsID</Th>
            <Th>SeatID</Th> */}
            <Th>Delete</Th>
          </THead>
          <tbody>
            {passengers?.map((passenger, i) => {
              return (
                <tr key={i}>
                  <td
                    className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
                    onClick={(e) => editPassengers(passenger.PassengerID)}
                  >
                    <AiOutlineEdit className="mx-auto" />
                  </td>
                  {[
                    passenger?.PassengerID,
                    passenger?.FirstName,
                    passenger?.LastName,
                    moment(passenger?.DOB).format("DD MMM YYYY"),
                    passenger?.Gender,
                    passenger?.Nationality,
                    passenger?.BookingID,
                  ].map((item, i) => {
                    return (
                      <td key={i} className="border px-3 py-2 text-center">
                        {item}
                      </td>
                    );
                  })}
                  <td
                    className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
                    onClick={(e) => deletePassenger(passenger.PassengerID)}
                  >
                    <RiDeleteBin6Line className="mx-auto" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
