import { db } from "../../index.js";

export const getAddonsCountByAirport = (req, res) => {
  const query = `
  SELECT a.AirportID, a.IATA, SUM(CASE WHEN AddOnsID IS NULL THEN 0 ELSE 1 END) AS AddonsCount
  FROM airport AS a
  JOIN flight AS f ON a.AirportID = f.DestinationAirportID
  JOIN booking AS b ON f.FlightID = b.FlightID
  JOIN passenger AS p ON b.BookingID = p.BookingID
  GROUP BY a.AirportID, a.IATA;
  `;

  db.query(query, (err, data) => {
    if (err) {
      return res.json({ Error: "Retrieve addons count error in Server..." });
    }

    const addonsCountByAirport = data.reduce((counts, row) => {
      const { AirportID, IATA, AddonsCount } = row;
      counts[AirportID] = { IATA, AddonsCount };
      return counts;
    }, {});

    return res.json({ AddonsCountByAirport: addonsCountByAirport });
  });
};
