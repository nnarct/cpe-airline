import { db } from "../../index.js";
export const insertFlight = (req, res) => {
  const sqlPremiumPrice = `INSERT INTO price ( Price, FlightID, ClassID)
  SELECT ?, ?, c.ClassID
  FROM class c
  WHERE c.PlaneID = ? AND c.Name = 'Premium Economy'`;
  const sqlEconomyPrice = `INSERT INTO price ( Price, FlightID, ClassID)
  SELECT ?, ?, c.ClassID
  FROM class c
  WHERE c.PlaneID = ? AND c.Name = 'Economy'`;

  const sql =
    "INSERT INTO flight (FlightNumber, AirlineID, DepartureTime, ArrivalTime, PlaneID, OriginAirportID, DestinationAirportID ) VALUES (?)";
  const values = [
    req.body.FlightNumber,
    req.body.AirlineID,
    req.body.DepartureTime,
    req.body.ArrivalTime,
    req.body.PlaneID,
    req.body.OriginAirportID,
    req.body.DestinationAirportID,
  ];

  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Inserting data error in server..." });
    const flightID = result.insertId;
    db.query(
      sqlPremiumPrice,
      [req.body.PremiumPrice, flightID, req.body.PlaneID],
      (err, result) => {
        if (err)
          return res.json({ Error: "Error while inserting economy price..." });
      }
    );
    db.query(
      sqlEconomyPrice,
      [req.body.EconomyPrice, flightID, req.body.PlaneID],
      (err, result) => {
        if (err)
          return res.json({ Error: "Error while inserting economy price..." });
      }
    );
    return res.json({ Status: "Create new flight successfully! :)" });
  });
};
