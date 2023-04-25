import { db } from "..";
export const editAirline = (req, res) => {
  const sql =
    "UPDATE airline SET Name = ?, LogoImage = ?, Link = ? WHERE AirlineID =?";
  db.query(
    sql,
    [req.body.Name, req.body.LogoImage, req.body.Link, req.body.AirlineID],
    (err, result) => {
      if (err) {
        return res.json({ Error: "Error while editing airline..." });
      }
      return res.json({ Status: "Edit airline successfully! :)" });
    }
  );
}