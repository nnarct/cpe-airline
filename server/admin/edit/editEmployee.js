import { db } from "../../index.js";

export const editEmployee = (req, res) => {
  const sql =
    "UPDATE employee SET FirstName = ?, LastName = ?, Email = ?, TelNo = ?, Position = ?, AirlineID = ? WHERE EmployeeID =?";
  db.query(
    sql,
    [
      req.body.FirstName,
      req.body.LastName,
      req.body.Email,
      req.body.TelNo,
      req.body.Position,
      req.body.AirlineID,
      req.body.id,
    ],
    (err, result) => {
      if (err) {
        return res.json({ Error: "Error while editing employee..." });
      }
      return res.json({ Status: "Edit employee successfully! :)" });
    }
  );
}