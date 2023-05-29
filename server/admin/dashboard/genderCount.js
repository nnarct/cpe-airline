import { db } from "../../index.js";

export const genderCount = (req, res) => {
  const query = `
    SELECT a.AirlineID, a.Name AS AirlineName, 
      SUM(CASE WHEN p.Gender = 'Male' THEN 1 ELSE 0 END) AS MaleCount,
      SUM(CASE WHEN p.Gender = 'Female' THEN 1 ELSE 0 END) AS FemaleCount
    FROM airline AS a
    JOIN flight AS f ON a.AirlineID = f.AirlineID
    JOIN booking AS b ON f.FlightID = b.FlightID
    JOIN passenger AS p ON b.BookingID = p.BookingID
    GROUP BY a.AirlineID, a.Name
  `;
  
  db.query(query, (err, data) => {
    if (err) {
      return res.json({ Error: "Retrieve gender counts error in server..." });
    }
    
    const genderCountsByAirline = data.reduce((counts, row) => {
      const { AirlineID, AirlineName, MaleCount, FemaleCount } = row;
      counts[AirlineID] = { AirlineName, MaleCount, FemaleCount };
      return counts;
    }, {});
    
    return res.json({
      Status: "Successfully retrieved gender counts by airline",
      GenderCountsByAirline: genderCountsByAirline,
    });
  });
};