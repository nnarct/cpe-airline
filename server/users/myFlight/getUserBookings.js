import { db } from "../../index.js";
import jwt from "jsonwebtoken";
export const getUserBookings = (req, res) => {
  const userToken = req.cookies.userToken;
  let userID;
  if (!userToken) return res.json({ Status: "You are not authenticated" });
  jwt.verify(userToken, "user-secret-key", (err, decoded) => {
    if (err) return res.json({ Error: "Token is not ok" });
    userID = decoded.UserID;
  });

  const sql = `
              SELECT
                  b.Status,
                  b.Protection,
                  b.BookingID,
                  a.Name AS AirlineName,
                  f.FlightNumber,
                  f.FlightID,
                  f.DepartureTime,
                  f.ArrivalTime,
                  oa.IATA AS OriginAirport,
                  da.IATA AS DestinationAirport,
                  f.OriginAirportID,
                  f.DestinationAirportID,
                  oa.Name AS NameOriginAirport,
                  da.Name AS NameDestinationAirport
              FROM
                  booking b
              INNER JOIN flight f ON
                  b.FlightID = f.FlightID
              JOIN airline a ON
                  f.AirlineID = a.AirlineID
              INNER JOIN airport AS oa
              ON
                  oa.AirportID = f.OriginAirportID
              INNER JOIN airport AS da
              ON
                  da.AirportID = f.DestinationAirportID
              WHERE
                  b.UserID = ?
              ORDER BY
                  f.DepartureTime;`;
                  
  db.query(sql, [userID], (err, data) => {
    if (err) return res.json({ Error: "Error while user's bookings ..." });
    return data.length > 0 ? res.json({
      Status: "Get user's bookings successfully! :)",
      Data: data,
    }) : res.json({ Error: "No user's bookings found." });
  });
};
