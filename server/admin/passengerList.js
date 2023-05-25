import { db } from "../index.js";
export const passengerList = (req, res) => {
  const sql = "SELECT * FROM passenger";
  db.query(sql, (err, data) => {
    if (err)
      return res.json({ Error: "Select passenger list error in server..." });
    return data.length > 0 ? res.json({
      Status: "Successfully select passenger list",
      Data: data,
    }) : res.json({ Error: "Passenger List not found" });
  });
};
export const passengerListGroupByBooking = (req, res) => {
  const sql = "SELECT * FROM passenger GROUP BY BookingID DESC";
  db.query(sql, (err, data) => {
    if (err)
      return res.json({ Error: "Select passenger list error in server..." });
    return data.length > 0 ? res.json({
      Status: "Successfully select passenger list",
      Data: data,
    }) : res.json({ Error: "Passenger List not found" });
  });
};
