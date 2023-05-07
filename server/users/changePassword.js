import { db } from "../index.js";
import bcrypt from "bcrypt";

export const changePassword = (req, res) => {
  const sqlCheck = "SELECT Password FROM user WHERE UserID = ?";
  const sql = "UPDATE user SET Password = ? WHERE UserID = ?";
  db.query(sqlCheck, [req.body.id], (error, data) => {
    if (error)
      return res.json({ Error: "Error in server while checking password..." });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.oldPass.toString(),
        data[0].Password,
        (err, response) => {
          if (err)
            return res.json({ Error: "Password compare error in server..." });
          if (response)
            bcrypt.hash(req.body.newPass.toString(), 10, (ERR, hash) => {
              if (ERR)
                return res.json({ Error: "Error while hashing password !" });
              db.query(sql, [hash, req.body.id], (ERROR, result) => {
                if (ERROR)
                  return res.json({
                    Error: "Error in server while changing password...",
                  });
                return res.json({ Status: "Change password successfully! :)" });
              });
            });
          else res.json({ Error: "Current password is not correct." });
        }
      );
    }
  });
};
