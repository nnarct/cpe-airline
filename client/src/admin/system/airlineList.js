import { useEffect, useState } from "react";

export const AirlineList = () => {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    const getAirlines = async () => {
      const res = await fetch("http://localhost:3001/admin/airlineList");
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
      <div className="flex flex-col items-center ">
        <h1 className="text-3xl font-bold py-4">Airline List</h1>
        <table className="table-auto border-collapse w-4/5 bg-white">
          <thead>
            <tr>
              <th className="border px-3 py-2 w-1/12">Edit</th>
              <th className="border px-3 py-2 w-1/12">ID</th>
              <th className="border px-3 py-2 w-1/6">Name</th>
              <th className="border px-3 py-2 w-1/6">Logo Path</th>
              <th className="border px-3 py-2 w-1/6">Link</th>
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
                    <td className="border px-3 py-2">
                      {airline.AirlineID ? airline.AirlineID : "-"}
                    </td>
                    <td className="border px-3 py-2">
                      {airline.Name ? airline.Name : "-"}
                    </td>

                    <td className="border px-3 py-2">
                      {airline.LogoImage ? airline.LogoImage : "-"}
                    </td>
                    <td className="border px-3 py-2">
                      {airline.Link ? airline.Link : "-"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
