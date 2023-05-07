import { db } from "../index.js";

export const airportListUser = (req, res) => {
  const sql = "SELECT AirportID, Name, IATA FROM airport";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ Error: "Select airport list error in server..." });
    }
    if (data.length > 0) {
      return res.json({
        Status: "Successfully select airport list",
        Data: data,
      });
    } else {
      return res.json({ Error: "Airport List not found" });
    }
  });
};
