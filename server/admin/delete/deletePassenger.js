import { db } from "../../index.js";
export const deletePassenger = (req, res) => {
  const sql = "DELETE FROM passenger WHERE PassengerID = ?";
  db.query(sql, [req.body.id], (err, result) => {
    if (err) return res.json({ Error: "Error while deleting passenger..." });
    return res.json({ Status: "Delete passenger successfully! :)" });
  });
};