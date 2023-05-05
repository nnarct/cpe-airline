import { db } from "../index.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
export const showProfile = (req, res) => {
  const sql =
    "SELECT FirstName, LastName, Email, TelNo FROM user WHERE UserID = ?";
  db.query(sql, [req.body.id], (err, data) => {
    if (err) {
      return res.json({ Error: "Get user data error in server..." });
    }
    if (data.length > 0) {
      const user = {
        FirstName: data[0].FirstName,
        LastName: data[0].LastName,
        Email: data[0].Email,
        TelNo: data[0].TelNo,
      };
      return res.json({ Status: "Success", Data: user });
    } else return res.json({ Error: "UserID not found" });
  });
};
