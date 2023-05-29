import { useEffect, useState } from "react";
import { Content } from "../components/content";
import { Header } from "../components/header";
import { Edit, THead, Table, Th } from "../components/table";
import { getPlanes, addPlane } from "./functions";
import { Plane } from "./onePlane";

export const PlaneList = () => {
  const [planes, setPlanes] = useState([]);
  const [airlines, setAirlines] = useState([]);
  useEffect(() => {
    getPlanes(setPlanes,setAirlines);
  })
  return(<>
  <Content>
        <Header>
          <span>Plane List</span>
          <button
            className="text-base shadow focus:ring-2 rounded px-2 bg-blue-600 text-white  hover:ring"
            onClick={() => addPlane(airlines, setPlanes, setAirlines)}
          >
            Add Plane +
          </button>
        </Header>
        <Table>
          <THead>
            <Edit />
            <Th>PlaneID</Th>
            <Th>AirlineID</Th>
            <Th>PlaneModel</Th>
            <Th className="w-20">Delete</Th>
          </THead>
          <tbody>
            {planes && planes?.map((plane, i) => {
              return <Plane plane={plane} key={i} setPlanes={setPlanes} airlines={airlines} setAirlines={setAirlines}/>;
            })}
          </tbody>
        </Table>
  </Content>
  </>);
};