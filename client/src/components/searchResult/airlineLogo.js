import AirAsia from "../../assets/airlinesLogo/airAsia.png";
import ThaiLionair from "../../assets/airlinesLogo/thaiLionair.png";
import ThaiAirways from "../../assets/airlinesLogo/thaiAirways.png";
import NokAir from "../../assets/airlinesLogo/nokAir.png";
import ThaiSmile from "../../assets/airlinesLogo/thaiSmile.png";
import BangkokAirways from "../../assets/airlinesLogo/bangkokAirways.png";
import VietjetAir from "../../assets/airlinesLogo/vietjetAir.png";

export const airlineLogo = (id) => {
  if (Number(id) === 1) return BangkokAirways;
  if (Number(id) === 2) return NokAir;
  if (Number(id) === 3) return AirAsia;
  if (Number(id) === 4) return ThaiAirways;
  if (Number(id) === 5) return ThaiLionair;
  if (Number(id) === 6) return ThaiSmile;
  if (Number(id) === 7) return VietjetAir;
  return null;
};

export const airlineName = (id) => {
  if (Number(id) === 1) return "Bangkok Airways";
  if (Number(id) === 2) return "Nok Air";
  if (Number(id) === 3) return "Air Asia";
  if (Number(id) === 4) return "Thai Airways";
  if (Number(id) === 5) return "Thai Lion Air";
  if (Number(id) === 6) return "Thai Smile";
  if (Number(id) === 7) return "Vietjet Air";
  return "-";
};
