import { db } from "../../index.js";

export const editPassenger = (req, res) => {
  const sql =
    "UPDATE passenger SET FirstName = ?, LastName = ?, DOB = ?, Nationality = ? , Gender = ? WHERE PassengerID =?";
  db.query(
    sql,
    [
      req.body.FirstName,
      req.body.LastName,
      `${req.body.DOB} 00:00:00`,
      req.body.Nationality,
      req.body.Gender,
      req.body.id,
    ],
    (err, data) => {
      if (err) return res.json({ Error: "Edit passenger error in server..." });
      return data.affectedRows > 0
        ? res.json({ Status: "Successfully edit passenger" })
        : res.json({ Error: `No passenger id ${req.body.id}...` });
    }
  );
};
