import { db } from "../../index.js";
export const cancelBooking = (req, res) => {
  const booking = "UPDATE Booking SET Status = 0 WHERE BookingID=?";
  const passenger = "DELETE FROM Passenger WHERE BookingID=?";
  db.query(booking, [req.body.id], (err, data) => {
    if (err) {
      return res.json({ Error: "Error while cancel booking..." });
    }
    db.query(passenger, [req.body.id], (err, data) => {
      if (err) return res.json({ Error: "Error while deleting passenger..." });
      else return res.json({ Status: "Cancel booking successfully! :)" });
    });
  });
};
