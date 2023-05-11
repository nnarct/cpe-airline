import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

import { FaPlaneDeparture } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Card } from "../card";
import { DropHead } from "./components/drophead";

export const From = ({ airports, values, setValues }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  const ref = useDetectClickOutside({ onTriggered: closeDropdown });

  const toShortName = (id) => {
    if (airports) {
      const airport = airports.find((airport) => airport.AirportID === id);
      if (airport) {
        if (
          airport.Name === "Suvarnabhumi International Airport" ||
          airport.Name === "Don Mueang International Airport"
        )
          return "Bangkok";
        return airport.Name.replace(" Airport", "").replace(
          " International",
          ""
        );
      }
    } else {
      console.log("airports from database not found");
      return "";
    }
  };
  const toFullName = (id) => {
    if (airports) {
      const airport = airports.find((airport) => airport.AirportID === id);
      if (airport) return airport.Name;
    } else {
      console.log("airports from database not found");
      return "";
    }
  };
  const toIATA = (id) => {
    if (airports) {
      const airport = airports.find((airport) => airport.AirportID === id);
      if (airport) return airport.IATA;
    } else {
      console.log("airports from database not found");
      return "";
    }
  };

  return (
    <>
      <div
        ref={ref}
        className={`flex items-center justify-between w-full h-full px-3 ${
          isOpen ? "ring ring-blue-500/20 rounded-xl" : ""
        }`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <DropHead
          icon={<FaPlaneDeparture color="0D3E5E" size={20} />}
          title={`${toShortName(values.from)} (${toIATA(values.from)})`}
          subtitle={toFullName(values.from)}
        />
        {isOpen ? (
          <Card className="absolute left-0 top-20 z-20 h-auto flex flex-col justify-center ring ring-4 ring-gray-400/50">
            <ul className="w-11/12 h-72 overflow-y-auto my-2">
              {airports.map((airport, i) => {
                const name = airport.Name.replace(" Airport", "").replace(
                  "International",
                  ""
                );
                if (airport.AirportID !== values.to)
                  return (
                    <li
                      key={i}
                      className={`px-2 hover:bg-blue-100 ${
                        airport.AirportID === values.from ? "bg-blue-300" : ""
                      } transition duration-100 ease-in-out`}
                      onClick={() =>
                        setValues({ ...values, from: airport.AirportID })
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
