import { db } from "../../index.js";
export const insertAirport = (req,res) => {
  const sqlCheck = `SELECT * FROM airport WHERE IATA = ?`;
  const sql = "INSERT INTO airport (Name, IATA, State, Province) VALUES (?)";
  db.query(sqlCheck, [req.body.IATA], (err, response) => {
    if (err)
      return res.json({ Error: "Error while checking IATA in db..." });
    if (response.length > 0)
      return res.json({ Error: "IATA is already exist." });
    const values = [
      req.body.Name,
      req.body.IATA,
      req.body.State,
      req.body.Province,
    ];
    db.query(sql, [values], (err, result) => {
      if (err)
        return res.json({ Error: "Inserting data error in server..." });
      return res.json({ Status: "Create new airport successfully! :)" });
    });
  });
};
