import { Carrent } from "./carrent/carrent";
import { Flight } from "./flight/flight";
import { Hotel } from "./hotel/hotel";
import { MenuChoice } from "./menuChoice";
import { FaPlane, FaHotel, FaCar } from "react-icons/fa";
export const MenuBar = ({ active, changeContent }) => {
  return (
    <>
      <div className="flex justify-between space-x-4">
        <MenuChoice
          text="Flight"
          content={<Flight />}
          index="0"
          icon={<FaPlane size={20} style={{ transform: "rotate(-45deg)" }} />}
          active={active}
          changeContent={changeContent}
        />
        <MenuChoice
          text="Hotel"
          content={<Hotel />}
          index="1"
          icon={<FaHotel size={20} />}
          active={active}
          changeContent={changeContent}
        />
        <MenuChoice
          text="Car Rent"
          content={<Carrent />}
          index="2"
          icon={<FaCar size={20} />}
          active={active}
          changeContent={changeContent}
        />
      </div>
    </>
  );
};
