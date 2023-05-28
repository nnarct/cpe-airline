import { db } from "../../index.js";
export const editAirport = (req, res) => {
  const sql = "UPDATE airport SET Name = ?, IATA = ?, State = ? , Province = ?, section = ? WHERE AirportID =?";
  db.query(sql, [req.body.Name, req.body.IATA, req.body.State, req.body.Province, req.body.Section, req.body.id], (err, result) => {
    if(err)
      return res.json({Error: "Error while editing airport..."});
    return res.json({Status: "Edit airport successfully! :)"});
  })

}