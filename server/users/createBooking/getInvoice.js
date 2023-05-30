import { db } from "../../index.js";

export const getInvoice = (req, res) => {
  const sql =
      `SELECT
          i.Class,
          b.BookingID,
          b.ContactFirstname AS fname,
          b.ContactLastname AS lname,
          b.ContactPhone AS tel,
          b.ContactEmail AS email,
          b.InvoiceID,
          p.Name AS 'payment method',
          i.BillTo,
          i.Total,
          i.CardNumber,
          i.CVV,
          i.ExpDate,
          i.PromptpayNumber,
          i.Date,
          f.FlightID,
          f.FlightNumber,
          al.Name AS Airline,
          ori.IATA AS 'From',
          des.IATA AS 'To',
          passenger_count.PassengerCount
      FROM
          booking AS b
      INNER JOIN invoice AS i
      ON
          i.InvoiceID = b.InvoiceID
      INNER JOIN flight AS f
      ON
          f.FlightID = b.FlightID
      INNER JOIN payment p ON
          p.PaymentID = i.PaymentID
      INNER JOIN airport des ON
          f.DestinationAirportID = des.AirportID
      INNER JOIN airport ori ON
          f.OriginAirportID = ori.AirportID
      INNER JOIN airline al ON
          f.AirlineID = al.AirlineID
      INNER JOIN(
          SELECT BookingID,
              COUNT(*) AS PassengerCount
          FROM
              passenger
          GROUP BY
              BookingID
      ) AS passenger_count
      ON
          passenger_count.BookingID = b.BookingID
      WHERE
          b.UserID = ? AND b.InvoiceID = ?;`;
  db.query(sql, [req.body.user, req.body.id], (err, data) => {
    if (err){
      return res.json({ Error: "Error in server while getting invoice..." });}
    if (data.length === 1)
      return res.json({ Status: "Success", isReturn: 0, Invoice: data });
    if (data.length === 2)
      return res.json({ Status: "Success", isReturn: 1, Invoice: data });
    else return res.json({ Error: "No invoice found" });
  });
};
