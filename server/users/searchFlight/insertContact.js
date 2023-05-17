import { db } from "../../index.js";
export const insertContact = (req, res) => {
  console.log(req.body);
  // const sql = "INSERT INTO passenger (FirstName, LastName, Nationality) VALUES ?";
  // db.query(sql, re, (err, result) => {
  //   if (err) console.log(err);
  //   else console.log(result);
  //   console.log("inserted");
  // });
};
