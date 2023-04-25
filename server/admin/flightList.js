import { db } from "../index.js";
export const flightList = (req, res) => {
  const sql = "SELECT * FROM flight";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Select flight list error in server..." });
    }
    if (data.length > 0) {
      return res.json({
        Status: "Successfully select flight list",
        Data: data,
      });
    } else {
      return res.json({ Error: "Flight List not found" });
    }
  });
}