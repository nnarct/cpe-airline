import { db } from "../index.js";
export const flightList = (req, res) => {
  const sql = "SELECT * FROM flight";
  const sqlAirports = "SELECT AirportID, Name, IATA FROM airport";
  const sqlAirlines = "SELECT AirlineID, Name, Link FROM airline";
  let airports = [];
  let airlines = [];
  db.query(sqlAirports, (err, data) => {
    if (data.length > 0) {
      airports = data;
    }
  });
  db.query(sqlAirlines, (err, data) => {
    if (data.length > 0) {
      airlines = data;
    }
  });
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Select flight list error in server..." });
    }
    if (data.length > 0) {
      return res.json({
        Status: "Successfully select flight list",
        Data: data,
        Airports: airports,
        Airlines: airlines,
      });
    } else {
      return res.json({ Error: "Flight List not found" });
    }
  });
};
