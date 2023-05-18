import { db } from "../../index.js";
export const editAirline = (req, res) => {
  const sql =
    "UPDATE airline SET Name = ?, Link = ? WHERE AirlineID =?";
  db.query(
    sql,
    [req.body.Name, req.body.Link, req.body.id],
    (err, result) => {
      if (err) {
        return res.json({ Error: "Error while editing airline..." });
      }
      return res.json({ Status: "Edit airline successfully! :)" });
    }
  );
};
