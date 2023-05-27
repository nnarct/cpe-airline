import { db } from "../../index.js";

export const bookingCount = (req, res) => {
    const sql = "SELECT COUNT(BookingID) AS bookCount FROM booking AS b JOIN invoice AS i ON b.InvoiceID = i.InvoiceID WHERE i.Date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW();"
    db.query(sql, (err, data) => {
    if(err)
    return res.json({Error: "Select count error in server..."});
    const count = data[0];
    const bookcount = parseInt(count.bookCount);
    return res.json({
      Status: "Succesfully retreived booking count",
      BookingCount: bookcount,
    });
    });
  };