import { db } from "../../index.js";
export const getBooking = (req, res) => {
  const sql = `
              SELECT
                b.BookingID,
                b.Status,
                b.Protection,
                b.ContactFirstname,
                b.ContactLastname,
                b.ContactPhone,
                b.ContactEmail,
                b.FlightID,
                f.FlightNumber,
                f.DepartureTime,
                f.ArrivalTime,
                a.AirlineID,
                a.Name AS AirlineName,
                ori.IATA AS oriIATA,
                des.IATA AS desIATA,
                ori.Name AS Origin,
                des.Name AS Destination,
                i.Class,
                i.InvoiceID
              FROM
                booking b
              INNER JOIN flight f ON
                f.FlightID = b.FlightID
              INNER JOIN airport ori ON
                ori.AirportID = f.OriginAirportID
              INNER JOIN airport des ON
                des.AirportID = f.DestinationAirportID
              INNER JOIN airline a ON
                a.AirlineID = f.AirlineID
              INNER JOIN invoice i ON
                b.InvoiceID = i.InvoiceID
              WHERE
                b.BookingID = ? ;`;

  const sqlPassenger = `SELECT * FROM passenger p LEFT JOIN seat s ON s.SeatID = p.SeatID LEFT JOIN addons a ON a.AddOnsID = p.AddOnsID WHERE p.BookingID = ?`;

  db.query(sql, [req.body.id], (err, data) => {
    if (err) {
      return res.json({ Error: "Error while getting booking info..." });
    }
    if (data.length > 0) {
      const booking = data[0];
      db.query(sqlPassenger, [req.body.id], (err, data) => {
        if (err) {
          return res.json({ Error: "Error while getting passengers info..." });
        }
        if (data.length > 0) {
          return res.json({
            Status: "Success",
            Booking: booking,
            Passengers: data,
          });
        } else return res.json({ Error: "No passenger info info found." });
      });
    } else return res.json({ Error: "No booking info found." });
  });
};
