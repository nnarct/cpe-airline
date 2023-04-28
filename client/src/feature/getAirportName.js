export const getAirportName = (airports, airport) => {
  const airportName = airports.find((e) => e.AirportID === airport);
  return airportName ? airportName.Name : "Not found";
};
