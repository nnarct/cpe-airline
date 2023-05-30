import moment from "moment";
import { useNavigate } from "react-router-dom";
import { airlineLogo } from "../../searchResult/function";
import { useEffect, useState } from "react";
import {
  cancelBooking,
  editBooking,
  editPassenger,
  getBooking,
} from "./functions";
import { IoIosArrowBack } from "react-icons/io";
export const OneBooking = ({
  s,
  currentPath,
  bookingID,
  setOpenOneBooking,
}) => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [base, setBase] = useState([]);
  useEffect(() => {
    getBooking(
      bookingID,
      setBooking,
      setPassengers,
      setOpenOneBooking,
      setBase
    );
  }, []);
  return (
    (
      <>
        <div
          onClick={() => navigate(currentPath)}
          className="w-fit flex items-center mt-2 pr-2 h-10 text-xl rounded-lg cursor-pointer text-gray-600 hover:bg-gray-300/80"
        >
          <IoIosArrowBack /> Back
        </div>
        <div className="bg-white container mt-2 border rounded-xl">
          <div className="text-center rounded-xl">
            <img
              className="w-28 mx-auto p-4"
              src={airlineLogo(booking?.AirlineName)}
              alt=""
            />
            <div className="flex justify-center">
              <span>BOOKING ID :</span>
              <span className="ml-2">{booking?.BookingID}</span>
            </div>
          </div>
          <div className="flex justify-between px-8">
            <ul className="list-none">
              <li className="text-4xl font-bold">{booking?.oriIATA}</li>
              <li className="text-l text-gray-600 ">{booking?.Origin}</li>
              <li className="text-2xl font-bold pt-3 pb-1">
                {moment(booking?.DepartureTime).format("HH:mm")}
              </li>
              <li>{moment(booking?.DepartureTime).format("DD MMM YY")}</li>
            </ul>

            <ul className="flex flex-col justify-between text-end">
              <li className="text-4xl font-bold">{booking?.desIATA}</li>
              <li className="text-l text-gray-600">{booking?.Destination}</li>
              <li className="text-2xl font-bold pt-3 pb-1 ">
                {moment(booking?.ArrivalTime).format("HH:mm")}
              </li>
              <li>{moment(booking?.ArrivalTime).format("DD MMM YY")}</li>
            </ul>
          </div>
          <div className="flex justify-between text-xl pt-2 pb-2 px-8 mt-3 border-t">
            <ul className="list-none">
              <li className=" text-gray-500">FLIGHT</li>
              <li className=" font-bold ">{booking?.FlightNumber}</li>
            </ul>
            <ul className="list-none">
              <li className="text-gray-500">CLASS</li>
              <li className="font-bold">{booking?.Class}</li>
            </ul>
            <ul className="list-none">
              <li className="text-gray-500">BOOKING ID</li>
              <li className="font-bold">{booking?.BookingID}</li>
            </ul>
            <ul className="list-none">
              <li className="text-gray-500">PASSENGERS</li>
              <li className="font-bold">{passengers?.length}</li>
            </ul>
          </div>
          <div className="pt-2 pb-2 px-8 mt-3 text-xl border-t">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-3xl text-primary mb-2">
                Contact Information
              </h1>
              {s===1 && booking.Status === 1 && booking?.Protection === 1 && (
                <div
                  className="cursor-pointer px-3 py-2 text-sm flex items-center bg-blue-500 text-white rounded hover:ring focus:bg-blue-600"
                  onClick={() =>
                    editBooking(
                      booking,
                      getBooking,
                      bookingID,
                      setBooking,
                      setPassengers,
                      setOpenOneBooking,
                      setBase
                    )
                  }
                >
                  Edit
                </div>
              )}
            </div>

            <div>
              <p className="text-gray-500 text-sm">Name</p>
              <div className="text-2xl flex space-x-4">
                <span>{booking?.ContactFirstname} </span>
                <span>{booking?.ContactLastname}</span>
              </div>
            </div>
            <div className="grid gap-6 grid-cols-3 mt-2">
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="text-2xl">{booking?.ContactPhone}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-2xl">{booking?.ContactEmail}</p>
              </div>
            </div>
          </div>
          {/* Passenger info */}
          {passengers?.map((passenger, i) => {
            return (
              <div key={i} className="pb-2 px-8 text-xl mb-4">
                <div className="font-bold text-3xl border-t text-primary mt-4 pt-3 flex items-center justify-between">
                  <h1>Passenger {i + 1}</h1>
                  {s === 1 && booking?.Protection === 1 && (
                    <div
                      className="cursor-pointer font-normal px-3 py-2 text-sm flex items-center bg-blue-500 text-white rounded hover:ring focus:bg-blue-600"
                      onClick={() => {
                        editPassenger(
                          passenger,
                          bookingID,
                          setBooking,
                          setPassengers,
                          setOpenOneBooking,
                          setBase
                        );
                      }}
                    >
                      Edit
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Name</p>
                  <p className="text-2xl">
                    {passenger?.FirstName} {passenger?.LastName}
                  </p>
                </div>
                <div className="grid gap-6 grid-cols-3 mt-2">
                  <div className="">
                    <p className="text-gray-500 text-sm">Seat</p>
                    <p className="text-2xl">{passenger?.SeatCode || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Checked-In Bag</p>
                    <p className="text-2xl">
                      {base?.DepBase?.CheckedIn + passenger?.Weight}{" "}
                      <span className="text-base text-gray-700">Kg.</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Carry On Bag</p>
                    <p className="text-2xl">
                      {base?.DepBase?.CarryOn || 0}{" "}
                      <span className="text-base text-gray-700">Kg.</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {s === 1 && booking.Protection === 1 && (
            <div className="w-full p-4 pt-0 flex justify-end items-center space-x-3">
              <div
                className="cursor-pointer px-3 py-2 flex items-center bg-red-500 text-white rounded hover:ring ring-red-400/60 focus:bg-red-600"
                onClick={() => {
                  cancelBooking(booking?.BookingID, currentPath, navigate);
                }}
              >
                Cancel Booking
              </div>
            </div>
          )}
        </div>
      </>
    )
  );
};
