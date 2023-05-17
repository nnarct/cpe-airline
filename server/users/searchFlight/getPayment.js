import { db } from "../../index.js";

export const getPayment = (req, res) => {
  const sql = "SELECT * FROM payment";
  db.query(sql, (err, data) => {
    if (err)
      return res.json({ Error: "Error in server while getting payment" });
    if (data.length > 0) return res.json({ Status: "Success", Payments: data });
    else return res.json({ Error: "No payment found" });
  });
};
