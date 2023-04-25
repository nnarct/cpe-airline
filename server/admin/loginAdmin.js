import { db } from "..";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const loginAdmin = (req, res) => {
  const sql = "SELECT * FROM employee WHERE username = ?";
  db.query(sql, [req.body.username], (err, data) => {
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
            const info = data[0];
            const token = jwt.sign({ info }, "admin-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("admin", token);
            return res.json({
              Status: "Successfully login admin",
              Position: data[0].Position,
            });
          } else {
            return res.json({ Error: "Password does not match..." });
          }
        }
      );
    } else return res.json({ Error: "Data not found" });
  });
}