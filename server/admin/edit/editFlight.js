import { db } from "../../index.js";
export const editFlight = (req, res) =>{
  console.log(req);
    const sql = "UPDATE flight SET FlightNumber = ?, AirlineID = ?, OriginAirportID = ? , DestinationAirportID = ?, PlaneID = ?, DepartureTime = ?, ArrivalTime = ? WHERE FlightID =?";
    db.query(sql, [req.body.FlightNumber, req.body.AirlineID,
    req.body.OriginAirportID, req.body.DestinationAirportID,
  req.body.PlaneID, req.body.DepartureTime, req.body.ArrivalTime, req.body.id], (err, result) => {
      if(err){
        return res.json({Error: "Error while editing flight..."});}
      return res.json({Status: "Edit flight successfully! :)"});
    });
  }