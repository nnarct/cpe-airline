import { useEffect, useState } from "react";
import { Transaction } from "./transaction";
import { Menu } from "./menu";
import { getUserBookings } from "./functions";

export const MyFlight = () => {
  const [Bookings, setBookings] = useState([]);
  useEffect(() => {
    getUserBookings(setBookings);
  }, []);

  const [selectedSection, setSelectedSection] = useState("Upcoming Flights");
  const filteredUpcomingBookings = Bookings.filter((booking) => {
    return new Date(booking.DepartureTime) >= new Date() && booking.Status;
  });
  const filteredDepartedBookings = Bookings.filter((booking) => {
    return new Date(booking.DepartureTime) < new Date() && booking.Status;
  });
  const filteredCanceledBookings = Bookings.filter((booking) => {
    return !booking.Status;
  });

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="container max-w-1000 mx-2 pb-5">
          <div className="font-medium text-center text-gray-500 border-b border-gray-200">
            <ul className="flex flex-wrap">
              <Menu
                text={"Upcoming Flights"}
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <Menu
                text={"Departed Flights"}
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <Menu
                text={"Canceled Flights"}
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
            </ul>
          </div>

          {selectedSection === "Upcoming Flights" && (
            <Transaction bookings={filteredUpcomingBookings} s={1} />
          )}
          {selectedSection === "Departed Flights" && (
            <Transaction bookings={filteredDepartedBookings} s={0} />
          )}
          {selectedSection === "Canceled Flights" && (
            <Transaction bookings={filteredCanceledBookings} s={0} />
          )}
        </div>
      </div>
    </>
  );
};
