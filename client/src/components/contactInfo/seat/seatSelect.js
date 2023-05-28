import Axios from "axios";
import { TbPointFilled } from "react-icons/tb";
import { Seat, checkUniqueData } from "./seat";
import { useEffect, useState } from "react";

export const SeatSelect = ({
  params,
  depSeats,
  setDepSeats,
  retSeats,
  setRetSeats,
}) => {
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
        if (params.get("isReturn") === '1' || params.get("isReturn") === 1) {
          setAvailableReturnSeat(res.data.availableReturnSeat);
          setBookedReturnSeat(res.data.bookedReturnSeat);
        }
      } 
    });
  }, []);

  const combinedDepSeats = [...availableDepartureSeat].map((seat) => {
    return {
      ...seat,
      isBooked: bookedDepartureSeat.some(
        (bookedSeat) => bookedSeat.SeatID === seat.SeatID
      ),
    };
  });
  const rowsDep = combinedDepSeats.reduce((acc, seat) => {
    if (seat.SeatCode.includes("A")) {
      acc.push([seat]);
    } else {
      const lastRow = acc[acc.length - 1];
      lastRow.push(seat);
    }
    return acc;
  }, []);
  const combinedRetSeats = [...availableReturnSeat].map((seat) => {
    return {
      ...seat,
      isBooked: bookedReturnSeat.some(
        (bookedSeat) => bookedSeat.SeatID === seat.SeatID
      ),
    }
  }) ;
  const rowsRet = combinedRetSeats.reduce((acc, seat) => {
    if (seat.SeatCode.includes("A")) {
      acc.push([seat]);
    } else {
      const lastRow = acc[acc.length - 1];
      lastRow.push(seat);
    }
    return acc;
  }, []);
  const [id, setId] = useState(0);
  const [select, setSelect] = useState(0);
  return (
    <>
      <div className="w-full max-w-1000 mx-auto py-5 px-2 flex space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3 flex-col-reverse sm:flex-row">
        <div className="w-full bg-white border border-primary/40 rounded-md py-3 px-5">
          <h1 className="text-2xl  bg-white font-bold text-primary border-b border-primary/20 mb-1 pb-1">
            Seat Number
          </h1>
        {depSeats.map((seat, index) => {
          return (<div onClick={() => setId(index)} className="bg-pink-100 w-fit m-1 border p-2 cursor-pointer hover:bg-pink-300">Passenger {index+1}</div>)
        })}
          <button onClick={() =>  setSelect(0)} className="border p-2 cursor-pointer rounded hover:bg-blue-300 bg-blue-100 m-1">
            Departure
          </button>
          <button onClick={() =>  setSelect(1)} className="border p-2 cursor-pointer rounded hover:bg-blue-300 bg-blue-100 m-1">
            Return
          </button>
          <div className="flex">
            <p className="flex items-center text-m">
              <TbPointFilled color="lime" size="2.5em" border="solid black" />
              available
            </p>
            <p className="flex items-center text-m">
              <TbPointFilled color="gray" size="2.5em" />
              not available
            </p>
          </div>
          <span className={select === 0 ? "block" : "hidden"}>
            {rowsDep.map((row, index) => {
              return (
                <div className="grid grid-cols-13 gap-4 my-4" key={index}>
                  {row.map((seat, seatIndex) => {
                    return <Seat id={id} key={seatIndex} seat={seat} seatID={depSeats} setSeatID={setDepSeats}/>;
                  })}
                </div>
              );
            })}
          </span>
          <span className={select === 1 ? "block" : "hidden"}>
            {rowsRet.map((row, index) => {
              return (
                <div className="grid grid-cols-13 gap-4 my-4" key={index}>
                  {row.map((seat, seatIndex) => {
                    return <Seat id={id} key={seatIndex} seat={seat} seatID={retSeats} setSeatID={setRetSeats}/>;
                  })}
                </div>
              );
            })}
          </span>
        </div>
      </div>
    </>
  );
};
