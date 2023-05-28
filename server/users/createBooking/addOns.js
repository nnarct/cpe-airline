import { db } from "../../index.js";

export const addOnInfo = (req, res) => {
  const sql =
    "SELECT * FROM addons WHERE AirlineID = (SELECT AirlineID FROM flight WHERE FlightID = ?)";
  let depA = [];
  let retA = [];
  db.query(sql, [req.body.departureFlightID], (err, result) => {
    if (err)
      return res.json({ Error: "Error while getting departure flight add-ons." });
    else if (result.length === 0)
      return res.json({ Error: "No departure flight add-ons found." });
    else {
      depA = result;
      if (req.body.isReturn === 1 || req.body.isReturn === "1") {
        db.query(sql, [req.body.returnFlightID], (err, result) => {
          if (err)
            return res.json({ Error: "Error while getting return flight add-ons." });
          else if (result.length === 0)
            return res.json({ Error: "No return flight add-ons found." });
          else {
            retA = result;
            return res.json({ Status: "Success", DepAddOns: depA, RetAddOns: retA });
          }
        });
      } else {
        return res.json({ Status: "Success", DepAddOns: depA, RetAddOns: [] });
      }
    }
  });
};

export const getBase = (req, res) => {
  const sql =
    "SELECT s.BasePurseWeight as CarryOn , s.BaseLuggageWeight as CheckedIn FROM `seat` s INNER JOIN class c ON c.ClassID = s.ClassID INNER JOIN plane p ON c.PlaneID = p.PlaneID INNER JOIN Airline a on p.AirlineID = a.AirlineID INNER JOIN flight f on f.AirlineID = a.AirlineID WHERE f.FlightID = ? AND c.Name = ? LIMIT 1;";
  db.query(sql, [req.body.departureFlightID, req.body.class], (err, result) => {
    if (err) res.json({ Error: "Error while getting base luggage." });
    else if (result.length === 0)
      return res.json({ Error: "No base luggage found." });
    else {
      const depBase = result[0];
      if (req.body.isReturn === 1 || req.body.isReturn === "1") {
        db.query(
          sql,
          [req.body.returnFlightID, req.body.class],
          (err, result) => {
            if (err) return res.json({ Error: "Error while getting base luggage." });
            else if (result.length === 0)
              return res.json({ Error: "No base luggage found." });
            else {
              const retBase = result[0];
              return res.json({
                Status: "Success",
                Base: { DepBase: depBase, RetBase: retBase },
              });
            }
          }
        );
      } else
        return res.json({
          Status: "Success",
          Base: { DepBase: depBase, RetBase: null },
        });
    }
  });
};
