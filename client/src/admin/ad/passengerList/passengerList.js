import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Content } from "../../system/components/content";
import { Header } from "../../system/components/header";
import { Table, THead, Th, Edit } from "../../system/components/table";
import { getPassengers } from "./functions";
import { Passenger } from "./onePassenger";

export const PassengerList = () => {
  const [passengers, setPassengers] = useState([]);
  
  const [cookies] = useCookies(['admin']);
  const adminCookie = cookies.admin;
  useEffect(() => {
    getPassengers({ setPassengers, adminCookie });
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
              return (
                <Passenger
                  passenger={passenger}
                  key={passenger.PassengerID || i}
                />
              );
            })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
