import { airlineImg } from "./import";
import { useEffect, useState } from "react";
import Axios from "axios";
export const AirlinesPartner = () => {
  const [airlines, setAirlines] = useState([
   
  ]);
  useEffect(() => {
    const getAirlines = async () => {
      let data = "";
      fetch("http://localhost:3001/admin/airlineList").then( res => {data = res.json(); setAirlines(data.Data);})
      
      // setAirlines(data.Data);
    };
    getAirlines();
  }, []);
  return (
    <div className="flex justify-evenly flex-wrap items-center px-2 ">
      {console.log(airlines)}
      {airlines[0].Link &&
        airlineImg.map((e, i) => {
          return (
            <a
              href={airlines[i].Link}
              target="_blank"
              rel="noreferrer"
              className="hover:shadow-md"
              key={i}
            >
              <img src={e} alt="" className="w-1/6" />
            </a>
          );
        })}
    </div>
  );
};
