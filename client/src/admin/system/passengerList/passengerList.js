import { useEffect, useState } from "react";
import { Content } from "../components/content";
import { Header } from "../components/header";
import { Table, THead, Th, Edit } from "../components/table";
import { getPassengers, getPassengersGroupByBookingID } from "./functions";
import { Passenger } from "./onePassenger";

export const PassengerList = () => {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    getPassengers({ setPassengers });
  }, []);

  const handleGroupBy = (e) => {
    console.log(e.target.value);
    if (e.target.value === 1) {
      getPassengers({ setPassengers });
    } else {
      getPassengersGroupByBookingID({ setPassengers });
    }
  };
  // Todo - delete passenger ** must effect seat
  return (
    <>
      <Content>
        <Header>All Passengers</Header>
        <Header>
          <div className="flex w-full items-center space-x-2">
            <span className="whitespace-nowrap font-semibold text-gray-600 text-sm text-left pl-2">
              Group By :
            </span>
            <select
              onChange={handleGroupBy}
              className="border text-base px-2 py-1 border-primary/50"
            >
              <option value={1}>Passenger ID</option>
              <option value={2}>Booking ID</option>
            </select>
          </div>
        </Header>
        <Table>
          <THead>
            <Edit />
            <Th className="w-14">ID</Th>
            <Th className="w-40">FirstName</Th>
            <Th className="w-40">LastName</Th>
            <Th className="w-36">DOB</Th>
            <Th className="w-28">Gender</Th>
            <Th className="w-32">Nationality</Th>
            <Th className="w-28">BookingID</Th>
            {/* <Th>AddOnsID</Th>
            <Th>SeatID</Th> */}
            <Th className="w-20">Delete</Th>
          </THead>
          <tbody>
            {passengers?.map((passenger, i) => {
              return <Passenger passenger={passenger} />;
            })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
