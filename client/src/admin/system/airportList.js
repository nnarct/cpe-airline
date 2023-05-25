import Axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { AddAirport } from "./components/addAirport";
import { Popup } from "./../../components/modal/popup";
import { Content } from "./components/content";
import { Header } from "./components/header";
import { Table, THead, Th, Edit } from "./components/table";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

export const AirportList = () => {
  const [airports, setAirports] = useState([]);
  const [popup, setPopup] = useState(false);
  const [isDel, setIsDel] = useState(1);
  const [addAirport, setAddAirport] = useState(false);
  const getAirports = async () => {
    const res = await fetch("http://localhost:3001/system/airportList");
    const data = await res.json();
    setAirports(data.Data);
  };
  useEffect(() => {
    getAirports();
  }, []);

  const editAirport = (id) => {
    Swal.fire({
      title: "Edit Airport",
      html: `<div>You are editing airport ID
                <span class="font-bold">${id}</span>
                <span class="text-blue-500 font-bold">${
                  airports.find((a) => a.AirportID === id).IATA
                }</span>
              </div>
            <div class="flex items-center justify-center py-1">
              <label htmlFor="name" class="w-24 block">Name</label>
              <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="Name" value="${
                airports.find((a) => a.AirportID === id).Name
              }">
            </div>
            <div class="flex items-center justify-center py-1">
              <label htmlFor="iata" class="w-24 block">IATA</label>
              <input id="swal-input2" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="IATA" value="${
                airports.find((a) => a.AirportID === id).IATA
              }">
            </div>
            <div class="flex items-center justify-center py-1">
              <label htmlFor="state" class="w-24 block">State</label>
              <input id="swal-input3" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="State" value="${
                airports.find((a) => a.AirportID === id).State
              }">
            </div>
            <div class="flex items-center justify-center py-1">
              <label htmlFor="province" class="w-24 block">Province</label>
              <input id="swal-input4" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="Province" value="${
                airports.find((a) => a.AirportID === id).Province
              }">
            </div>`,
      showCancelButton: true,
      confirmButtonText: "Save",
      confirmButtonColor: "#2563eb",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      reverseButtons: true,
      preConfirm: () => {
        const Name = document.getElementById("swal-input1").value;
        const IATA = document.getElementById("swal-input2").value;
        const State = document.getElementById("swal-input3").value;
        const Province = document.getElementById("swal-input4").value;
        if (!Name) Swal.showValidationMessage(`Please enter airport name`);
        else if (!IATA) Swal.showValidationMessage(`Please enter airport IATA`);
        else if (!State)
          Swal.showValidationMessage(`Please enter airport state`);
        else if (!Province)
          Swal.showValidationMessage(`Please enter airport province`);
        return { Name, IATA, State, Province };
      },
    }).then((result) => {
      if (result.isConfirmed)
        Axios.post(
          "http://localhost:3001/system/editAirport",
          result.value
        ).then((res, err) => {
          if (err)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err,
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          else if (res.data.Status === "Edit airport successfully! :)")
            Swal.fire({
              icon: "success",
              title: "Success",
              text: res.data.Status,
              timer: 3000,
              timerProgressBar: true,
              confirmButtonColor: "#2563eb",
            });
          else if (res.data.Error)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.data.Error,
              timer: 3000,
              timerProgressBar: true,
            });
          getAirports();
        });
    });
  };

  const deleteAirport = () => {
    setPopup(false);
    Axios.post("http://localhost:3001/system/deleteAirport", { id: isDel })
      .then((res) => {
        if (res.data.Status === "Delete airport successfully! :)")
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.Status,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        else
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.Error,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: "Close",
          });
      })
      .then((err) => {
        if (err) console.log(err);
      });
  };
  return (
    <>
      <Content>
        <Header>
          <span>Airport List</span>
          <button
            className="text-base shadow focus:ring-2 rounded px-2 bg-blue-600 text-white hover:ring"
            onClick={() => setAddAirport(!addAirport)}
          >
            Add Airport +
          </button>
        </Header>
        {addAirport && <AddAirport />}
        <Table>
          <THead>
            <Edit />
            <Th className="w-22">AirportID</Th>
            <Th>Name</Th>
            <Th className="w-22">IATA</Th>
            <Th>State</Th>
            <Th className="w-48">Province</Th>
            <Th className="w-20">Delete</Th>
          </THead>
          <tbody>
            {airports &&
              airports.map((airport, i) => {
                return (
                  <tr key={`airport ${i}`}>
                    <td
                      className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => editAirport(airport.AirportID)}
                    >
                      <AiOutlineEdit className="mx-auto" />
                    </td>
                    <td className="border p-2 text-center">
                      {airport.AirportID ? airport.AirportID : "-"}
                    </td>
                    <td className="border p-2">
                      {airport.Name ? airport.Name : "-"}
                    </td>

                    <td className="border p-2 text-center">
                      {airport.IATA ? airport.IATA : "-"}
                    </td>
                    <td className="border p-2">
                      {airport.State ? airport.State : "-"}
                    </td>
                    <td className="border p-2">
                      {airport.Province ? airport.Province : "-"}
                    </td>
                    <td
                      className="border p-2 text-center font-bold select-none cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setPopup(true);
                        setIsDel(airport.AirportID);
                      }}
                    >
                      <RiDeleteBin6Line className="mx-auto" />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        {popup && (
          <Popup>
            <div className="p-3 flex flex-col space-y-2">
              <h1 className="text-xl font-bold justify-center h-1/3 flex items-center">
                Are you sure?
              </h1>
              <p className="h-1/3 flex items-center justify-center border border-red-200 rounded bg-red-100">
                Airport ID :<span className="font-bold pl-1"> {isDel}</span>
              </p>
              <div className="flex space-x-2 h-1/3 items-center">
                <button
                  className="w-1/2 rounded bg-green-500 hover:opacity-80 px-3 py-1 hover:ring ring-green-300"
                  onClick={() => deleteAirport()}
                >
                  Yes
                </button>
                <button
                  className="w-1/2 rounded bg-red-500 hover:opacity-80 px-3 py-1 hover:ring ring-red-300"
                  onClick={() => setPopup(false)}
                >
                  No
                </button>
              </div>
            </div>
          </Popup>
        )}
      </Content>
    </>
  );
};
