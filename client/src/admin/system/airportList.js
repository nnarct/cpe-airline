import Axios from "axios";
import { useEffect, useState } from "react";
import { AddAirport } from "./components/addAirport";
import { Popup } from "./../../components/modal/popup";
export const AirportList = () => {
  const [airports, setAirports] = useState([]);
  useEffect(() => {
    const getAirports = async () => {
      const res = await fetch("http://localhost:3001/system/airportList");
      const data = await res.json();
      setAirports(data.Data);
    };
    getAirports();
  });

  const editAirport = (e) => {};
  const [popup, setPopup] = useState(false);
  const [isDel, setIsDel] = useState(1);
  const deleteAirport = () => {
    setPopup(false);
    Axios.post("http://localhost:3001/system/deleteAirport", { id: isDel })
      .then((res) => {
        if (res.data.Status === "Delete airport successfully! :)") {
          alert(res.data.Status);
        } else {
          alert(res.data.Error);
        }
      })
      .then((err) => {
        if (err) console.log(err);
      });
  };
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl py-4">Airport List</h1>
        <table className="container">
          <thead>
            <tr>
              <th className="p-2 border border-1 border-black">Edit</th>
              <th className="p-2 border border-1 border-black w-14">
                AirportID
              </th>
              <th className="p-2 border border-1 border-black">Name</th>
              <th className="p-2 border border-1 border-black">IATA</th>
              <th className="p-2 border border-1 border-black">State</th>
              <th className="p-2 border border-1 border-black">Province</th>
              <th className="p-2 border border-1 border-black">Delete</th>
            </tr>
          </thead>
          <tbody>
            {airports &&
              airports.map((airport, i) => {
                return (
                  <tr key={i}>
                    <td
                      className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => editAirport(airport.AirlineID)}
                    >
                      e
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {airport.AirportID ? airport.AirportID : "-"}
                    </td>
                    <td className="border px-3 py-2">
                      {airport.Name ? airport.Name : "-"}
                    </td>

                    <td className="border px-3 py-2 text-center">
                      {airport.IATA ? airport.IATA : "-"}
                    </td>
                    <td className="border px-3 py-2">
                      {airport.State ? airport.State : "-"}
                    </td>
                    <td className="border px-3 py-2">
                      {airport.Province ? airport.Province : "-"}
                    </td>
                    <td
                      className="border px-3 py-2 text-center font-bold select-none hover:bg-red-500 cursor-pointer hover:ring ring-red-200 active:bg-red-500/50"
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
        </table>

        <AddAirport />
        {popup ? (
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
        ) : (
          ""
        )}
      </div>
    </>
  );
};
