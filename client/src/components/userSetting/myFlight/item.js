import { TbPlaneInflight } from "react-icons/tb";
import ThaiSmile from "./../../../assets/airlinesLogo/thaiSmile.png";
export const Item = ({
  Airline,
  BookingID,
  FlightID,
  Date,
  DepartureTime,
  OriginAirportID,
  ArrivalTime,
  DestinationAirportID,
}) => {
  return (
    <>
      <div className="w-full p-5">
        <div className="w-full py-4 container flex justify-between">
          <div className="w-64 pr-2">
            <div className="h-14 flex items-center space-x-2">
              <img className="h-14 object-fit" src={ThaiSmile} alt="" />
              <h1 className="text-3xl text-gray-900 font-bold tracking-tight">
                {Airline}
              </h1>
            </div>

            <div className="py-4 mx-auto container flex justify-between">
              <ul>
                <li>Flight</li>
                <span className="font-bold text-xl">{FlightID}</span>
              </ul>
              <ul>
                <li>Date</li>
                <span className="font-bold text-xl">{Date}</span>
              </ul>
            </div>
          </div>
          <div className="w-64 sm:w-72 md:w-80 l:w-96 lg:w-full lg:max-w-[550px] xl:max-w-[600px]">
            <div className="flex justify-between items-center">
              <div>
                <li>From</li>
                <li className="font-bold text-4xl">{DepartureTime}</li>
                <li className="font-bold text-2xl">{OriginAirportID}</li>
              </div>
              <div className="p-2 bg-primary rounded-full">
                <TbPlaneInflight size="2.5em" color="white" />
              </div>

              <div>
                <li>To</li>
                <li className="font-bold text-4xl">{ArrivalTime}</li>
                <li className="font-bold text-2xl text-right">
                  {DestinationAirportID}
                </li>
              </div>
            </div>
            <div className="mt-2 border-b-2 border-gray-200"></div>
            <li>
              Booking ID: <span>{BookingID}</span>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};
