import Axios from "axios";
import { TbPointFilled } from "react-icons/tb";
import { Seat, checkUniqueData } from "./seat";
import { BsArrowRightShort } from "react-icons/bs";
import { useEffect, useState } from "react";
import moment from "moment";
export const SeatSelect = ({
  params,
  depSeats,
  setDepSeats,
  retSeats,
  setRetSeats,
  flightData,
  dep,
  ret,
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
        if (params.get("isReturn") === "1" || params.get("isReturn") === 1) {
          setAvailableReturnSeat(res.data.availableReturnSeat);
          setBookedReturnSeat(res.data.bookedReturnSeat);
        }
      }
    });
  }, []);

  const rowsDep = [...availableDepartureSeat]
    .map((seat) => {
      return {
        ...seat,
        isBooked: bookedDepartureSeat.some(
          (bookedSeat) => bookedSeat.SeatID === seat.SeatID
        ),
      };
    })
    .reduce((acc, seat) => {
      if (seat.SeatCode.includes("A")) {
        acc.push([seat]);
      } else {
        const lastRow = acc[acc.length - 1];
        lastRow.push(seat);
      }
      return acc;
    }, []);
  const rowsRet = [...availableReturnSeat]
    .map((seat) => {
      return {
        ...seat,
        isBooked: bookedReturnSeat.some(
          (bookedSeat) => bookedSeat.SeatID === seat.SeatID
        ),
      };
    })
    .reduce((acc, seat) => {
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
  const getCode = (seatId, arr) => {
    console.log(arr);
    return arr.find((seat) => seat.SeatID === seatId)?.SeatCode;
  };
  return (
    <>
      <div className="w-full max-w-1000 mx-auto py-5 px-2 flex space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3 flex-col-reverse sm:flex-row">
        <div className="w-full bg-white border border-primary/40 rounded-md py-3 px-5">
          <div className="border-b border-primary/20 mb-1 pb-1 flex ">
            <h1 className="text-2xl font-bold text-primary ">Seat Number</h1>
            {flightData.isReturn ? (
              <>
                <div
                  className={`cursor-pointer text-xs ml-4 w-36 text-center justify-center text-gray-600 flex items-center hover:bg-slate-100 cursor-pointer flex flex-col py-1 ${
                    select === 0 && "bg-slate-100"
                  }`}
                  onClick={() => setSelect(0)}
                >
                  <span>{moment(dep.DepartureTime).format("DD MMM YYYY")}</span>
                  <span className="flex items-center">
                    {dep.OriIATA} <BsArrowRightShort /> {dep.DesIATA}
                  </span>
                </div>
                <div
                  className={`cursor-pointer border-l w-36 text-xs text-center text-gray-600 flex justify-center items-center hover:bg-slate-100 cursor-pointer flex flex-col py-1 ${
                    select === 1 && "bg-slate-100"
                  }`}
                  onClick={() => setSelect(1)}
                >
                  <span>{moment(ret.DepartureTime).format("DD MMM YYYY")}</span>
                  <span className="flex items-center">
                    {ret.OriIATA} <BsArrowRightShort /> {ret.DesIATA}
                  </span>
                </div>
              </>
            ) : null}
          </div>
          <div className="flex">
            {depSeats.map((seat, index) => {
              return (
                <div
                  onClick={() => setId(index)}
                  className={`flex m-1 cursor-pointer hover:ring border rounded ${
                    id === index
                      ? "bg-gray-50 border-gray-600 ring ring-gray-400/40"
                      : ""
                  }`}
                >
                  <span
                    className={`p-2 rounded-l border-r ${
                      id === index ? "border-gray-600" : ""
                    }`}
                  >
                    Passenger {index + 1}
                  </span>
                  <span className="p-2 rounded-r font-semibold">
                    {select === 0
                      ? getCode(depSeats[index], availableDepartureSeat) || "-"
                      : getCode(retSeats[index], availableReturnSeat) || "-"}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex">
            <p className="flex items-center text-m">
              <TbPointFilled color="lime" size="2.5em" border="solid black" />
              Premium Economy
            </p>
            <p className="flex items-center text-m">
              <TbPointFilled
                color="#6495ED"
                size="2.5em"
                border="solid black"
              />
              Economy
            </p>
            <p className="flex items-center text-m">
              <TbPointFilled color="red" size="2.5em" />
              Selected
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
                    return (
                      <Seat
                        id={id}
                        key={seatIndex}
                        seat={seat}
                        seatID={depSeats}
                        setSeatID={setDepSeats}
                      />
                    );
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
                    return (
                      <Seat
                        id={id}
                        key={seatIndex}
                        seat={seat}
                        seatID={retSeats}
                        setSeatID={setRetSeats}
                      />
                    );
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
