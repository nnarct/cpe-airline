import { db } from "../../index.js";

export const flightInfo = (req, res) => {
  const sql =
    "SELECT oa.IATA as OriIATA, da.IATA as DesIATA, al.Name as AirlineName, f.DepartureTime, f.ArrivalTime from flight f INNER JOIN airport oa ON oa.AirportID = f.OriginAirportID INNER JOIN airport da ON da.AirportID = f.DestinationAirportID INNER JOIN airline al ON al.AirlineID = f.AirlineID WHERE FlightID = ?;";
  if (req.body.isReturn === 0 || req.body.isReturn === "0") {
    db.query(sql, [req.body.departureFlightID], (err, result) => {
      if (err) console.log(err);  // Todo - send Error message
      else {
        return res.json({ Status: "Success", DepFlight: result[0] });
      }
    });
    return;
  } else if(req.body.isReturn === 1 || req.body.isReturn === "1") {
    db.query(sql, [req.body.departureFlightID], (err, result) => {
      if (err) console.log(err); // Todo - send Error message
      if (result.length > 0) {
        const dep = result[0];
        db.query(sql, [req.body.returnFlightID], (err, result) => {
          if (err) console.log(err);  // Todo - send Error message
          if (result.length > 0) {
            const ret = result[0];
            return res.json({ Status: "Success", DepFlight: dep, RetFlight: ret });
          } else {
            return res.json({ Error: "No return flight found.", DepFlight: dep });
          }
        });
      } else {
        return res.json({ Error: "No departure flight found." });
      }
    });
  }
};
