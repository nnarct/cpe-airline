import { db } from "../index.js";
export const planeList = (req, res) => {
  const sql = "SELECT  p.*, a.Name as airline FROM plane p inner join airline a on p.AirlineID = a.AirlineID";
  let airlines =[];
  db.query("SELECT * FROM airline", (err,data) => {
    if(err) return res.json({ Error: "Select airline list error in plane list server..." });
    else airlines = data;
  })
  db.query(sql, (err, data) => {
    if (err) return res.json({ Error: "Select plane list error in server..." });
    if (data.length > 0) {
      return res.json({
        Status: "Successfully select plane list",
        Data: data,
        Airlines: airlines,
      });
    } else return res.json({ Error: "Plane List not found" });
  });
};
