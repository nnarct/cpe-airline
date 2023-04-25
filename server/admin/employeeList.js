import { db } from "../index.js";
export const employeeList = (req, res) => {
  const sql = "SELECT * FROM employee";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ Error: "Select employee list error in server..." });
    }
    if (data.length > 0) {
      return res.json({
        Status: "Successfully select employee list",
        Data: data,
      });
    } else {
      return res.json({ Error: "Employee List not found" });
    }
  });
};
