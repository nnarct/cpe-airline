import { db } from "../../index.js";

export const getbookCountsBySection = (req, res) => {
  const nextMonthDate = new Date();
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  const query = `SELECT a.AirportID, a.Name,a.IATA, COUNT(b.BookingID) AS BookingCount FROM airport AS a JOIN flight AS f ON a.AirportID = f.DestinationAirportID JOIN booking AS b ON f.FlightID = b.FlightID GROUP BY a.AirportID, a.IATA`;
  const airline = "SELECT Name FROM airline";

  db.query(query, (err, data) => {
    if (err) {
      return res.json({ Error: "Retrieve booking counts error in Server..." });
    }
    const bookingCountsByAirport = data.reduce((counts, row) => {
      const { AirportID, IATA, BookingCount } = row;
      counts[AirportID] = { IATA, BookingCount };
      return counts;
    }, {});
    db.query(airline, (err, airlineName) => {
      if (err)
        return res.json({ Error: "Select airline list error in server..." });
      if (airlineName.length > 0) {
        return res.json({
          Status: "Successfully select airline name",
          BookCountsBySection: bookingCountsByAirport,
          Airlinename: airlineName,
        });
      } else {
        return res.json({ Error: "Airline name not found" });
      }
    });
  });
};
