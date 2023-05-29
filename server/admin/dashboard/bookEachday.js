import { db } from "../../index.js";

export const getBookingsCountByAirline = (req, res) => {
  const query = `
    SELECT a.AirlineID, a.Name, 
      COUNT(CASE WHEN WEEKDAY(f.DepartureTime) = 0 THEN b.BookingID END) AS MondayCount,
      COUNT(CASE WHEN WEEKDAY(f.DepartureTime) = 1 THEN b.BookingID END) AS TuesdayCount,
      COUNT(CASE WHEN WEEKDAY(f.DepartureTime) = 2 THEN b.BookingID END) AS WednesdayCount,
      COUNT(CASE WHEN WEEKDAY(f.DepartureTime) = 3 THEN b.BookingID END) AS ThursdayCount,
      COUNT(CASE WHEN WEEKDAY(f.DepartureTime) = 4 THEN b.BookingID END) AS FridayCount,
      COUNT(CASE WHEN WEEKDAY(f.DepartureTime) = 5 THEN b.BookingID END) AS SaturdayCount,
      COUNT(CASE WHEN WEEKDAY(f.DepartureTime) = 6 THEN b.BookingID END) AS SundayCount
    FROM airline AS a
    JOIN flight AS f ON a.AirlineID = f.AirlineID
    JOIN booking AS b ON f.FlightID = b.FlightID
    GROUP BY a.AirlineID, a.Name;
  `;

  db.query(query, (err, data) => {
    if (err) {
      return res.json({ Error: "Retrieve bookings count error in Server..." });
    }

    const bookingsCountByAirline = data.reduce((counts, row) => {
      const { AirlineID, Name, MondayCount, TuesdayCount, WednesdayCount, ThursdayCount, FridayCount, SaturdayCount, SundayCount } = row;
      counts[AirlineID] = { Name, MondayCount, TuesdayCount, WednesdayCount, ThursdayCount, FridayCount, SaturdayCount, SundayCount };
      return counts;
    }, {});

    return res.json({ BookingsCountByAirline: bookingsCountByAirline });
  });
};
