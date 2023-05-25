import { useEffect, useState } from "react";
import { Content } from "../components/content";
import { Header } from "../components/header";
import { Table, THead, Th, Edit } from "../components/table";
import { getAirlines } from "./functions";
import { Airline } from "./oneAirline";
export const AirlineList = () => {
  const [airlines, setAirlines] = useState([]);
  useEffect(() => {
    getAirlines(setAirlines);
  }, []);

  return (
    <>
      <Content>
        <Header>Airline List</Header>
        <Table>
          <THead>
            <Edit />
            <Th className="w-1/12">ID</Th>
            <Th>Name</Th>
            <Th>Link</Th>
            <Th className="w-20">Delete</Th>
          </THead>
          <tbody>
            {airlines?.map((airline, i) => {
              return (
                <Airline key={i} airline={airline} setAirlines={setAirlines} />
              );
            })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
