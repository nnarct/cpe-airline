import { db } from "../../index.js";
export const insertFlight = (req,res) => {
    console.log(req.body);
  const sql = "INSERT INTO flight (FlightNumber, AirlineID, DepartureTime, ArrivalTime, PlaneID, OriginAirportID, DestinationAirportID ) VALUES (?)";
    const values = [
      req.body.FlightNumber,  
      req.body.AirlineID,
      req.body.DepartureTime,
      req.body.ArrivalTime,
      req.body.PlaneID,
      req.body.OriginAirportID,
      req.body.DestinationAirportID
    ];
    db.query(sql, [values], (err, result) => {
      if (err)
        {console.log(err); return res.json({ Error: "Inserting data error in server..." });}
      return res.json({ Status: "Create new flight successfully! :)" });
    });
  };
