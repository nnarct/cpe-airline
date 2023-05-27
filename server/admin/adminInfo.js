import { db } from "../index.js";
import jwt from "jsonwebtoken";
export const adminInfo = (req, res) => {
  let airlines = [];
  const sql = "SELECT * FROM airline";
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
      return res.json({
        Status: "Success",
        Info: decoded.info,
        Airlines: airlines,
      });
    });
  } else return res.json({ Error: "You are not authenticated admin" });
};
