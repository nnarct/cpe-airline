import { db } from "../index.js";
export const flightList = (req, res) => {
  const sql =
    `SELECT
    f.*,
    premium.Price AS PremiumPrice,
    premium.PriceID AS PremiumPriceID,
    economy.Price AS EconomyPrice,
    economy.PriceID AS EconomyPriceID,
    dap.IATA AS desIATA,
    oap.IATA AS oriIATA,
    al.Name AS airline
      FROM
          flight f
      INNER JOIN Airport AS dap
      ON
          dap.AirportID = f.DestinationAirportID
      INNER JOIN Airport AS oap
      ON
          oap.AirportID = f.OriginAirportID
      INNER JOIN Airline AS al
      ON
          al.AirlineID = f.AirlineID
      LEFT JOIN price premium ON
          f.FlightID = premium.FlightID AND premium.ClassID =(
          SELECT
              ClassID
          FROM
              class
          WHERE NAME
              = 'Premium Economy' AND PlaneID = f.PlaneID
      )
      LEFT JOIN price economy ON
          f.FlightID = economy.FlightID AND economy.ClassID =(
          SELECT
              ClassID
          FROM
              class
          WHERE NAME
              = 'Economy' AND PlaneID = f.PlaneID
      )
      LEFT JOIN class c_premium ON
          premium.ClassID = c_premium.ClassID
      LEFT JOIN class c_economy ON
          economy.ClassID = c_economy.ClassID
      WHERE
          (
              c_premium.Name = 'Premium Economy' OR c_premium.Name IS NULL
          ) AND(
              c_economy.Name = 'Economy' OR c_economy.Name IS NULL
          )
      ORDER BY
          f.FlightID;`;
  const sqlAirports = "SELECT AirportID, Name, IATA FROM airport";
  const sqlAirlines = "SELECT AirlineID, Name, Link FROM airline";
  let airports = [];
  let airlines = [];
  db.query(sqlAirports, (err, data) => {
    if (data.length > 0) airports = data;
    else return res.json({ Error: "Error", SQL: "Airport List not found" });
  });
  db.query(sqlAirlines, (err, data) => {
    if (data.length > 0) airlines = data;
    else return res.json({ Error: "Error", SQL: "Airline List not found" });
  });
  db.query(sql, (err, data) => {
    if (err)
      return res.json({
        Error: "Select flight list error in server...",
        SQL: err.sqlMessage,
      });

    if (data.length > 0) {
      return res.json({
        Status: "Successfully select flight list",
        Data: data,
        Airports: airports,
        Airlines: airlines,
      });
    } else return res.json({ Error: "Flight List not found" });
  });
};

export const flightListSort = (req, res) => {
  const sql =
    "SELECT f.*, dap.IATA as desIATA, oap.IATA as oriIATA , al.Name as airline FROM flight f INNER JOIN Airport AS dap ON dap.AirportID = f.DestinationAirportID INNER JOIN Airport as oap ON oap.AirportID = f.OriginAirportID INNER JOIN Airline AS al on al.AirlineID = f.AirlineID WHERE al.Name LIKE ? ORDER BY f.FlightID;";
  const sqlAirports = "SELECT AirportID, Name, IATA FROM airport";
  const sqlAirlines = "SELECT AirlineID, Name, Link FROM airline";
  let airports = [];
  let airlines = [];
  db.query(sqlAirports, (err, data) => {
    if (data.length > 0) airports = data;
    else return res.json({ Error: "Error", SQL: "Airport List not found" });
  });
  db.query(sqlAirlines, (err, data) => {
    if (data.length > 0) airlines = data;
    else return res.json({ Error: "Error", SQL: "Airline List not found" });
  });
  db.query(sql, (err, data) => {
    if (err)
      return res.json({
        Error: "Select flight list error in server...",
        SQL: err.sqlMessage,
      });

    return data.length > 0
      ? res.json({
          Status: "Successfully select flight list",
          Data: data,
          Airports: airports,
          Airlines: airlines,
        })
      : res.json({ Error: "Flight List not found" });
  });
};
