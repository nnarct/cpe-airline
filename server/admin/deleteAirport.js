import { db } from "../index.js";
export const deleteAirport = (req, res) => {
  const sql = `DELETE FROM airport WHERE IATA = ?`;
  db.query(sql, [req.body.IATA], (err, result) => {
    if (err) return res.json({ Error: "Error while deleting airport..." });
    return res.json({ Status: "Delete airport successfully! :)" });
  });
}