import { useEffect, useState } from "react";
import { Type } from "./type";
import { Card } from "./card";
import { From } from "./dropdowns/from";
import { To } from "./dropdowns/to";
import { DatePick } from "./dropdowns/datepicker";

export const Flight = () => {
  const [isReturn, setIsReturn] = useState(1);
  const today = new Date();
  const [values, setValues] = useState({
    from: 1,
    to: 3,
    date: {
      departure: null,
      return: null,
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
      setAirports(data.Data);
    };
    getAirports();
  }, []);

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
          <Card>passenger</Card>
          <Card>class</Card>
          <div className={`w-full h-20 flex items-center bg-white  rounded-xl active:ring cursor-pointer sm:col-span-2`}>
            <DatePick
              values={values}
              setValues={setValues}
              isReturn={isReturn}
            />
          </div>
          {/* {isReturn ? <Card>return</Card> : null} */}
        </div>
      </form>
    </>
  );
};
