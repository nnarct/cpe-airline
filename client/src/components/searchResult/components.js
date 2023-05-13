import moment from "moment";
import { FaPlane } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { airlineLogo, airlineName } from "./airlineLogo";

export const Logo = ({ id, flight }) => {
  return (
    <>
      <div className="w-52 flex items-center py-3">
        <img className="object-cover w-16" src={airlineLogo(id)} alt="" />
        <div className="pl-4 flex flex-col ext-lg ">
          <span className="font-semibold">{airlineName(id)}</span>
          <span className="font-bold">{flight}</span>
        </div>
      </div>
    </>
  );
};

export const TimeAndAirport = ({ time, iata, name, className }) => {
  return (
    <>
      <ul className={className}>
        <li className="font-bold text-2xl">{moment(time).format("HH:mm")}</li>
        <li>{iata}</li>
        <li>{name}</li>
      </ul>
    </>
  );
};

export const LineIcon = () => {
  return (
    <>
      <ul className="flex items-center">
        <li>
          <FaPlane />
        </li>
        <li className="h-px bg-primary mx-2 w-12 md:w-24 lg:w-56"></li>
        <li>
          <MdLocationOn />
        </li>
      </ul>
    </>
  );
};

export const Price = ({ price }) => {
  return (
    <>
      <li className="text-red-500 font-bold">
        <span className="text-sm">B</span>
        <span className="text-2xl">{price}</span>
      </li>
      <li className="text-xs">Price for one passenger</li>
    </>
  );
};