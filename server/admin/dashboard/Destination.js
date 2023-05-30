import { db } from "../../index.js";

export const getFlightCountsBySection = (req, res) => {
  const airlineIds = ["1", "2", "3", "4", "5", "6", "7"];
  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const nextMonthDate = new Date();
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  const nextMonthDateString = nextMonthDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const query = `SELECT a.Section, ${airlineIds
    .map(
      (id, index) =>
        `COUNT(CASE WHEN f.AirlineID = '${id}' THEN 1 END) AS Airline${
          index + 1
        }Count`
    )
    .join(
      ","
    )} FROM airport AS a JOIN flight AS f ON a.AirportID = f.DestinationAirportID WHERE f.AirlineID IN ('${airlineIds.join(
    "','"
  )}') AND f.ArrivalTime BETWEEN '${currentDate}' AND '${nextMonthDateString}' GROUP BY a.Section`;
  const airline = "SELECT Name FROM airline;";
  db.query(query, (err, data) => {
    if (err) {
      return res.json({ Error: "Retrieve flight counts error in Server..." });
    }

    const flightCountsBySection = {};

    data.forEach((row) => {
      const section = row.Section;
      const counts = {};
      airlineIds.forEach((id, index) => {
        counts[`Count${index + 1}`] = row[`Airline${index + 1}Count`];
      });
      flightCountsBySection[section] = counts;
    });
    db.query(airline, (err, airlineName) => {
      if (err)
        return res.json({ Error: "Select airline list error in server..." });
      if (airlineName.length > 0) {
        return res.json({
          Status: "Successfully select airline name",
          FlightCountsBySection: flightCountsBySection,
          Airlinename: airlineName,
        });
      } else {
        return res.json({ Error: "Airline name not found" });
      }
    });
  });
};
