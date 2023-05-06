import Hero from "../components/homepage/hero/hero";
import { Navbar } from "../components/navbar";
import { AirlinePartner } from "../components/homepage/airlines/airlinePartner";
import { BookingGroup } from "../components/homepage/bookingGroup/bookingGroup";
import { Footer } from "../components/navbar/footer";

export const Homepage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <BookingGroup />
      <AirlinePartner />
      <Footer />
    </>
  );
};
