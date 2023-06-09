import moment from "moment/moment";
import { airlineLogo } from "../../searchResult/function";
import { BsShieldFillCheck } from "react-icons/bs";
import { TbPlaneInflight } from "react-icons/tb";
export const Item = ({
  AirlineName,
  BookingID,
  FlightNumber,
  FlightID,
  DepartureTime,
  OriginAirport,
  ArrivalTime,
  DestinationAirport,
  Protection
}) => {
  return (
    <>
      <div className="w-full p-5">
        <div className="w-full py-4 container flex justify-between">
          <div className="w-64 pr-2">
            <div className="h-14 flex items-center space-x-2">
              <img
                className="w-16 object-fit"
                src={airlineLogo(AirlineName)}
                alt=""
              />
              <h1 className="text-3xl text-gray-900 font-bold tracking-tight">
                {AirlineName}
              </h1>
            </div>

            <div className="py-4 mx-auto container flex justify-between">
              <ul>
                <li>Flight</li>
                <span className="font-bold text-xl">{FlightNumber}</span>
              </ul>
              <ul>
                <li>Date</li>
                <span className="font-bold text-xl">
                  {moment(DepartureTime).format("DD MMM YY")}
                </span>
              </ul>
            </div>
          </div>
          <div className="w-64 sm:w-72 md:w-80 l:w-96 lg:w-full lg:max-w-[550px] xl:max-w-[600px]">
            <div className="flex justify-between items-center">
              <div>
                <li>From</li>
                <li className="font-bold text-4xl">
                  {moment(DepartureTime).format("HH:mm")}
                </li>
                <li className="font-bold text-2xl">{OriginAirport}</li>
              </div>
              <div className="p-2 bg-primary rounded-full">
                <TbPlaneInflight size="2.5em" color="white" />
              </div>

              <div>
                <li>To</li>
                <li className="font-bold text-4xl">
                  {moment(ArrivalTime).format("HH:mm")}
                </li>
                <li className="font-bold text-2xl text-right">
                  {DestinationAirport}
                </li>
              </div>
            </div>
            <div className="mt-2 border-b-2 border-gray-200"></div>
            <div className="flex justify-between items-center">
              <span> Booking ID: <span>{BookingID}</span></span>
             {Protection === 1 ? <span className="py-1"><BsShieldFillCheck color="green"/></span>:''}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
