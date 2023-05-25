import Swal from "sweetalert2";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Content } from "./components/content";
import { Header } from "./components/header";
import { Table, THead, Th, Edit } from "./components/table";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
export const AirlineList = () => {
  const [airlines, setAirlines] = useState([]);
  const getAirlines = async () => {
    const res = await fetch("http://localhost:3001/system/airlineList");
    const data = await res.json();
    setAirlines(data.Data);
  };
  useEffect(() => {
    getAirlines();
  }, []);
  const editAirline = (id) => {
    Swal.fire({
      title: "Edit Airline",
      html: `<div class="">You are editing airline ID 
                <span class="text-red-500 font-bold">${id}</span>
              </div>
            <div class="flex items-center justify-center">
              <label htmlFor="Name" class="w-24 block">Name</label>
              <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="Name" value="${
                airlines.find((a) => a.AirlineID === id).Name
              }">
            </div>
            <div class="flex items-center justify-center">
              <label htmlFor="link" class="w-24 block">Link</label>
              <input id="swal-input2" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="Link" value="${
                airlines.find((a) => a.AirlineID === id).Link
              }">
            </div>`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Confirm",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      focusConfirm: false,
      // Todo - validate name input , alphabet and . only and maximum 40 characters
      preConfirm: () => {
        const name = document.getElementById("swal-input1").value;
        const link = document.getElementById("swal-input2").value;
        if (!name) {
          Swal.showValidationMessage("Please enter a name");
        }
        if (!link) {
          Swal.showValidationMessage("Please enter a link");
        }
        return { Name: name, Link: link };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("http://localhost:3001/system/editAirline", {
          id: id,
          Name: result.value.Name,
          Link: result.value.Link,
        }).then((res, err) => {
          if (err)
            Swal.fire({
              title: "Error!",
              text: err,
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          else {
            Swal.fire({
              title: "Success!",
              text: res.data.Status,
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
              showConfirmButton: true,
            });
            getAirlines();
          }
        });
      }
    });
  };
  const deleteAirline = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      html: `You are deleting airline ID ${id}, <span class="font-semibold text-red-500">${
        airlines.find((a) => a.AirlineID === id).Name
      }</span>
      <div class="py-1 bg-red-100 text-red-700 w-full rounded">This will be very <span class="font-semibold">harmful</span>  to the client side website! <br>This action cannot be undone !</div>`,
      showValidationMessage: "no",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed)
        Axios.post("http://localhost:3001/system/deleteAirline", {
          id: id,
        }).then((res, err) => {
          if (err)
            Swal.fire({
              title: "Error!",
              text: err,
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          if (res.data.Status)
            Swal.fire({
              title: "Success!",
              text: res.data.Status,
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
              showConfirmButton: true,
            });
          else if (res.data.Error)
            Swal.fire({
              title: "Error!",
              text: res.data.Error,
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          getAirlines();
        });
    });
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
            <Th>Link</Th>
            <Th className="w-20">Delete</Th>
          </THead>
          <tbody>
            {airlines &&
              airlines.map((airline, i) => {
                return (
                  <tr key={i}>
                    <td
                      className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => editAirline(airline.AirlineID)}
                    >
                      <AiOutlineEdit className="mx-auto" />
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {airline.AirlineID ? airline.AirlineID : "-"}
                    </td>
                    <td className="whitespace-nowrap border px-3 py-2">
                      {airline.Name ? airline.Name : "-"}
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
                    <td
                      className="border p-2 text-center hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => deleteAirline(airline.AirlineID)}
                    >
                      <RiDeleteBin6Line className="mx-auto" />
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
