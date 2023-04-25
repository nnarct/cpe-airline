import { db } from "../index.js";

import bcrypt from "bcrypt";
export const register =  (req, res) => {
  const sqlCheck = `SELECT * FROM user WHERE email = "${req.body.email}"`;
  const sql =
    "INSERT INTO user (FirstName, LastName, Email, TelNo, Password) VALUES (?)";
  db.query(sqlCheck, (err, response) => {
    if (err) return res.json({ Error: "Error while checking email in db..." });
    if (response.length > 0)
      return res.json({ Error: "Email is already exist." });
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
      if (err) return res.json({ Error: "Error while hashing password !" });
      const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.telNo,
        hash,
      ];
      db.query(sql, [values], (err, result) => {
        if (err)
          return res.json({ Error: "Inserting data error in server..." });
        return res.json({ Status: "Create new user successfully! :)" });
      });
    });
  });
}