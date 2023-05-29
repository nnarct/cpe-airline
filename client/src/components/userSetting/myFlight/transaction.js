import { Item } from "./item";
import { airlineLogo } from "../../searchResult/function";
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { BsFillLightbulbFill } from "react-icons/bs";
import moment from "moment/moment";
import Axios from "axios";

export const Transaction = ({ flights }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const flight = params.get('flight');
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
      const t = flights.find(f => f?.BookingID === Number(flight));
      
      
      
      // console.log(t)
      setFlightInfo(t);
      Axios.post('http://localhost:3001/getBookingInfo', { id: flight }).then((res, err) => {
        if (err) {
          console.log(err); // Todo -handle error
          setDisplay(false);
        } else if (res.data.Status === 'Success') {
          setContactInfo(res.data.Info)
          console.log(res.data.Info)
          Axios.post('http://localhost:3001/contact/getBase', {
            isReturn: 0,
            departureFlightID: t.FlightID,
            returnFlightID: null,
            class: res.data.Info[0].Class,
          }).then((res, err) => {
            if (err) {
              console.log(err); // Todo -handle error
              setDisplay(false);
            } else if (res.data.Status === 'Success') {
              setWeight(res.data.Base.DepBase)
              console.log(res.data);
            } else console.log('here',res.data.Error);
          })
        } else console.log('h',res.data.Error);
      })
      

    
    };
  }, [flight])
  return (
    !display ? <>
      <ul>
        <div className="mt-3">
          {flights?.map((flight, i) => {
            return (
              <Link
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
    </> : <>
      <div onClick={() => navigate(currentPath)}
        className="bg-primary flex items-center justify-center text-white mt-2 w-16 h-10 text-xl rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-200"
      > BACK
      </div>
      <div className="min-h-calc bg-white container mt-2 border rounded-xl">
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
            <h1>
              BOOKING ID :
            </h1>
            <h1 className="ml-2">
              {flightInfo?.BookingID}
            </h1>
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
            <h1>
              {moment(flightInfo?.DepartureTime).format("DD MMM YY")}
            </h1>

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
            <h1>
              {moment(flightInfo?.ArrivalTime).format("DD MMM YY")}
            </h1>


          </div>
        </div>
        <h1 className="border-b w-full mt-4">
        </h1>

        <div className="flex justify-between pt-2 pb-2 px-8 mt-3 ">
          <div className="">
            <h1 className="text-xl text-gray-500">
              FLIGHT
            </h1>
            <h1 className="text-xl font-bold ">
              {flightInfo?.FlightID}
            </h1>
          </div>
          <div>
            <h1 className="text-xl text-gray-500">
              CLASS
            </h1>
            <h1 className="text-xl font-bold ">
              {contactInfo[0]?.Class}
            </h1>
          </div>
          <div className="text-xl ">
            <h1 className="text-gray-500">
              BOOKING ID
            </h1>
            <h1 className="font-bold">
              {flightInfo?.BookingID}
            </h1>
          </div>
          <div>
            <h1 className="text-xl text-gray-500">
              PASSENGERS
            </h1>
            <h1 className="text-xl font-bold">
              2 ADULT
            </h1>
          </div>
        </div>
        <h1 className="border-b w-full mt-4" />
        <div className="pt-2 pb-2 px-8 mt-3 text-xl">
          <h1 className="font-bold text-3xl text-primary mb-2">
            Contact Information
          </h1>
          <div >
            <h1 className="text-gray-500">
              Name
            </h1>
            <h1 className="text-2xl">
              {contactInfo[0]?.ContactFirstname} {contactInfo[0]?.ContactLastname}
            </h1>
          </div>
          <div className="grid gap-6 grid-cols-3 mt-2">
            <div >
              <h1 className="text-gray-500">
                Phone
              </h1>
              <h1 className="text-2xl">
                {contactInfo[0]?.ContactPhone}
              </h1>
            </div>
            <div >
              <h1 className="text-gray-500">
                Email
              </h1>
              <h1 className="text-2xl">
                {contactInfo[0]?.ContactEmail}
              </h1>
            </div>
          </div>

        </div>

        {/* <h1 className="border-b w-full mt-4"/> */}
        {/* Passenger info */}
        {contactInfo && contactInfo.map((info, i) => {
          return (
            <div key={i} className="pt-2 pb-2 px-8 mt-3 text-xl mb-4">
              <h1 className="border-b w-full mt-4" />
              <div className="font-bold text-3xl text-primary mt-4">
                Passenger {i + 1}
              </div>
              <div >
                <h1 className="text-gray-500">
                  Name
                </h1>
                <h1 className="text-2xl">
                  {info?.FirstName} {info?.LastName}
                </h1>
              </div>
              <div className="grid gap-6 grid-cols-3 mt-2">
                <div className="">
                  <h1 className="text-gray-500">
                    Seat
                  </h1>
                  <h1 className="text-2xl">
                    {info?.SeatCode || "-"}
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-500">
                    Checked-In Bag
                  </h1>
                  <h1 className="text-2xl">
                    { weight?.CheckedIn  + info?.Weight}  KG
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-500">
                    Carry On Bag
                  </h1>
                  <h1 className="text-2xl">
                    { weight?.CarryOn } KG
                  </h1>
                </div>
              </div>

            </div>

          );
        })}





      </div></>




  );
};
