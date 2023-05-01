import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

import { FaPlaneArrival } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Card } from "../card";

export const To = ({ airports, values, setValues }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  const ref = useDetectClickOutside({ onTriggered: closeDropdown });

  const toShortName = (id) => {
    const airport = airports.find((airport) => airport.AirportID === id);
    if (airport) {
      if (
        airport.Name === "Suvarnabhumi International Airport" ||
        airport.Name === "Don Mueang International Airport"
      )
        return "Bangkok";
      return airport.Name.replace(" Airport", "").replace(" International", "");
    }
  };
  const toFullName = (id) => {
    const airport = airports.find((airport) => airport.AirportID === id);
    if (airport) return airport.Name;
  };
  const toIATA = (id) => {
    const airport = airports.find((airport) => airport.AirportID === id);
    if (airport) return airport.IATA;
  };

  return (
    <>
      <div
        ref={ref}
        className="flex items-center justify-between w-full h-full px-3"
        onClick={() => {
          console.log(isOpen);
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex items-center text-primary">
          <span className="px-2">
            <FaPlaneArrival color="0D3E5E" size={20} />
          </span>
          <div className="flex flex-col pl-2">
            <h1 className="text-xl font-bold line-clamp-1">
              {toShortName(values.to)} ({toIATA(values.to)})
            </h1>
            <span className="text-xs line-clamp-1">
              {toFullName(values.to)}
            </span>
          </div>
        </div>
        <div className="px-2">
          <IoIosArrowDown color="0D3E5E" size={20} />
        </div>
        {isOpen ? (
          <Card className="absolute left-0 top-20 shadow h-auto flex flex-col justify-center">
            <ul className="w-11/12 h-72 overflow-y-auto my-2">
              {airports.map((airport, i) => {
                const name = airport.Name.replace(" Airport", "").replace(
                  "International",
                  ""
                );
                if (airport.AirportID !== values.from)
                  return (
                    <li
                      key={i}
                      className={`px-2 hover:bg-blue-100 ${airport.AirportID === values.to ? "bg-gray-300" : ""}`}
                      onClick={() =>
                        setValues({ ...values, to: airport.AirportID })
                      }
                    >
                      {name} ({airport.IATA})
                    </li>
                  );
                return null;
              })}
            </ul>
          </Card>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
