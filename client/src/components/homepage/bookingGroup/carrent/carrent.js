import Avisrental from "../../../../assets/carPartnerLogo/avisRental.png";
import Kayakrental from "../../../../assets/carPartnerLogo/kayakRental.png";
import Klookrental from "../../../../assets/carPartnerLogo/klookRental.png";
import Rentalcarbangkok from "../../../../assets/carPartnerLogo/rentalCarbangkok.png";

const CarPartner = ({ img, link }) => {
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

export const Carrent = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-[1600px] flex flex-col items-center">
        <div className="text-center tracking-wider pb-10 py-10 text-1xl font-semibold uppercase text-primary">
            Rent a car through our partners and enjoy your travelling.
        </div>
          <div className="flex flex-row justify-center">
            <CarPartner img={Avisrental} link="https://www.avis.com/en/locations/th/bangkok" />
            <CarPartner img={Kayakrental} link="https://www.kayak.com/Cheap-Bangkok-Car-Rentals.26166.cars.ksp" />
            <CarPartner img={Klookrental} link="https://www.novotelbkk.com/th/" />
            <CarPartner img={Rentalcarbangkok} link="https://www.klook.com/car-rentals/city/4-bangkok-car-rentals/" />
          </div>
        </div>

        {/*
        <div className="flex flex-col items-center ">
          
        </div> */}
      </div>
    </>
  );
};

