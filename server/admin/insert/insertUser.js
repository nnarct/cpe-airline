import { db } from "../../index.js";
export const insertUser = (req, res) => {
  const sql = "INSERT INTO user (FirstName, LastName, Email, TelNo) VALUES (?)";
  const values = [req.body.FirstName, req.body.LastName, req.body.Email, req.body.TelNo];
  db.query(sql, [values], (err, result) => {
    if (err) 
    {console.log(err); return res.json({ Error: "Inserting data error in server..." });}
    return res.json({ Status: "Create new user successfully! :)" });
  });
};
