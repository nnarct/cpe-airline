// import { SectionHeader } from "../../usual/text";
import AirAsia from "../../../assets/airlinesLogo/airAsia.png";
import ThaiLionair from "../../../assets/airlinesLogo/thaiLionair.png";
import ThaiAirways from "../../../assets/airlinesLogo/thaiAirways.png";
import NokAir from "../../../assets/airlinesLogo/nokAir.png";
import ThaiSmile from "../../../assets/airlinesLogo/thaiSmile.png";
import BangkokAirways from "../../../assets/airlinesLogo/bangkokAirways.png";
import VietjetAir from "../../../assets/airlinesLogo/vietjetAir.png";
const Airline = ({ img, link }) => {
  return (
    <>
      <div className="p-8">
        <a href={link} target="_blank" rel="noreferrer">
          <img alt="" src={img} className="object-contain h-40" />
        </a>
      </div>
    </>
  );
};

export const AirlinePartner = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-[1600px] flex flex-col items-center">
          <div className="text-center tracking-wider pb-5 text-4xl font-bold uppercase text-primary">
            Partners
          </div>
          <div className="flex flex-wrap justify-center">
            <Airline img={AirAsia} link="https://www.airasia.com" />
            <Airline img={ThaiLionair} link="https://www.lionairthai.com" />
            <Airline img={ThaiAirways} link="https://www.thaiairways.com" />
            <Airline img={NokAir} link="https://www.nokair.com/" />
            <Airline img={ThaiSmile} link="https://www.thaismileair.com" />
            <Airline img={BangkokAirways} link="https://www.bangkokair.com" />
            <Airline img={VietjetAir} link="https://www.vietjetair.com/" />
          </div>
        </div>
      </div>
    </>
  );
};
