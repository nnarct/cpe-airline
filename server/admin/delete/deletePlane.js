import { db } from "../../index.js";
export const deletePlane = (req, res) => {
  const sql = "DELETE FROM plane WHERE PlaneID = ?";
  db.query(sql, [req.body.id], (err, result) => {
    if (err) return res.json({ Error: "Error while deleting plane..." });
    return res.json({ Status: "Delete plane successfully! :)" });
  });
};