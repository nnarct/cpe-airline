import { db } from "../../index.js";
export const insertAirline = (req, res) => {
  const sql = "INSERT INTO airline (Name, Link) VALUES (?)";
  const values = [req.body.Name, req.body.Link];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Inserting data error in server..." });
    return res.json({ Status: "Create new airline successfully! :)" });
  });
};
