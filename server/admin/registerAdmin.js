import { db } from "../index.js";

import bcrypt from "bcrypt";
export const registerAdmin = (req, res) => {
  const sqlCheck = `SELECT * FROM employee WHERE username = ?`;
  const sql =
    "INSERT INTO employee (FirstName, LastName, username, Email, TelNo, Password, Position, AirlineID) VALUES (?)";
  db.query(sqlCheck, [req.body.username], (err, response) => {
    if (err)
      return res.json({ Error: "Error while checking username in db..." });
    if (response.length > 0)
      return res.json({ Error: "Username is already exist." });
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
      if (err) return res.json({ Error: "Error while hashing password !" });
      const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.username,
        req.body.email,
        req.body.TelNo,
        hash,
        req.body.position,
        req.body.airlineID,
      ];
      db.query(sql, [values], (err, result) => {
        if (err)
          return res.json({ Error: "Inserting data error in server..." });
        return res.json({ Status: "Create new admin successfully! :)" });
      });
    });
  });
};
