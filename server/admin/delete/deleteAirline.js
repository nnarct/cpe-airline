import { db } from "../../index.js";
export const deleteAirline = (req, res) => {
  const sql = "DELETE FROM airline WHERE AirlineID = ?";
  db.query(sql, [req.body.id], (err, result) => {
    if (err) return res.json({ Error: "Error while deleting airline..." });
    return res.json({ Status: "Delete airline successfully! :)" });
  });
};
