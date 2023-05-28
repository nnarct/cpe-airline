import { db } from "../../index.js";

export const flightInfo = (req, res) => {
  const sql =
    "SELECT oa.IATA as OriIATA, da.IATA as DesIATA, al.Name as AirlineName, f.DepartureTime, f.ArrivalTime from flight f INNER JOIN airport oa ON oa.AirportID = f.OriginAirportID INNER JOIN airport da ON da.AirportID = f.DestinationAirportID INNER JOIN airline al ON al.AirlineID = f.AirlineID WHERE FlightID = ?;";
  if (req.body.isReturn === "0") {
    db.query(sql, [req.body.departureFlightID], (err, result) => {
      if (err) console.log(err);
      else {
        res.send({ Status: "Success", DepFlight: result[0] });
      }
    });
  } else {
    db.query(sql, [req.body.departureFlightID], (err, result) => {
      if (err) console.log(err);
      if (result.length > 0) {
        const dep = result[0];
        db.query(sql, [req.body.returnFlightID], (err, result) => {
          if (err) console.log(err);
          if (result.length > 0) {
            const ret = result[0];
            res.send({ Status: "Success", DepFlight: dep, RetFlight: ret });
          } else {
            res.send({ Error: "No return flight found.", DepFlight: dep });
          }
        });
      } else {
        res.send({ Error: "No departure flight found." });
      }
    });
  }
};
