import { useEffect, useState } from "react";

export const AirportList = () => {
  const [airports, setAirports] = useState([]);
  useEffect(() =>{
    const getAirports = async() =>{
      const res = await fetch("http://localhost:3001/admin/airportList");
      const data = await res.json();
      setAirports(data.Data);
    }
    getAirports();
  },[]);
  const editAirport = (e) =>{
    console.log(e);
  };

  const [modal, setAddAirport] = useState(false);

  return(
    <>
    {/* <AddAirport status={modal} setStatus={setAddAirport}/> */}
    <div className="flex flex-col items-center px-2">
      <h1 className="text-3xl font-bold py-4">Airport List</h1>
      <button
        className="shadow focus:ring-2 rounded px-2 bg-white hover:bg-gray-300"
        // onClick={() => setAddAdminModal(true)}
      >
        Add Airport
      </button>
      <table className="table-auto border-collapse w-4/5 bg-white ">
        <thead>
          <tr>
            <th className="p-3 border border-1">Edit</th>
            <th  className="p-3 border border-1">AirportID</th>
            <th  className="p-3 border border-1">Name</th>
            <th className="p-3 border border-1">IATA</th>
            <th className="p-3 border border-1">State</th>
            <th className="p-3 border border-1">Province</th>
          </tr>
        </thead>
        <tbody>
          {airports && airports.map((airport,i)=>{
            return (
              <tr key={airport.AirportID}>
                <td
                  className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
                  onClick={(e)=> editAirport(airport.AirportID)}
                >
                  e
                </td>
                <td className="border border-1 px-3 py-2">
                  {airport.AirportID ? airport.AirportID : "-"}
                </td>
                <td className="border border-1 px-3 py-2">
                  {airport.Name ? airport.Name : "-"}
                </td>
                <td className="border border-1 px-3 py-2">
                  {airport.IATA ? airport.IATA : "-"}
                </td>
                <td className="border border-1 px-3 py-2">
                  {airport.State ? airport.State : "-"}
                </td>
                <td className="border border-1 px-3 py-2">
                  {airport.Province ? airport.Province : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}