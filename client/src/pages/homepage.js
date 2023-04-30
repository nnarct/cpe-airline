import { BookingGroup } from "../components/homepage/bookingGroup/bookingGroup";
import Hero from "../components/homepage/hero/hero";
import { Navbar } from "../components/navbar";
export const Homepage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <BookingGroup />
    </>
  );
};
