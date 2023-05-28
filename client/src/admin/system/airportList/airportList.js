import { useEffect, useState } from "react";
import { AddAirport } from "../components/addAirport";
import { Content } from "../components/content";
import { Header } from "../components/header";
import { Table, THead, Th, Edit } from "../components/table";
import { Airport } from "./oneAirport";
import { getAirports } from "./functions";
export const AirportList = () => {
  const [airports, setAirports] = useState([]);
  const [addAirport, setAddAirport] = useState(false);

  useEffect(() => {
    getAirports(setAirports);
  }, []);


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
            <Th className="w-22">AirportID</Th>
            <Th>Name</Th>
            <Th className="w-22">IATA</Th>
            <Th>State</Th>
            <Th className="w-42">Province</Th>
            <Th className="w-22">section</Th>
            <Th className="w-20">Delete</Th>
          </THead>
          <tbody>
            {airports?.map((airport, i) => {
              return (
                <Airport 
                setAirports={setAirports}
                airport={airport} 
                key={i}
                />
              );
            })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
