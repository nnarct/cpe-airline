import { db } from "../../index.js";
export const editBooking = (req, res) => {
  const sql =
    "UPDATE booking SET ContactFirstname=?,ContactLastname=?,ContactPhone=?,ContactEmail=? WHERE BookingID=?";
  db.query(
    sql,
    [req.body.fname, req.body.lname, req.body.email, req.body.telno],
    (err, data) => {
      if (err) {
        return res.json({ Error: "Error while editing contact..." });
      } else return res.json({ Error: "No booking info found." });
    }
  );
};

export const editPassenger = (req, res) => {
  const sql =
    "UPDATE passenger SET FirstName=?,DOB = ?,Gender = ?,LastName=?, Nationality = ? WHERE PassengerID=?";
  db.query(sql, [req.body.fname, req.body.lname, req.body.id], (err, data) => {
    if (err) {
      return res.json({ Error: "Error while editing passenger..." });
    } else return res.json({ Error: "No booking info found." });
  });
};
