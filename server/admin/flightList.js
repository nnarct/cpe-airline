import { db } from "../index.js";
export const flightList = (req, res) => {
  const sql =
    "SELECT f.*, dap.IATA as desIATA, oap.IATA as oriIATA , al.Name as airline FROM flight f INNER JOIN Airport AS dap ON dap.AirportID = f.DestinationAirportID INNER JOIN Airport as oap ON oap.AirportID = f.OriginAirportID INNER JOIN Airline AS al on al.AirlineID = f.AirlineID WHERE f.FlightID < 200 AND f.FlightID > 100 ORDER BY f.FlightID;";
  const sqlAirports = "SELECT AirportID, Name, IATA FROM airport";
  const sqlAirlines = "SELECT AirlineID, Name, Link FROM airline";
  let airports = [];
  let airlines = [];
  db.query(sqlAirports, (err, data) => {
    if (data.length > 0) airports = data;
    else return res.json({ Error: "Error", SQL: "Airport List not found" });
  });
  db.query(sqlAirlines, (err, data) => {
    if (data.length > 0) airlines = data;
    else return res.json({ Error: "Error", SQL: "Airline List not found" });
  });
  db.query(sql, (err, data) => {
    if (err)
      return res.json({
        Error: "Select flight list error in server...",
        SQL: err.sqlMessage,
      });

    if (data.length > 0) {
      return res.json({
        Status: "Successfully select flight list",
        Data: data,
        Airports: airports,
        Airlines: airlines,
      });
    } else return res.json({ Error: "Flight List not found" });
  });
};

export const flightListSort = (req, res) => {
  const sql =
    "SELECT f.*, dap.IATA as desIATA, oap.IATA as oriIATA , al.Name as airline FROM flight f INNER JOIN Airport AS dap ON dap.AirportID = f.DestinationAirportID INNER JOIN Airport as oap ON oap.AirportID = f.OriginAirportID INNER JOIN Airline AS al on al.AirlineID = f.AirlineID WHERE al.Name LIKE ? AND f.FlightID < 31 ORDER BY f.FlightID;";
  const sqlAirports = "SELECT AirportID, Name, IATA FROM airport";
  const sqlAirlines = "SELECT AirlineID, Name, Link FROM airline";
  let airports = [];
  let airlines = [];
  db.query(sqlAirports, (err, data) => {
    if (data.length > 0) airports = data;
    else return res.json({ Error: "Error", SQL: "Airport List not found" });
  });
  db.query(sqlAirlines, (err, data) => {
    if (data.length > 0) airlines = data;
    else return res.json({ Error: "Error", SQL: "Airline List not found" });
  });
  db.query(sql, (err, data) => {
    if (err)
      return res.json({
        Error: "Select flight list error in server...",
        SQL: err.sqlMessage,
      });

    return data.length > 0
      ? res.json({
          Status: "Successfully select flight list",
          Data: data,
          Airports: airports,
          Airlines: airlines,
        })
      : res.json({ Error: "Flight List not found" });
  });
};
