import { db } from "../../index.js";

export const flightCount = (req, res) => {
  const sql = "SELECT COUNT(FlightID) AS flightCount FROM flight;";
  db.query(sql, (err, data) => {
    if (err)
      return res.json({ Error: "Select flight count error in server..." });
    const count = data[0];
    const flightCount = parseInt(count.flightCount);
    return res.json({
      Status: "Successfully retrieved flight count",
      FlightCount: flightCount,
    });
  });
};
