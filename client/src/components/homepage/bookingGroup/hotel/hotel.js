import Centara from "../../../../assets/hotelPartnerLogo/centaraHotel.png";
import Ibis from "../../../../assets/hotelPartnerLogo/ibisHotel.png";
import Novotel from "../../../../assets/hotelPartnerLogo/novotelHotelandresort.png";
import Sofitel from "../../../../assets/hotelPartnerLogo/sofitelHotelandresort.png";

const HotelPartner = ({ img, link }) => {
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

export const Hotel = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-[1600px] flex flex-col items-center">
        <div className="text-center tracking-wider pb-10 py-10 text-1xl font-semibold uppercase text-primary">
            Book a hotel room through our partners and enjoy your stay.
        </div>
          <div className="flex flex-row justify-center">
            <HotelPartner img={Centara} link="https://www.centarahotelsresorts.com/th" />
            <HotelPartner img={Ibis} link="https://all.accor.com/brands/ibis.th.shtml" />
            <HotelPartner img={Novotel} link="https://www.novotelbkk.com/th/" />
            <HotelPartner img={Sofitel} link="https://www.sofitelkrabiphokeethra.com/th/" />
          </div>
        </div>

        {/*
        <div className="flex flex-col items-center ">
          
        </div> */}
      </div>
    </>
  );
};
