import Centara from "../../../../assets/hotelPartnerLogo/centaraHotel.png";
import Ibis from "../../../../assets/hotelPartnerLogo/ibisHotel.png";
import Novotel from "../../../../assets/hotelPartnerLogo/novotelHotelandresort.png";
import Sofitel from "../../../../assets/hotelPartnerLogo/sofitelHotelandresort.png";

const HotelPartner = ({ img, link }) => {
  return (
    <>
      <div className="p-2 sm:py-4 md:p-4">
        <a href={link} target="_blank" rel="noreferrer">
          <img alt="" src={img} className="object-contain h-8 md:h-14" />
        </a>
      </div>
    </>
  );
};

export const Hotel = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <div className="text-center tracking-wider pt-4 text-sm text-primary">
            Book a hotel room through our partners and enjoy your stay.
          </div>
          <div className="w-full flex flex-wrap flex-row items-center justify-center">
            <HotelPartner
              img={Centara}
              link="https://www.centarahotelsresorts.com/th"
            />

            <HotelPartner img={Novotel} link="https://www.novotelbkk.com/th/" />
            <HotelPartner
              img={Ibis}
              link="https://all.accor.com/brands/ibis.th.shtml"
            />
            <HotelPartner
              img={Sofitel}
              link="https://www.sofitelkrabiphokeethra.com/th/"
            />
          </div>
        </div>
      </div>
    </>
  );
};
