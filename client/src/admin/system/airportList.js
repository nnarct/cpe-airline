import Axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { AddAirport } from "./components/addAirport";
import { Popup } from "./../../components/modal/popup";
import { Content } from "./components/content";
import { Header } from "./components/header";
import { Table, THead, Th, Edit } from "./components/table";
import { AiOutlineEdit } from "react-icons/ai";

export const AirportList = () => {
  const [airports, setAirports] = useState([]);
  const [popup, setPopup] = useState(false);
  const [isDel, setIsDel] = useState(1);
  const [addAirport, setAddAirport] = useState(false);
  useEffect(() => {
    const getAirports = async () => {
      const res = await fetch("http://localhost:3001/system/airportList");
      const data = await res.json();
      setAirports(data.Data);
    };
    getAirports();
  }, []);

  const editAirport = (e) => {};

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
            <Th className="w-14">AirportID</Th>
            <Th>Name</Th>
            <Th>IATA</Th>
            <Th>State</Th>
            <Th>Province</Th>
            <Th>Delete</Th>
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
                      e
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
                      className="border p-2 text-center font-bold select-none hover:bg-red-500 cursor-pointer hover:ring ring-red-200 active:bg-red-500/50"
                      onClick={() => {
                        setPopup(true);
                        setIsDel(airport.AirportID);
                      }}
                    >
                      X
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
