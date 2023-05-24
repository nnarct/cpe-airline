import Axios from "axios";
import { useEffect, useState } from "react";
export const AmadeusSearchResult = () => {
  const [Flights, setFlights] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3001/AmadeusSearchFlights").then(
      (res, err) => {
        if (err) console.log(err);
        if (res.data.Status === "Success") {
          console.log(res.data.Flights);
          setFlights(res.data.Flights);
        } else {
          console.log(res.data.Error);
        }
      }
    );
  });
  return (
    <>
      <h1 className="text-4xl">Search Result</h1>
      <div className="flex flex-wrap bg-blue-100">
        {Flights &&
          Flights.map((flight, i) => {
            return (
              <div key={i} className="border bg-gray-100 p-2 m-1">
                <ul>
                  <li>id: {flight.id}</li>
                  <li>
                    itineraries
                    {flight.itineraries[0].segments.map((segment, i) => {
                      return (
                        <ul key={i} className="pl-4">
                          <li>{i}</li>
                          <li>duration: {flight.itineraries[0].duration}</li>
                          <li>
                            segments
                            <ul className="pl-4">
                              <li>aircraft: {segment.aircraft.code}</li>
                              <li>
                                arrival
                                <ul className="pl-4">
                                  <li>at: {segment.arrival.at}</li>
                                  <li>iataCode: {segment.arrival.iataCode}</li>
                                </ul>
                                <li>carrierCode: {segment.carrierCode}</li>
                              </li>
                              <li>
                                departure
                                <ul className="pl-4">
                                  <li>at: {segment.departure.at}</li>
                                  <li>
                                    iataCode: {segment.departure.iataCode}
                                  </li>
                                </ul>
                                <li>duration : {segment.duration}</li>
                                <li>id : {segment.id}</li>
                                <li>number : {segment.number}</li>
                                <li>numberOfStops : {segment.numberOfStops}</li>
                                <li>
                                  operating{" "}
                                  <ul className="pl-4">
                                    carrierCode:
                                    {segment.operating.carrierCode}
                                  </ul>
                                </li>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      );
                    })}
                  </li>

                  <li>lastTicketingDate: {flight.lastTicketingDate}</li>
                  <li>
                    lastTicketingDateTime : {flight.lastTicketingDateTime}
                  </li>
                  <li>
                    nonHomogeneous : {flight.nonHomogeneous ? "true" : "false"}
                  </li>
                  <li>
                    numberOfBookableSeats : {flight.numberOfBookableSeats}
                  </li>
                  <li>oneWay : {flight.oneWay ? "true" : "false"}</li>
                  <li>
                    price
                    <ul className="pl-4">
                      <li>currency: {flight.price.currency}</li>
                      <li>base: {flight.price.base}</li>
                      <li>
                        fee{" "}
                        <ul className="pl-4">
                          {flight.price.fees &&
                            flight.price.fees.map((fee, i) => {
                              return (
                                <li key={i}>
                                  {i + 1}.{fee.type} -- {fee.amount}
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                      <li>grandTotal: {flight.price.grandTotal}</li>
                      <li>total: {flight.price.total}</li>
                    </ul>
                  </li>
                  <li>
                    pricingOptions
                    <ul className="pl-4">
                      <li>
                        includedCheckedBagsOnly:{" "}
                        {flight.pricingOptions.includedCheckedBagsOnly
                          ? "true"
                          : "yes"}
                      </li>
                    </ul>
                  </li>
                  <li>
                    validatingAirlineCodes
                    <ul className="pl-4">
                      {flight.validatingAirlineCodes &&
                        flight.validatingAirlineCodes.map((code, i) => {
                          return (
                            <li key={i}>
                              {i}.{code}
                            </li>
                          );
                        })}
                    </ul>
                  </li>
                </ul>
              </div>
            );
          })}
      </div>
    </>
  );
};
