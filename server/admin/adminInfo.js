import { db } from "../index.js";
import jwt from "jsonwebtoken";
export const adminInfo = (req, res) => {
  let airlines = [];
  const sql = "SELECT * FROM airline";
  const sql2 =
    "SELECT FirstName, LastName, Email, TelNo, Username, EmployeeID FROM employee WHERE EmployeeID = ?";
  let id;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error while getting airlines..." });
    else if (result.length > 0) {
      airlines = result;
    } else return res.json({ Error: "No airlines found..." });
  });
  if (req.body.cookieID) {
    jwt.verify(req.body.cookieID, "admin-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Admin token is not ok" });
      delete decoded.info.Password;
      id = decoded.info.EmployeeID;
      db.query(sql2, [id], (err, data) => {
        if (err)
          return res.json({ Error: "Error while getting admin info..." });
        else if (data.length > 0) {
          return res.json({
            Status: "Get admin info successfully! :)",
            Info: data[0],
            Airlines: airlines,
          });
        } else return res.json({ Error: "No admin found..." });
      });
    });
  } else return res.json({ Error: "You are not authenticated admin" });
};
