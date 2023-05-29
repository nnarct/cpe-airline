import { db } from "../../index.js";

export const searchFlights = (req, res) => {
  const sql =
    "SELECT f.FlightID, f.FlightNumber, f.AirlineID, al.Name AS AirlineName, f.DepartureTime, f.ArrivalTime, oa.Name AS Origin, oa.IATA AS OriIATA, da.Name AS Destination, da.IATA AS DesIATA, f.PlaneID, p.Price, c.Name AS class FROM flight AS f INNER JOIN airport AS oa ON oa.AirportID = f.OriginAirportID INNER JOIN airport AS da ON da.AirportID = f.DestinationAirportID INNER JOIN airline AS al ON al.AirlineID = f.AirlineID LEFT JOIN price AS p ON p.FlightID = f.FlightID LEFT JOIN class AS c ON c.ClassID = p.ClassID WHERE f.OriginAirportID = ? AND f.DestinationAirportID = ? AND f.DepartureTime LIKE ? AND (c.Name LIKE ? OR c.Name IS NULL) ORDER BY p.Price";
  db.query(
    sql,
    [req.body.from, req.body.to, `${req.body.departure}%`, req.body.class],
    (err, data) => {
      if (err)
        return res.json({ Error: "Error while searching flight in db..." });
      if (data.length > 0)
        return res.json({ Status: "Success", Flights: data });
      return res.json({ Status: "No flight found." });
    }
  );
};
