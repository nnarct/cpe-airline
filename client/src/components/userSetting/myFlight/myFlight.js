import Axios from 'axios';
import { useEffect,useState } from "react";
import { Transaction } from "./transaction";
import { Menu } from "./menu";

export const MyFlight = () => {
  const [Bookings, setBookings] = useState([]);
 
  useEffect(() => {
    Axios.post("http://localhost:3001/getUserBooking").then((res, err) => {
        if(err) 
          console.log(err);
        else if(res.data.Error) 
          console.log(res.data.Error);
        else if(res.data.Status) 
          setBookings(res.data.Data);
      })
  }, []);

  // initialize the state to show the upcoming flights section by default
  const [selectedSection, setSelectedSection] = useState("Upcoming Flights");

  const filteredUpcomingFlights = Bookings.filter((b) => {
    if(new Date(b.DepartureTime) < new Date()) 
      return false;
    return true;
  });

  const filteredDepartedFlights = Bookings.filter((b) => {
    if(new Date(b.DepartureTime) > new Date())
      return false;
    return true;
  });

  const filteredCanceledFlights = Bookings.filter((b) => {

  });

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="container max-w-1000 mx-2">
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

          {selectedSection === "Upcoming Flights" && <Transaction flights={filteredUpcomingFlights}/>}
          {selectedSection === "Departed Flights" && <Transaction flights={filteredDepartedFlights}/>}
          {selectedSection === "Canceled Flights" && <Transaction flights={filteredCanceledFlights}/>}
        </div>
      </div>
    </>
  );
};
