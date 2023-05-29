import Axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../../navbar";

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
          confirmButtonText: "Close",
        }).then((res) => {
          navigate("/");
          return;
        });

      if (res.data.Status && res.data.Status === "You are not authenticated")
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: "Please Log in first.",
          confirmButtonText: "Login",
        }).then((result) => {
          if (result.isConfirmed) navigate("/login");
          return;
        });

      if (res.data.Error && res.data.Error === "Token is not ok")
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please login again",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        }).then((result) => {
          navigate("/");
          return;
        });

      if (res.data.Status && res.data.Status === "Success") {
        const value = {
          user: res.data.UserID,
          id: id,
        };
        Axios.post("http://localhost:3001/getInvoice", value).then(
          (response, error) => {
            if (error) console.log(error);
            if (response.data.Error) {
              Swal.fire({
                icon: "error",
                title: "Sorry",
                text: response.data.Error,
                timer: 3000,
                timerProgressBar: true,
                confirmButtonText: "back to homepage",
              }).then((res) => navigate("/"));
            }
            if (response.data.Status === "Success")
              setInvoice(response.data.Invoice);
          }
        );
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-blue-150 w-screen flex justify-center">
        <div className="min-h-calc bg-white container lg:max-w-1000 border-l border-r">
          <h2 className="p-3 text-primary text-7xl flex flex-col justify-center">
            Thanks for booking with us!
          </h2>

          {invoice?.map((invoice, i) => {
            return (
              <div
                className="flex m-3 shadow rounded-xl "
                key={invoice.InvoiceID}
              >
                <div className="rounded-l-xl p-4  w-120 h-120 bg-gradient-to-br from-cyan-200  to-blue-200">
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
                      <p className="text-2xl font-bold">{invoice.Total} ฿</p>
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
                    </div>
                    <div className="text-xl pb-2 mb-2 border-b fond-bold">
                      <div className="flex items-center space-x-2">
                        <BsTelephoneForward />
                        <span>Tel: </span>
                      </div>
                      <p className="text-2xl font-bold">{invoice.tel}</p>
                    </div>
                    <div className="text-xl pb-2 mb-2 border-b fond-bold">
                      <div className="flex items-center space-x-2">
                        <MdOutlineAttachEmail />
                        <span>Email: </span>
                      </div>
                      <p className="text-2xl font-bold">{invoice.email}</p>
                    </div>
                    <div className="text-xl pb-2 mb-2 border-b fond-bold">
                      <div className="flex items-center space-x-2">
                        <BsCalendar3 />
                        <span>Date: </span>
                      </div>
                      <p className="text-2xl font-bold">
                        {moment(invoice.Date).format("DD MMM YYYY HH:MM")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-r-xl text-primary bg-gradient-to-tr from-sky-400 to-purple-100 w-full">
                  <div className="content">
                    <div className="m-6 header flex flex-col items-end">
                      <img alt="" src={LogoFly} className="h-[50px]" />
                      <div className="text-2xl font-bold">
                        <h4>InvoiceID 42</h4>
                      </div>
                    </div>
                    <div className="m-8 text-4xl font-bold">
                      <h3>{invoice.Airline}</h3>
                    </div>
                    <div className="m-8 flex text-2xl font-semibold justify-between">
                      <h3>{invoice.From}</h3>
                      <h3> {invoice.To}</h3>
                    </div>
                    <div className="px-4 py-5 flex-auto">
                      <table className="text-right w-full mb-4 text-blueGray-800 border-collapse">
                        <thead className="bg-blueGray-800">
                          <tr className="text-right uppercase font-bold text-2xl border-t border-primary">
                            <th className="p-3">FARE DETAILS</th>
                            <th className="p-3">PASSENGER(S)</th>
                            <th className="p-3">FARE</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="py-4 text-xl font-semibold border-t border-primary">
                            <td className="p-3">{invoice.Class}</td>
                            <td className="p-3">1</td>
                            <td className="p-3">{invoice.Total}</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr className="mt-4 pt-8 border-y border-primary">
                            <td className="p-3 pt-8">
                              <p className="text-3xl font-bold ">
                                TOTAL AMOUNT
                              </p>
                            </td>
                            <td></td>
                            <td className="p-3">
                              <p className="whitespace-nowrap text-3xl text-right font-bold pt-8">
                                {invoice.Total} ฿
                              </p>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
