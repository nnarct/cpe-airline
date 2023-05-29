import { db } from "../../index.js";

export const addOnInfo = (req, res) => {
  const sql =
    "SELECT * FROM addons WHERE AirlineID = (SELECT AirlineID FROM flight WHERE FlightID = ?)";
  let depA = []
  let retA = []
    db.query(sql, [req.body.departureFlightID], (err, result) => {
      if (err) res.json({Error: "Error while getting departure flight add-ons."});
      else if (result.length === 0 ) return res.json({Error: "No departure flight add-ons found."})
      else {
        depA = result;
        if (req.body.isReturn === "1") {
          db.query(sql, [req.body.returnFlightID], (err, result) => {
            if (err) res.json({Error: "Error while getting return flight add-ons."});
            else if (result.length === 0 ) return res.json({Error: "No return flight add-ons found."})
            else {
              retA = result;
              res.send({ Status: "Success", DepAddOns: depA, RetAddOns: retA });
            }
          });
        } 
        else {
          res.send({ Status: "Success", DepAddOns: depA, RetAddOns: [] });
        }
      }
    });
  
};
