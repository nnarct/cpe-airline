import { db } from "../index.js";
export const userList = (req, res) => {
  const sql = "SELECT UserID, FirstName, LastName, Email, TelNo FROM user";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Select user list error in server..." });
    }
    if (data.length > 0) {
      return res.json({
        Status: "Successfully select user list",
        Data: data,
      });
    } else {
      return res.json({ Error: "User List not found" });
    }
  });
}