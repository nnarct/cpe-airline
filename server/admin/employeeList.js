import { db } from "../index.js";
export const employeeList = (req, res) => {
  const sql = "SELECT e.EmployeeID, e.FirstName, e.LastName, e.username, e.Email, e.TelNo, e.Position, e.AirlineID, a.Name AS airline FROM employee e LEFT JOIN airline a ON a.AirlineID = e.AirlineID";
  const sqlAirline = "SELECT AirlineID, Name FROM airline";
  let airlines = [];
  db.query(sqlAirline,(err,data)=>{
    if (err) {
      return res.json({ Error: "Select airline list error in server..." });
    }
    if (data.length > 0) {
      airlines = data;
    } else {
      return res.json({ Error: "Airline List not found" });
    }
  })
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ Error: "Select employee list error in server..." });
    }
    if (data.length > 0) {
      return res.json({
        Status: "Successfully select employee list",
        Data: data,
        Airlines:airlines,
      });
    } else {
      return res.json({ Error: "Employee List not found" });
    }
  });
};
