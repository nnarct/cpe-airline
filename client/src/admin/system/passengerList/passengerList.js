import { useEffect, useState } from "react";
import { Content } from "../components/content";
import { Header } from "../components/header";
import { Table, THead, Th, Edit } from "../components/table";
import { getPassengers } from "./functions";
import { Passenger } from "./onePassenger";

export const PassengerList = () => {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    getPassengers({ setPassengers });
  }, []);

  // Todo - delete passenger ** must effect seat
  return (
    <>
      <Content>
        <Header>All Passengers</Header>
        <Table>
          <THead>
            <Edit />
            <Th className="w-14">ID</Th>
            <Th>FirstName</Th>
            <Th>LastName</Th>
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
              return <Passenger {...passenger}/>;
            })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
