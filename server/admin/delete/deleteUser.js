import { db } from "../../index.js";
export const deleteUser = (req, res) => {
  const sql = "DELETE FROM user WHERE UserID = ?";
  db.query(sql, [req.body.id], (err, result) => {
    if (err) return res.json({ Error: "Error while deleting user..." });
    return res.json({ Status: "Delete user successfully! :)" });
  });
};
