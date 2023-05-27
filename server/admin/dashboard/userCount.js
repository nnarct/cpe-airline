import { db } from "../../index.js";

export const userCount = (req, res) => {
  const sql = "SELECT COUNT(UserID) AS userCount FROM user;";
  db.query(sql, (err, data) => {
    if (err)
      return res.json({ Error: "Select user count error in server..." });
    const count = data[0];
    const userCount = parseInt(count.userCount);
    return res.json({
      Status: "Successfully retrieved user count",
      UserCount: userCount,
    });
  });
};
