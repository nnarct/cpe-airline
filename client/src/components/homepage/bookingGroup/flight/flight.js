import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Type } from "./type";
import { Card } from "./card";
import { From } from "./dropdowns/from";
import { To } from "./dropdowns/to";
import { DatePick } from "./dropdowns/datepicker";
import { Passenger } from "./dropdowns/passenger";
import { useNavigate } from "react-router-dom";
import { Class } from "./dropdowns/class";

export const Flight = () => {
  const navigate = useNavigate();
  const [isReturn, setIsReturn] = useState(1);
  const [values, setValues] = useState({
    from: 1,
    to: 3,
    date: {
      startDate: null,
      endDate: null,
    },
    adult: 1,
    child: 0,
    infant: 0,
    class: "Economy",
  });

  const [airports, setAirports] = useState([]);
  useEffect(() => {
    const getAirports = async () => {
      const res = await fetch("http://localhost:3001/airportList");
      const data = await res.json();
      const err = data.Error;
      if (err) console.log(err);
      setAirports(data.Data);
    };
    getAirports();
  }, []);

  const handleSubmit = () => {
    if (values.date.startDate === null || values.date.endDate === null) {
      Swal.fire({
        title: "Oops!",
        text: "Please select date",
        icon: "info",
        confirmButtonText: "OK",
      });
      return;
    }
    if (values.from === values.to) {
      Swal.fire({
        title: "Oops!",
        text: "Please select different ORIGIN and DESTINATION airport",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    } 
    if (values.adult + values.child + values.infant > 9) {
      Swal.fire({
        title: "Oops!",
        text: "Maximum number of passengers is 9",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    const v = {
      from: values.from,
      to: values.to,
      departure: values.date.startDate,
      arrival: values.date.endDate,
      class: values.class,
    };
    navigate(
      "/search?from=" +
        v.from +
        "&to=" +
        v.to +
        "&departure=" +
        v.departure +
        "&arrival=" +
        v.arrival +
        "&adult=" +
        values.adult +
        "&child=" +
        values.child +
        "&infant=" +
        values.infant +
        "&class=" +
        values.class +
        "&isReturn=" +
        isReturn +
        ""
    );
  };
  return (
    <>
      <form action="">
        <Type isReturn={isReturn} setIsReturn={setIsReturn} />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 l:grid-cols-3 l:grid-rows-2 justify-center gap-4">
          <Card className="relative">
            <From airports={airports} values={values} setValues={setValues} />
          </Card>
          <Card className="relative">
            <To airports={airports} values={values} setValues={setValues} />
          </Card>
          <Card className="relative">
            <Passenger values={values} setValues={setValues} />
          </Card>
          <Card className="relative">
            <Class values={values} setValues={setValues} />
          </Card>
          <div
            className={`w-full h-20 flex items-center bg-white  rounded-xl active:ring cursor-pointer sm:col-span-2`}
          >
            <DatePick
              values={values}
              setValues={setValues}
              isReturn={isReturn}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 mt-4 w-full l:w-auto px-8 py-2 rounded-xl text-white hover:ring focus:bg-blue-400"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
};
