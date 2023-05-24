import AirAsia from "../../assets/airlinesLogo/airAsia.png";
import ThaiLionair from "../../assets/airlinesLogo/thaiLionair.png";
import ThaiAirways from "../../assets/airlinesLogo/thaiAirways.png";
import NokAir from "../../assets/airlinesLogo/nokAir.png";
import ThaiSmile from "../../assets/airlinesLogo/thaiSmile.png";
import BangkokAirways from "../../assets/airlinesLogo/bangkokAirways.png";
import VietjetAir from "../../assets/airlinesLogo/vietjetAir.png";

export const airlineLogo = (name) => {
  if (name === "Bangkok Airways") return BangkokAirways;
  if (name === "Nok Air") return NokAir;
  if (name === "Thai AirAsia") return AirAsia;
  if (name === "Thai Airways") return ThaiAirways;
  if (name === "Thai Lion Air") return ThaiLionair;
  if (name === "Thai Smile") return ThaiSmile;
  if (name === "Thai Vietjet Air") return VietjetAir;
  return null;
};

const shortMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const formatDate = (date) => {
  const d = new Date(date);
  return d.getDate() + " " + shortMonth[d.getMonth()] + " " + d.getFullYear();
};

export const airportName = (airport, iata) => {
  if (airport !== "") {
    let name = airport.replace(" International", "");
    name = name.replace(" Airport", "");
    return name + " (" + iata + ")";
  }
};