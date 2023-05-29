import { db } from "../../index.js";

export const getPrice = (req, res) => {
  const sql =
    "SELECT p.PriceID, p.Price, p.FlightID, p.ClassID, c.Name AS Class FROM price p INNER JOIN class c ON c.ClassID = p.ClassID WHERE FlightID = ?";
  db.query(sql, [req.body.DepartureFlightID], (err, dep) => {
    if (err)
      return res.json({
        Error: "Error while finding departure flight price in db...",
      });
    if (dep.length > 0) {
      if (req.body.isReturn === "1" || req.body.isReturn === 1) {
        db.query(sql, [req.body.ReturnFlightID], (err, ret) => {
          if (err)
            return res.json({
              Error: "Error while finding return flight price in db...",
              DepartureFlightPrice: dep,
            });
          if (ret.length > 0)
            return res.json({
              Status: "Success",
              DepartureFlightPrice: dep,
              ReturnFlightPrice: ret,
            });
          return res.json({
            Status: "Success",
            DepartureFlightPrice: dep,
            ReturnFlightPrice: ret,
            Error: "No return flight price found.",
          });
        });
      } else return res.json({ Status: "Success", DepartureFlightPrice: dep });
    }
  });
};
