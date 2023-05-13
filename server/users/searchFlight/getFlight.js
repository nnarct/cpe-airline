import { db } from "../../index.js";

export const getFlight = (req, res) => {
  const sql = "SELECT * FROM flight WHERE FlightID = ?";
  db.query(sql, [req.body.id], (err, response) => {
    if (err) return res.json({ Error: "Error while finding flight in db..." });
    if (response.length > 0)
      return res.json({ Status: "Success", Flight: response });
    return res.json({ Error: "No flight found." });
  });
};
