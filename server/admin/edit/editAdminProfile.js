import { db } from "../../index.js";

export const editAdminProfile = (req, res) => {
  const sql =
    "UPDATE employee SET FirstName = ?, LastName = ?, Email = ?, TelNo = ?, AirlineID = ? WHERE EmployeeID =?";
  db.query(
    sql,
    [
      req.body.FirstName,
      req.body.LastName,
      req.body.Email,
      req.body.TelNo,
      req.body.AirlineID,
      req.body.EmployeeID,
    ],
    (err, result) => {
      if (err) {
        return res.json({ Error: "Error while editing admin profile..." });
      }
      return res.json({ Status: "Edit admin profile successfully! :)" });
    }
  );
};
