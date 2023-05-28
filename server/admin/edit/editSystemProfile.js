import { db } from "../../index.js";

export const editSystemProfile = (req, res) => {
  const sql =
    "UPDATE employee SET FirstName = ?, LastName = ?, Email = ?, TelNo = ? WHERE EmployeeID =?";
  db.query(
    sql,
    [
      req.body.FirstName,
      req.body.LastName,
      req.body.Email,
      req.body.TelNo,
      req.body.EmployeeID,
    ],
    (err, result) => {
      if (err) {
        return res.json({ Error: "Error while editing system profile..." });
      }
      return res.json({ Status: "Edit system profile successfully! :)" });
    }
  );
};
