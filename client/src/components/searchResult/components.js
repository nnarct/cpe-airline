import moment from "moment";
import { FaPlane } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import AirAsia from "../../assets/airlinesLogo/airAsia.png";
import ThaiLionair from "../../assets/airlinesLogo/thaiLionair.png";
import ThaiAirways from "../../assets/airlinesLogo/thaiAirways.png";
import NokAir from "../../assets/airlinesLogo/nokAir.png";
import ThaiSmile from "../../assets/airlinesLogo/thaiSmile.png";
import BangkokAirways from "../../assets/airlinesLogo/bangkokAirways.png";
import VietjetAir from "../../assets/airlinesLogo/vietjetAir.png";

const airlineLogo = (name) => {
  if (name === "Bangkok Airways") return BangkokAirways;
  if (name === "Nok Air") return NokAir;
  if (name === "Thai AirAsia") return AirAsia;
  if (name === "Thai Airways") return ThaiAirways;
  if (name === "Thai Lion Air") return ThaiLionair;
  if (name === "Thai Smile") return ThaiSmile;
  if (name === "Thai Vietjet Air") return VietjetAir;
  return null;
};

export const Logo = ({ airlineName, flight }) => {
  return (
    <>
      <div className="w-52 flex items-center py-3">
        <img
          className="object-cover w-16"
          src={airlineLogo(airlineName)}
          alt=""
        />
        <div className="pl-4 flex flex-col ext-lg ">
          <span className="font-semibold">{airlineName}</span>
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

export const Head = ({ from, to, departure }) => {
  return (
    <>
      <div className="container text-3xl py-4 px-3">
        Flight from
        <span className="text-cyan-600 font-semibold "> {from}</span> to{" "}
        <span className="text-cyan-600 font-semibold ">{to}</span> on{" "}
        <span className="px-1 bg-gray-200 rounded">{departure}</span>
      </div>
    </>
  );
};
