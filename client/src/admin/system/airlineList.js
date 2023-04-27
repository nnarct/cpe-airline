import { useEffect, useState } from "react";
import { Content } from "./components/content";
import { Header } from "./components/header";

export const AirlineList = () => {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    const getAirlines = async () => {
      const res = await fetch("http://localhost:3001/system/airlineList");
      const data = await res.json();
      setAirlines(data.Data);
    };
    getAirlines();
  }, []);
  const editAirline = (e) => {
    console.log(e);
  };

  return (
    <>
      <Content>
        <Header>Airline List</Header>
        <table className="w-full container table-auto border-collapse w-4/5 bg-white">
          <thead>
            <tr>
              <th className="border border-black px-3 py-2 w-1/12">Edit</th>
              <th className="border border-black px-3 py-2 w-1/12">ID</th>
              <th className="border border-black px-3 py-2 w-1/6">Name</th>
              <th className="border border-black px-3 py-2 w-1/6">Logo Path</th>
              <th className="border border-black px-3 py-2 w-1/6">Link</th>
            </tr>
          </thead>
          <tbody>
            {airlines &&
              airlines.map((airline, i) => {
                return (
                  <tr key={airline.AirlineID}>
                    <td
                      className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => editAirline(airline.AirlineID)}
                    >
                      e
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {airline.AirlineID ? airline.AirlineID : "-"}
                    </td>
                    <td className="whitespace-nowrap border px-3 py-2">
                      {airline.Name ? airline.Name : "-"}
                    </td>

                    <td className="border px-3 py-2">
                      {airline.LogoImage ? airline.LogoImage : "-"}
                    </td>
                    <td className="border px-3 py-2">
                      {airline.Link ? (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 hover:bg-gray-100 p-1 rounded underline"
                          href={airline.Link}
                        >
                          {airline.Link}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Content>
    </>
  );
};
