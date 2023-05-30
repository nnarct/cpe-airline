import Amadeus from "amadeus";
import Axios from "axios";
export const AmadeusSearchFlights = (req, res) => {
  const amadeus = new Amadeus({
    clientId: "BJOK69uCb8qIo23oLVepAgAM0JMmyqq8",
    clientSecret: "RE0gA2r0AUfYGXAA",
  });
  amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: "BKK",
      destinationLocationCode: "CNX",
      departureDate: "2023-06-20",
      currencyCode: "THB",
      adults: "1",
      max: "1",
    })
    .then((response) => {
      // console.log(response.data);
      return res.json({ Status: "Success", Flights: response.data });
    })
    .catch((err) => {
      return res.json({ Error: "Error in server while searching flight..." });
    });
};
