import { db } from "../../index.js";

export const bookByday = (req, res) => {
  const query = `
  SELECT a.AirlineID, a.Name, 
      COUNT(CASE WHEN WEEKDAY(i.Date) = 0 THEN i.InvoiceID END) AS MondayCount,
      COUNT(CASE WHEN WEEKDAY(i.Date) = 1 THEN i.InvoiceID END) AS TuesdayCount,
      COUNT(CASE WHEN WEEKDAY(i.Date) = 2 THEN i.InvoiceID END) AS WednesdayCount,
      COUNT(CASE WHEN WEEKDAY(i.Date) = 3 THEN i.InvoiceID END) 
AS ThursdayCount,
      COUNT(CASE WHEN WEEKDAY(i.Date) = 4 THEN i.InvoiceID END) AS FridayCount,
      COUNT(CASE WHEN WEEKDAY(i.Date) = 5 THEN i.InvoiceID END) AS SaturdayCount,
      COUNT(CASE WHEN WEEKDAY(i.Date) = 6 THEN i.InvoiceID END) AS SundayCount
    FROM airline AS a
    JOIN flight AS f ON a.AirlineID = f.AirlineID
    JOIN booking AS b ON f.FlightID = b.FlightID
    JOIN invoice AS i ON b.InvoiceID = i.InvoiceID
    GROUP BY a.AirlineID, a.Name; `;

  db.query(query, (err, data) => {
    if (err) {
      return res.json({ Error: "Retrieve bookings count error in Server..." });
    }

    const bookByday = data.reduce((counts, row) => {
      const { AirlineID, Name, MondayCount, TuesdayCount, WednesdayCount, ThursdayCount, FridayCount, SaturdayCount, SundayCount } = row;
      counts[AirlineID] = { Name, MondayCount, TuesdayCount, WednesdayCount, ThursdayCount, FridayCount, SaturdayCount, SundayCount };
      return counts;
    }, {});

    return res.json({ Status: 'Success' ,BookByday: bookByday });
  });
};
