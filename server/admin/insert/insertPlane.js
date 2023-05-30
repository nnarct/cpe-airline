import { db } from "../../index.js";
export const insertPlane = (req, res) => {
  const sql =
    "INSERT INTO plane (AirlineID, PlaneModel) VALUES (?)";
  const values = [
    req.body.AirlineID,
    req.body.PlaneModel,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Inserting data error in server..." });
    return res.json({ Status: "Create new plane successfully! :)" });
  });
};
