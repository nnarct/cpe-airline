import { db } from "../index.js";

import bcrypt from "bcrypt";
export const login = (req, res) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Login error in server..." });
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error..." });
          if (response) {
            const firstName = data[0].firstName;
            const token = jwt.sign({ firstName }, "jwt-secret-key", {
              expiresIn: "1d",
            });
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
