import { useEffect, useState } from "react";
import { AddAirport } from "../admin/system/components/addAirport";
import { Content } from "../admin/system/components/content";
import { Header } from "../admin/system/components/header";
import { Table, THead, Th, Edit } from "../admin/system/components/table";
import { Airport } from "./oneAirport";

export const AirportList = () => {
  const [airports, setAirports] = useState([]);
  const [addAirport, setAddAirport] = useState(false);
  const getAirports = async () => {
    const res = await fetch("http://localhost:3001/system/airportList");
    const data = await res.json();
    setAirports(data.Data);
  };
  useEffect(() => {
    getAirports();
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
            <Th className="w-48">Province</Th>
            <Th className="w-20">Delete</Th>
          </THead>
          <tbody>
            {airports &&
              airports.map((airport, i) => {
                return (
                  <Airport airport={airport} key={i} />
                );
              })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
