import { Item } from "./item";
const flights = [
  {
    Airline: "Thai Smile",
    BookingID: "5B4502",
    FlightID: "WE103",
    Date: "22 Feb 2023",
    DepartureTime: "09:30",
    OriginAirportID: "CNX",
    ArrivalTime: "10:35",
    DestinationAirportID: "BKK",
  },
  {
    Airline: "Nok Air",
    BookingID: "5C4503",
    FlightID: "WE103",
    Date: "26 Feb 2023",
    DepartureTime: "13:30",
    OriginAirportID: "BKK",
    ArrivalTime: "14:35",
    DestinationAirportID: "CNX",
  },
];
export const Transaction = () => {
  return (
    <ul>
      <div className="mt-3">
        {flights.map((flight, i) => {
          return (
            <a
              key={i}
              href="/"
              className="max-w-[1000px] flex items-center mt-3 bg-white border border-gray-200 rounded-lg shadow hover:ring ring-gray-200"
            >
              <Item {...flight} />
            </a>
          );
        })}
      </div>
    </ul>
  );
};
