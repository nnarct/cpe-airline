import { db } from "../../index.js";
export const deleteEmployee = (req, res) => {
  const sql = "DELETE FROM employee WHERE EmployeeID = ?";
  db.query(sql, [req.body.id], (err, result) => {
    if (err) return res.json({ Error: "Error while deleting employee..." });
    return res.json({ Status: "Delete employee successfully! :)" });
  });
};
