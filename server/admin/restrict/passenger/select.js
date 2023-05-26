import { db } from "../../../index.js";
import jwt from "jsonwebtoken";

export const selectPassenger = (req, res) => {
  const admin = req.body.adminCookie;
  let adminID;
  if (!admin) {
    return res.json({ Status: "You are not authenticated admin" });
  }
  jwt.verify(admin, "admin-secret-key", (err, decoded) => {
    if (err) return res.json({ Error: "Admin token is not ok" });
    adminID = decoded.info;
  });
  const sql = `SELECT p.* FROM passenger p JOIN booking b ON p.bookingID = b.BookingID JOIN flight f ON b.FlightID = f.FlightID WHERE f.AirlineID = (SELECT AirlineID FROM employee WHERE EmployeeID = ?)`;
  db.query(sql, [adminID.EmployeeID], (err, data) => {
    if (err) {
      return res.json({ Error: "Select passenger error in server..." });
    }
    return data.length > 0
      ? res.json({ Status: "Success", Data: data })
      : res.json({ Error: "Data not found" });
  });
};
