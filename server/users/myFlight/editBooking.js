import { db } from "../../index.js";
export const editBooking = (req, res) => {
  const sql = `
    UPDATE
      booking
    SET
      ContactFirstname = ?,
      ContactLastname = ?,
      ContactPhone = ?,
      ContactEmail = ?
    WHERE
      BookingID = ? ; `;

  db.query(
    sql,
    [
      req.body.fname,
      req.body.lname,
      req.body.telno,
      req.body.email,
      req.body.id,
    ],
    (err, data) => {
      if (err) return res.json({ Error: "Error while editing contact..." });
      else return res.json({ Status: "Edit contact successfully." });
    }
  );
};

export const editPassengerInBooking = (req, res) => {
  const sql = `UPDATE 
        passenger 
    SET 
        FirstName = ? ,
        LastName = ?,
        Nationality = ?,
    WHERE
        PassengerID = ? ; `;
  db.query(
    sql,
    [req.body.fname, req.body.lname, req.body.nationality, req.body.id],
    (err, response) => {
      if (err) return res.json({ Error: "Error while editing passenger..." });
      else return res.json({ Status: "Edit passenger successfully." });
    }
  );
};
