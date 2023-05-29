import { useEffect, useState } from "react";
import { Table, Th, THead } from "../components/table";
import { Content } from "../components/content";

export const FlightRoute = () => {
  const [fr, setFr] = useState([]);
  const getRouteList = async () => {
    const res = await fetch("http://localhost:3001/system/routeList");
    const data = await res.json();
    setFr(data.Data);
  };
  //SELECT * FROM class c INNER JOIN plane p ON p.PlaneID = c.PlaneID INNER JOIN airline a ON a.AirlineID = p.AirlineID
    // hdy - dmk finish
  useEffect(() => {
    getRouteList();
  });
  return (
    <>
      <Content>
        <Table>
          <THead>
            <Th>ID</Th>
            <Th>Origin</Th>
            <Th>ID</Th>
            <Th>Destination</Th>
            <Th>Count</Th>
          </THead>

          <tbody>
            {fr?.map((fr) => {
              return (
                <tr key={fr.ID}>
                  <td className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer">
                    {fr["ori id"]}
                  </td>
                  <td className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer">
                    {fr.origin}
                  </td>
                  <td className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer">
                    {fr["des id"]}
                  </td>
                  <td className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer">
                    {fr.destination}
                  </td>
                  <td className="border px-3 py-2 text-center hover:bg-gray-200 cursor-pointer">
                    {fr["FlightCount"]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Content>
    </>
  );
};
