import { useEffect, useState } from "react";
import { Content } from "./components/content";
import { Header } from "./components/header";
import { Table, THead, Th, Edit } from "./components/table";
import { AiOutlineEdit } from "react-icons/ai";

export const AirlineList = () => {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    const getAirlines = async () => {
      const res = await fetch("http://localhost:3001/system/airlineList");
      const data = await res.json();
      setAirlines(data.Data);
    };
    getAirlines();
  }, []);
  const editAirline = (e) => {
    console.log(e);
  };

  return (
    <>
      <Content>
        <Header>Airline List</Header>
        <Table>
          <THead>
            <Edit />
            <Th className="w-1/12">ID</Th>
            <Th>Name</Th>
            <Th>Logo Path</Th>
            <Th>Link</Th>
          </THead>
          <tbody>
            {airlines &&
              airlines.map((airline, i) => {
                return (
                  <tr key={i}>
                    <td
                      className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => editAirline(airline.AirlineID)}
                    ></td>
                    <td className="border px-3 py-2 text-center">
                      {airline.AirlineID ? airline.AirlineID : "-"}
                    </td>
                    <td className="whitespace-nowrap border px-3 py-2">
                      {airline.Name ? airline.Name : "-"}
                    </td>

                    <td className="border px-3 py-2">
                      {airline.LogoImage ? airline.LogoImage : "-"}
                    </td>
                    <td className="border px-3 py-2">
                      {airline.Link ? (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 hover:bg-gray-100 p-1 rounded underline"
                          href={airline.Link}
                        >
                          {airline.Link}
                        </a>
                      ) : (
                        "-"
                      )}
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
