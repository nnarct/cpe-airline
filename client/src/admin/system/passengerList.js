import { useEffect, useState } from "react";
import { Content } from "./components/content";
import { Header } from "./components/header";

export const PassengerList = () => {
  const [passengers, setPassengers] = useState([]);
  useEffect(() => {
    const getPassengers= async () => {
      const res = await fetch("http://localhost:3001/system/passengerList");
      const data = await res.json();
      setPassengers(data.Data);
    };
    getPassengers();
  }, []);
  const editPassengers = (e) => {};
  return (
    <>
      <Content>
        <Header>All Passengers</Header>
        <table className="container">
          <thead>
            <tr>
              <th className="p-2 border border-1 border-black">Edit</th>
              <th className="p-2 border border-1 border-black w-14">PassengerID</th>
              <th className="p-2 border border-1 border-black">FirstName</th>
              <th className="p-2 border border-1 border-black">LastName</th>
              <th className="p-2 border border-1 border-black">DOB</th>
              <th className="p-2 border border-1 border-black">Gender</th>
              <th className="p-2 border border-1 border-black">Nationality</th>
              <th className="p-2 border border-1 border-black">TelNo</th>
              <th className="p-2 border border-1 border-black">BookingID</th>
            </tr>
          </thead>
          <tbody>
            {passengers &&
              passengers.map((passenger, i) => {
                return (
                  <>
                    <tr key={i}>
                      <td
                        className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer"
                        onClick={(e) => editPassengers(passenger.UserID)}
                      >
                        e
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {passenger.UserID ? passenger.UserID : "-"}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {passenger.FirstName ? passenger.FirstName : "-"}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {passenger.LastName ? passenger.LastName : "-"}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {passenger.DOB ? passenger.DOB : "-"}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {passenger.Gender ? passenger.Gender : "-"}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {passenger.Nationality ? passenger.Nationality : "-"}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {passenger.TelNo ? passenger.TelNo : "-"}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {passenger.BookingID ? passenger.BookingID : "-"}
                      </td>
                      <td className="border px-3 py-2 text-center font-bold select-none hover:bg-red-500 cursor-pointer hover:ring ring-red-200 active:bg-red-500/50">
                        X
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </Content>
    </>
  );
}