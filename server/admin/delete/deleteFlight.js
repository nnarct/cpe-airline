import { db } from "../../index.js";
export const deleteFlight = (req, res) => {
  const sql = "DELETE FROM flight WHERE FlightID = ?";
  db.query(sql, [req.body.id], (err, result) => {
    if (err) return res.json({ Error: "Error while deleting flight..." });
    return res.json({ Status: "Deleteflight successfully! :)" });
  });
};
