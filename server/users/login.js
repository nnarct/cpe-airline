import { db } from "../index.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
export const login = (req, res) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      return res.json({ Error: "Login error in server..." });
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error..." });
          if (response) {
            const UserID = data[0].UserID;
            const FirstName = data[0].FirstName;
            const LastName = data[0].LastName;
            const token = jwt.sign(
              { UserID, FirstName, LastName },
              "user-secret-key",
              {
                expiresIn: "1d",
              }
            );
            res.cookie("userToken", token);
            return res.json({ Status: "Successfully login" });
          } else {
            return res.json({ Error: "Password does not match..." });
          }
        }
      );
    } else return res.json({ Error: "Data not found" });
  });
};
