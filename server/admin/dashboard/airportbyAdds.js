import { db } from "../../index.js";

export const getAddonsCountByAirport = (req, res) => {
  const query = `
    SELECT a.AirportID, a.IATA, COUNT(ad.AddonsID) AS AddonsCount
    FROM airport AS a
    JOIN flight AS f ON a.AirportID = f.DestinationAirportID
    JOIN addons AS ad ON f.FlightID = ad.FlightID
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