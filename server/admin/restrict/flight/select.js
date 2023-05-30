import { db } from "../../../index.js";
import jwt from "jsonwebtoken";

export const selectFlight = (req, res) => {
  const admin = req.body.adminCookie;
  let adminID;
  if (!admin) {
    return res.json({ Status: "You are not authenticated admin" });
  }
  jwt.verify(admin, "admin-secret-key", (err, decoded) => {
    if (err) return res.json({ Error: "Admin token is not ok" });
    adminID = decoded.info;
  });
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
  const sql = `SELECT f.*, dap.IATA as desIATA, oap.IATA as oriIATA , al.Name as airline FROM flight f INNER JOIN Airport AS dap ON dap.AirportID = f.DestinationAirportID INNER JOIN Airport as oap ON oap.AirportID = f.OriginAirportID INNER JOIN Airline AS al on al.AirlineID = f.AirlineID WHERE f.AirlineID = (SELECT AirlineID FROM employee WHERE EmployeeID = ?)`;
  db.query(sql, [adminID.EmployeeID], (err, data) => {
    if (err) return res.json({ Error: "Select flight error in server..." });
    return data.length > 0
      ? res.json({
          Status: "Success",
          Data: data,
          Airports: airports,
          Airlines: airlines,
        })
      : res.json({ Error: "Flight not found" });
  });
};
