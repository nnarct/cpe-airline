import Axios from "axios";
import { TbPointFilled } from "react-icons/tb";
import { Seat } from "./seat";
import { useEffect, useState } from "react";


export const Seatselect = ({ params }) => {
  const [availableDepartureSeat, setAvailableDepartureSeat] = useState([]);
  const [availableReturnSeat, setAvailableReturnSeat] = useState([]);
  const [bookedDepartureSeat, setBookedDepartureSeat] = useState([]);
  const [bookedReturnSeat, setBookedReturnSeat] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3001/getAvailableSeat", {
      isReturn: params.get("isReturn"),
      departureFlightID: params.get("departureFlightID"),
      returnFlightID: params.get("returnFlightID"),
      class: params.get("class"),
    }).then((res, err) => {
      if (err) console.log(err);
      if (res.data.Status === "Success") {
        setAvailableDepartureSeat(res.data.availableDepartureSeat);
        setBookedDepartureSeat(res.data.bookedDepartureSeat);

        if (params.get("isReturn") === 1) {
          setAvailableReturnSeat(res.data.ReturnSeat);
          setBookedReturnSeat(res.data.bookedReturnSeat);
        }
      } else console.log(res.data.Error);
    });
    
  }, []);

  const combinedSeats = [...availableDepartureSeat].map((seat) => {
    return {
      ...seat,
      isBooked: bookedDepartureSeat.some(
        (bookedSeat) => bookedSeat.SeatID === seat.SeatID
      ),
    };
  });
  const rows = combinedSeats.reduce((acc, seat) => {
    if (seat.SeatCode.includes("A")) {
      acc.push([seat]);
    } else {
      const lastRow = acc[acc.length - 1];
      lastRow.push(seat);
    }
    return acc;
  }, []);

  return (
    <>
      <div className="w-full max-w-1000 mx-auto py-5 px-2 flex space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3 flex-col-reverse sm:flex-row">
        <div className="w-full bg-white border border-primary/40 rounded-md py-3 px-5">
          <h1 className="text-2xl  bg-white font-bold text-primary border-b border-primary/20 mb-1 pb-1">
            Seat Number
          </h1>
          <div className="flex">
            <p className="flex items-center text-m">
              <TbPointFilled color="orange" size="2.5em" border="solid black" />
              avaliable
            </p>
            <p className="flex items-center text-m">
              <TbPointFilled color="gray" size="2.5em" />
              not avaliable
            </p>
          </div>
          {rows.map((row, index) => {
            return (
              <div className="grid grid-cols-13 gap-4 my-4" key={index}>
                {row.map((seat, seatIndex) => {
                  return <Seat key={seatIndex} seat={seat} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
