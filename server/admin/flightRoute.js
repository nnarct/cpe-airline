import { db } from "../index.js";
export const routeList = (req, res) => {
  const sql = "SELECT * FROM route";
  db.query(sql, (err, data) => {
    if (err) return res.json({ Error: "Select route list error in server..." });
    if (data.length > 0) {
      return res.json({
        Status: "Successfully route airline list",
        Data: data,
      });
    } else {
      return res.json({ Error: "Route List not found" });
    }
  });
};
