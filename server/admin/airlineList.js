import { db } from "../index.js";
export const airlineList = (req, res) => {
  const sql = "SELECT * FROM airline";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Select airline list error in server..." });
    }
    if (data.length > 0) {
      // console.log(data);
      return res.json({
        Status: "Successfully select airline list",
        Data: data,
      });
    } else {
      return res.json({ Error: "Airline List not found" });
    }
  });
};
