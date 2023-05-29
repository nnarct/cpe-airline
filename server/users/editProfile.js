import { db } from "../index.js";

export const editProfile = (req, res) => {
  const sqlCheck = "SELECT UserID FROM user WHERE Email = ? AND UserID != ?";
  const sql =
    "UPDATE user SET FirstName = ?, LastName = ?, Email = ?, TelNo = ? WHERE UserID =?";
  db.query(sqlCheck, [req.body.Email, req.body.id], (error, data) => {
    if (error)
      return res.json({ Error: "Error while checking email unique..." });
    if (data.length > 0) return res.json({ Error: "Email already exists..." });
    db.query(
      sql,
      [
        req.body.FirstName,
        req.body.LastName,
        req.body.Email,
        req.body.TelNo,
        req.body.id,
      ],
      (err, result) => {
        if (err) {
          return res.json({ Error: "Error while editing user..." });
        }
        return res.json({ Status: "Edit user successfully! :)" });
      }
    );
  });
};
