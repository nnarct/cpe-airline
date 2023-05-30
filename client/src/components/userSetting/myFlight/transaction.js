import { Item } from "./item";
import { airlineLogo } from "../../searchResult/function";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import Axios from "axios";
import Swal from "sweetalert2";
export const Transaction = ({ flights, s }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const flight = params.get("flight");
  const [display, setDisplay] = useState(0);
  const currentPath = location.pathname + location.search.slice(0, 6);
  const navigate = useNavigate();
  const [flightInfo, setFlightInfo] = useState({});
  const [contactInfo, setContactInfo] = useState([]);
  const [weight, setWeight] = useState([]);

  useEffect(() => {
    if (flight === null) setDisplay(false);
    else {
      setDisplay(true);
      const t = flights.find((f) => f?.BookingID === Number(flight));
      setFlightInfo(t);
      Axios.post("http://localhost:3001/getBookingInfo", { id: flight }).then(
        (res, err) => {
          if (err) {
            console.log(err); // Todo -handle error
            setDisplay(false);
          } else if (res.data.Status === "Success") {
            setContactInfo(res.data.Info);
            Axios.post("http://localhost:3001/contact/getBase", {
              isReturn: 0,
              departureFlightID: t.FlightID,
              returnFlightID: null,
              class: res.data.Info[0].Class,
            }).then((res, err) => {
              if (err) {
                console.log(err); // Todo -handle error
                setDisplay(false);
              } else if (res.data.Status === "Success") {
                setWeight(res.data.Base.DepBase);
              } else console.log(res.data.Error);
            });
          } else console.log(res.data.Error);
        }
      );
    }
  }, [flight]);

  const handleCancel = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("http://localhost:3001/cancelBooking", {
          id: flight.BookingID,
        }).then((res, err) => {
          if (err) Swal.fire("Error!", "Something went wrong.", "error");
          else if (res.data.Status === "Cancel booking successfully! :)")
            Swal.fire(
              "Canceled!",
              "Your booking has been canceled.",
              "success"
            ).then(() => navigate(currentPath));
        });
        Swal.fire("Cancelled!", "Your flight has been canceled.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Ok!", "Your flight is safe :)");
      }
    });
  };

  const editBooking = (e) => {
  
    Swal.fire({
      title: "Edit Booking",
      html: `
      <div>You are editing booking
      <span class="font-bold">
      ${flightInfo?.BookingID}
      </span>
    </div>
  <div class="flex items-center justify-center py-1">
    <label htmlFor="fname" class="w-32 block">First Name</label>
    <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="First name" value="${contactInfo[0].ContactFirstname}">
  </div>
  <div class="flex items-center justify-center py-1">
    <label htmlFor="lname" class="w-32 block">Last
    Name</label>
    <input id="swal-input2" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="Last name" value="${contactInfo[0].ContactLastname}">
  </div>
  <div class="flex items-center justify-center py-1">
    <label htmlFor="State" class="w-32 block">Email</label>
    <input id="swal-input3" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="Email" value="${contactInfo[0].ContactEmail}">
  </div>
  <div class="flex items-center justify-center py-1">
    <label htmlFor="Phone" class="w-32 block">Phone</label>
    <input id="swal-input4" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="0994848848" value="${contactInfo[0].ContactPhone}">
    </div>`,
    }).then((result) => {
      if (result.isConfirmed) {
        const fname = document.getElementById("swal-input1").value;
        const lname = document.getElementById("swal-input2").value;
        const email = document.getElementById("swal-input3").value;
        const telno = document.getElementById("swal-input4").value;
        Axios.post("http://localhost:3001/editBooking", {
          id: flightInfo?.BookingID,
          fname: fname,
          lname: lname,
          email: email,
          telno: telno,
        }).then((res, err) => {
          Swal.fire("Edited!", "Your booking has been edited.", "success");
        });
      }
    });
  };
  const editPassenger = (i) => {
    console.log(i)
    Swal.fire({
      title: "Edit passenger",
      html: `
    <div>You are editing passenger id:
      <span class="font-bold">
      ${flightInfo?.BookingID}
      }</span>
        </div>
      <div class="flex items-center justify-center py-1">
        <label htmlFor="fname" class="w-24 block">First Name</label>
        <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="First name" value="${i.FirstName}">
      </div>
      <div class="flex items-center justify-center py-1">
        <label htmlFor="lname" class="w-24 block">Last
        Name</label>
        <input id="swal-input2" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="Last name" value="${i.LastName}">,
      </div>
     `,
     preConfirm: () => {
      return {fname: document.getElementById("swal-input1").value,
      lname: document.getElementById("swal-input2").value,
    id: i.PassengerID}}
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("http://localhost:3001/editPassenger", result.value).then((res, err) => {
          if (err) Swal.fire("Error!", "Something went wrong.", "error");
          else if (res.data.Status === "Success")
            Swal.fire(
              "Edited!",
              "Your passenger has been edited.",
              "success"
            ).then(() => navigate(currentPath));
        });
        Swal.fire("Edited!", "Your booking has been edited.", "warning");
      }
    });
  };
  return !display ? (
    <>
      <ul>
        <div className="mt-3">
          {flights?.map((flight, i) => {
            return (
              <Link
                key={flight?.FlightID}
                to={`${currentPath}&flight=${flight.BookingID}`}
              >
                <span className="max-w-1000 flex items-center mt-3 bg-white border border-gray-200 rounded-lg shadow hover:ring ring-gray-200">
                  <Item {...flight} />
                </span>
              </Link>
            );
          })}
        </div>
      </ul>
    </>
  ) : (
    <>
      <div
        onClick={() => navigate(currentPath)}
        className="bg-primary flex items-center justify-center text-white mt-2 w-16 h-10 text-xl rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-200"
      >
        BACK
      </div>
      <div className="bg-white container mt-2 border rounded-xl">
        <div className="text-center rounded-xl">
          <h2 className="text-3xl font-bold text-primary text-center pt-4">
            Upcoming Flight
          </h2>
          <img
            className="w-28 mx-auto"
            src={airlineLogo(flightInfo?.AirlineName)}
            alt=""
          />
          <div className="flex justify-center">
            <h1>BOOKING ID :</h1>
            <h1 className="ml-2">{flightInfo?.BookingID}</h1>
          </div>
        </div>
        <div className="flex justify-between px-8">
          <div>
            <h1 className="text-4xl  font-bold ">
              {flightInfo?.OriginAirport}
            </h1>
            <h1 className="text-l text-gray-600  ">
              {flightInfo?.NameOriginAirport}
            </h1>
            <h1 className="text-2xl  font-bold pt-3 pb-1 ">
              {moment(flightInfo?.DepartureTime).format("HH:mm")}
            </h1>
            <h1>{moment(flightInfo?.DepartureTime).format("DD MMM YY")}</h1>
          </div>

          <div className="flex flex-col justify-between px-8 text-end ">
            <h1 className="text-4xl  font-bold  ">
              {flightInfo?.DestinationAirport}
            </h1>
            <h1 className="text-l text-gray-600  ">
              {flightInfo?.NameDestinationAirport}
            </h1>
            <h1 className="text-2xl  font-bold   pt-3 pb-1 ">
              {moment(flightInfo?.ArrivalTime).format("HH:mm")}
            </h1>
            <h1>{moment(flightInfo?.ArrivalTime).format("DD MMM YY")}</h1>
          </div>
        </div>
        <div className="flex justify-between pt-2 pb-2 px-8 mt-3 border-t">
          <div className="text-xl">
            <h1 className=" text-gray-500">FLIGHT</h1>
            <h1 className=" font-bold ">{flightInfo?.FlightID}</h1>
          </div>
          <div className="text-xl">
            <h1 className="text-gray-500">CLASS</h1>
            <h1 className="font-bold ">{contactInfo[0]?.Class}</h1>
          </div>
          <div className="text-xl ">
            <h1 className="text-gray-500">BOOKING ID</h1>
            <h1 className="font-bold">{flightInfo?.BookingID}</h1>
          </div>
          <div className="text-xl">
            <h1 className="text-gray-500">PASSENGERS</h1>
            <h1 className="font-bold">2 ADULT</h1>
          </div>
        </div>
        <div className="pt-2 pb-2 px-8 mt-3 text-xl border-t">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-3xl text-primary mb-2">
              Contact Information
            </h1>
            {s === 1 && flightInfo?.Protection === 1 && (
              <button
                className="px-3 py-2 flex items-center bg-blue-500 text-white rounded hover:ring focus:bg-blue-600"
                onClick={e=>editBooking(e)}
              >
                Edit
              </button>
            )}
          </div>

          <div>
            <h1 className="text-gray-500">Name</h1>
            <h1 className="text-2xl">
              {contactInfo[0]?.ContactFirstname}{" "}
              {contactInfo[0]?.ContactLastname}
            </h1>
          </div>
          <div className="grid gap-6 grid-cols-3 mt-2">
            <div>
              <h1 className="text-gray-500">Phone</h1>
              <h1 className="text-2xl">{contactInfo[0]?.ContactPhone}</h1>
            </div>
            <div>
              <h1 className="text-gray-500">Email</h1>
              <h1 className="text-2xl">{contactInfo[0]?.ContactEmail}</h1>
            </div>
          </div>
        </div>
        {/* Passenger info */}
        {contactInfo?.map((info, i) => {
          return (
            <div key={i} className="pt-2 pb-2 px-8 mt-3 text-xl mb-4">
              <div className="font-bold text-3xl border-t text-primary mt-4 flex items-center justify-between">
                <h1> Passenger {i + 1}</h1>
                {s === 1 && flightInfo?.Protection === 1 && (
                  <button
                    className="text-base px-3 py-2 flex items-center bg-blue-500 text-white rounded hover:ring focus:bg-blue-600"
                    onClick={()=>editPassenger(info)}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div>
                <h1 className="text-gray-500">Name</h1>
                <h1 className="text-2xl">
                  {info?.FirstName} {info?.LastName}
                </h1>
              </div>
              <div className="grid gap-6 grid-cols-3 mt-2">
                <div className="">
                  <h1 className="text-gray-500">Seat</h1>
                  <h1 className="text-2xl">{info?.SeatCode || "-"}</h1>
                </div>
                <div>
                  <h1 className="text-gray-500">Checked-In Bag</h1>
                  <h1 className="text-2xl">
                    {weight?.CheckedIn + info?.Weight} KG
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-500">Carry On Bag</h1>
                  <h1 className="text-2xl">{weight?.CarryOn} KG</h1>
                </div>
              </div>
            </div>
          );
        })}
        {s === 1 && (
          <div className="w-full p-4 flex justify-end items-center space-x-3">
            <button
              className="px-3 py-2 flex items-center bg-red-500 text-white rounded hover:ring ring-red-400/60 focus:bg-red-600"
              onClick={handleCancel}
            >
              Cancel Booking
            </button>
          </div>
        )}
      </div>
    </>
  );
};
