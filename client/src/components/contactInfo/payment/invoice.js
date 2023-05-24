import Swal from "sweetalert2";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../../navbar";
import { Kong } from "./kong";

import { SlWallet } from "react-icons/sl";
import { MdFlight } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { BsTelephoneForward } from "react-icons/bs";
import { MdOutlineAttachEmail } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import LogoFly from "../../../assets/logo/logo-primary.png";


export const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const [invoice, setInvoice] = useState([]);
  useEffect(() => {
    const id = params.get("id");
    if (id === null) navigate("/");
    // Todo- verify userToken 
    Axios.get("http://localhost:3001/invoice/userauth").then((res, err) => {
      if (err) 
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err,
          timer: 4000,
          timerProgressBar: true,
          confirmButtonText: "Close"
        }).then(res => {
          navigate("/");
          return;
        })
      
      if (res.data.Status && res.data.Status === "You are not authenticated") 
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: "Please Log in first.",
          confirmButtonText: "Login"
        }).then(result => {
          if (result.isConfirmed)
            navigate("/login");
          return;
        })
      
      if (res.data.Error && res.data.Error === "Token is not ok") 
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please login again",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        }).then(result => {
          navigate("/");
          return;
        })
      
      if (res.data.Status && res.data.Status === "Success") {
        const value = {
          user: res.data.UserID,
          id: id
        }
        Axios.post("http://localhost:3001/getInvoice", value).then(
          (response, error) => {
            if (error)
              console.log(error);
            if (response.data.Error) {
              Swal.fire({
                icon: "error",
                title: "Sorry",
                text: response.data.Error,
                timer: 3000,
                timerProgressBar: true,
                confirmButtonText: "back to homepage"
              }).then(res => navigate("/"));
            }
            if (response.data.Status === "Success") 
              setInvoice(response.data.Invoice);
          }
        );
      }
    });
  }, []);

  // Todo - UI for invoice
  // Todo - validate only user of the invoice can see the invoice
  const [s, setS] = useState("woon");
  return (
    <>
      <Navbar />

      <div className="flex space-x-5 py-5">
        {" "}
        <div
          onClick={() => setS("woon")}
          className="mx-2 p-5 rounded hover:opacity-80 cursor-pointer bg-blue-900 text-white"
        >
          WOON
        </div>
        <div
          onClick={() => setS("kong")}
          className="mx-2 p-5 rounded hover:opacity-80 cursor-pointer bg-blue-900 text-white"
        >
          Kong
        </div>
      </div>

      <div className="bg-blue-200">
        <div className="min-h-calc container bg-white mx-auto border-l border-r">
          {" "}
          <h2 className="text-7xl text-black flex flex-col justify-center">
            Invoice
          </h2>
          {s === "woon" ? (
            <>
              {invoice &&
                invoice.map((invoice, i) => {
                  if (i === 0)
                    return (
                      <div className="Container flex mt-3" key={i}>
                        <div className="p-4 w-120 h-120 bg-gradient-to-r from-cyan-500 to-blue-500">
                          <div className="m-2 text-2xl fond-bold ">
                            <div className="text-xl fond-bold pb-2 mb-2 border-b">
                              <p className="text-2xl font-bold">
                                <span>{invoice.BillTo}</span>
                              </p>
                            </div>
                            <div className="text-xl pb-2 mb-2 border-b fond-bold">
                              <div className="flex items-center space-x-2">
                                <GiReceiveMoney />
                                <span>Total: </span>
                              </div>
                              <p className="text-2xl font-bold">
                                THB{invoice.Total}
                              </p>
                            </div>
                            <div className="text-xl fond-bold pb-2 mb-2 border-b">
                              <div className="flex items-center space-x-2">
                                <MdFlight /> <span>Flight Number: </span>
                              </div>
                              <p className="text-2xl font-bold">
                                {invoice.FlightNumber}
                              </p>
                            </div>
                            <div className="text-xl pb-2 mb-2 border-b fond-bold">
                              <div className="flex items-center space-x-2">
                                <SlWallet />
                                <span>Payment Method: </span>
                              </div>
                              <p className="text-2xl font-bold">
                                {invoice["payment method"]}
                              </p>
                              <span>Promptpay Number: </span>
                              <p className="text-2xl font-bold">
                                {invoice.PromptpayNumber}
                              </p>
                            </div>
                            <div className="text-xl pb-2 mb-2 border-b fond-bold">
                              <div className="flex items-center space-x-2">
                                <BsTelephoneForward />
                                <span>Tel: </span>
                              </div>
                              <p className="text-2xl font-bold">
                                {invoice.tel}
                              </p>
                            </div>
                            <div className="text-xl pb-2 mb-2 border-b fond-bold">
                              <div className="flex items-center space-x-2">
                                <MdOutlineAttachEmail /> 
                                <span>Email: </span>
                                </div>
                                <p className="text-2xl font-bold">
                                  {invoice.email}
                                </p>
                              </div>
                            <div className="text-xl pb-2 mb-2 border-b fond-bold">
                              <div className="flex items-center space-x-2">
                                <BsCalendar3 />
                                <span>Date: </span>
                              </div>
                              <p className="text-2xl font-bold">
                                {invoice.Date}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-sky-500 to-indigo w-full">
                          <div className="content">
                            <div className="m-6 header flex flex-col items-end">
                              <img alt="" src={LogoFly} className="h-[50px]" />
                              <div className="text-2xl font-bold">
                                <h4>InvoiceID 42</h4>
                              </div>
                            </div>
                            <div className="m-8 text-4xl font-bold">
                              <h3>NokAir</h3>
                            </div>
                            <div className="m-8 flex text-2xl font-semibold justify-between">
                              <h3>{invoice.From}</h3>
                              <h3> {invoice.To}</h3>
                            </div>
                            <div className="px-4 py-5 flex-auto">
                              <table className="text-right w-full mb-4 text-blueGray-800 border-collapse">
                                <thead className="bg-blueGray-800">
                                  <tr className="text-right uppercase">
                                    <th className="p-3 text-2xl border-t font-bold" scope="col">
                                      FARE DETAILS
                                    </th>
                                    <th className="p-3 text-2xl border-t font-bold" scope="col">
                                      PASSENGER(S)
                                    </th>
                                    <th className="p-3 text-2xl border-t font-bold" scope="col">
                                      FARE
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="py-4 p-3 text-xl font-semibold border-t">
                                      Economy
                                    </td>
                                    <td className="py-4 p-3 text-xl font-semibold border-t">1</td>
                                    <td className="py-4 p-3 text-xl font-semibold border-t">
                                      THB {invoice.Total}
                                    </td>
                                  </tr>
                                </tbody>
                                <tfoot>
                                  <tr className="mt-4 pt-8 border-b">
                                    <th className="border-b-0 p-3 pt-8 border-t">
                                      <p className="text-3xl font-bold ">
                                        TOTAL AMOUNT
                                      </p>
                                    </th>
                                    <th
                                      className="border-b-0 p-3 border-t"
                                      colSpan="3"
                                    >
                                      <p className="text-3xl text-right  font-bold pt-8">
                                        THB {invoice.Total}
                                      </p>
                                    </th>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  else return null;
                })}
            </>
          ) : (
            <Kong />
          )}
        </div>

      </div>
    </>
  );
};
