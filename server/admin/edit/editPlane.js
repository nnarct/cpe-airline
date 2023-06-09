import { db } from "../../index.js";
export const editPlane = (req, res) => {
  const sql =
    "UPDATE plane SET AirlineID = ?, PlaneModel = ? WHERE PlaneID = ?";
  db.query( sql, [req.body.AirlineID, req.body.PlaneModel, req.body.id], (err, result) => {
      if (err) return res.json({ Error: "Error while editing plane..." });
      return res.json({ Status: "Edit plane successfully! :)" });
    }
  );
};
