import { db } from "../../index.js";
export const insertPlane = (req,res) => {
  const sql = "INSERT INTO plane (AirlineID, PlaneModel, SeatingPlan) VALUES (?)";
    const values = [
      req.body.AirlineID,
      req.body.PlaneModel,
      req.body.SeatingPlane
    ];
    db.query(sql, [values], (err, result) => {
      if (err)
        {console.log(err); return res.json({ Error: "Inserting data error in server..." });}
      return res.json({ Status: "Create new plane successfully! :)" });
    });
  };
