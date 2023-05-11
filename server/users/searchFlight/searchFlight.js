import { db } from "../../index.js";

export const SearchFlights = (req, res) => {
  const sql =
    "SELECT * FROM flight WHERE OriginAirportID = ? AND DestinationAirportID = ? AND DepartureTime LIKE ?;";
  db.query(
    sql,
    [req.body.from, req.body.to, req.body.departure + "%"],
    (err, response) => {
      if (err) {
        console.log(err);
        return res.json({ Error: "Error while searching flight in db..." });
      }
      if (response.length > 0)
        return res.json({ Status: "Success", Flights: response });
      return res.json({ Error: "No flight found." });
    }
  );
};
