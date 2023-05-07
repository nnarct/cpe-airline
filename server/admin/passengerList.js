import { db } from "../index.js";
export const passengerList = (req, res) => {
  const sql = "SELECT * FROM passenger";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Select passenger list error in server..." });
    }
    if (data.length > 0) {
      return res.json({
        Status: "Successfully select passenger list",
        Data: data,
      });
    } else {
      return res.json({ Error: "Passenger List not found" });
    }
  });
};
