import { db } from "../index.js";
export const planeList = (req, res) => {
  const sql = "SELECT  p.*, a.Name as airline FROM plane p inner join airline a on p.AirlineID = a.AirlineID";
  db.query(sql, (err, data) => {
    if (err) return res.json({ Error: "Select plane list error in server..." });
    if (data.length > 0) {
      return res.json({
        Status: "Successfully select plane list",
        Data: data,
      });
    } else return res.json({ Error: "Plane List not found" });
  });
};
