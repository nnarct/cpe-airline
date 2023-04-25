import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddAirport } from "./components/addAirport";

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
                  </tr>
                );
              })}
          </tbody>
        </table>

        <AddAirport />
      </div>
    </>
  );
};
