import { db } from "../../index.js";

export const searchFlights = (req, res) => {
  const sql =
    "SELECT f.FlightID, f.FlightNumber, f.AirlineID, al.Name as AirlineName, f.DepartureTime, f.ArrivalTime, oa.Name AS Origin, oa.IATA as OriIATA, da.Name AS Destination, da.IATA as DesIATA, f.PlaneID FROM flight AS f INNER JOIN airport AS oa ON oa.AirportID = f.OriginAirportID INNER JOIN airport AS da ON da.AirportID = f.DestinationAirportID INNER JOIN airline AS al ON al.AirlineID = f.AirlineID WHERE f.OriginAirportID = ? AND f.DestinationAirportID = ? AND f.DepartureTime LIKE ?;";
  db.query(
    sql,
    [req.body.from, req.body.to, req.body.departure + "%"],
    (err, response) => {
      if (err)
        return res.json({ Error: "Error while searching flight in db..." });
      if (response.length > 0)
        return res.json({ Status: "Success", Flights: response });
      return res.json({ Error: "No flight found." });
    }
  );
};
