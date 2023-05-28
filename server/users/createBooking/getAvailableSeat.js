import e from "express";
import { db } from "../../index.js";

export const getAvailableSeat = (req, res) => {
  const sql = `SELECT s.*, c.Name AS Class FROM seat s INNER JOIN class c ON c.ClassID = s.ClassID INNER JOIN plane pl ON pl.PlaneID = c.PlaneID LEFT JOIN passenger p ON p.SeatID = s.SeatID LEFT JOIN booking b ON b.BookingID = p.BookingID AND b.FlightID = ? WHERE pl.AirlineID = (  SELECT AirlineID FROM flight WHERE FlightID = ? ) AND b.BookingID IS NULL ORDER BY s.SeatCode `;
  const sqlBooked = `SELECT s.* FROM seat s INNER JOIN class c ON c.ClassID = s.ClassID INNER JOIN plane pl ON pl.PlaneID = c.PlaneID INNER JOIN passenger p ON p.SeatID = s.SeatID INNER JOIN booking b ON b.BookingID = p.BookingID WHERE pl.AirlineID = ( SELECT AirlineID FROM flight WHERE FlightID = ? ) AND b.FlightID = ?;`;
  const sqlAllSeat = "SELECT s.*, c.Name AS Class FROM seat s INNER JOIN class c ON c.ClassID = s.ClassID INNER JOIN plane pl ON pl.PlaneID = c.PlaneID INNER JOIN flight f ON f.PlaneID = pl.PlaneID AND f.FlightID = ? WHERE pl.AirlineID = (SELECT AirlineID FROM flight WHERE FlightID = ?) ORDER BY s.SeatCode" 
  let availableDepartureSeat = [];
  let availableReturnSeat = [];
  let bookedDepartureSeat = [];
  let bookedReturnSeat = [];
  db.query(
    sqlAllSeat,
    [req.body.departureFlightID, req.body.departureFlightID],
    (err, dep) => {
      if (err) {
        console.log("here1", err);
        res.json({
          Error: "Error while selecting available departure flight seats",
        });
      } else if (dep.length > 0) {
        availableDepartureSeat = dep;
        if (req.body.isReturn === "1") {
          db.query(
            sqlAllSeat,
            [req.body.returnFlightID, req.body.returnFlightID],
            (err, ret) => {
              if (err) {
                console.log("here2", err);
                res.json({
                  Error: "Error while selecting available return flight seats",
                });
              } else if (ret.length > 0) {
                availableReturnSeat = ret;
                db.query(
                  sqlBooked,
                  [req.body.departureFlightID, req.body.departureFlightID],
                  (err, dep) => {
                    if (err) {
                      console.log(err);
                      res.json({ Error: "Error while select booked departure flight seat" });
                    } else {
                      bookedDepartureSeat = dep;
                      if (req.body.isReturn === "1") {
                        db.query(
                          sqlBooked,
                          [req.body.returnFlightID, req.body.returnFlightID],
                          (err, ret) => {
                            if (err) {
                              console.log(err);
                              res.json({
                                Error: "Error while select booked return flight seat",
                              });
                            } else {
                              bookedReturnSeat = ret;
                              return res.json({
                                Status: "Success",
                                availableDepartureSeat: availableDepartureSeat,
                                availableReturnSeat: availableReturnSeat,
                                bookedDepartureSeat: bookedDepartureSeat,
                                bookedReturnSeat: bookedReturnSeat,
                              });
                            }
                          }
                        );
                      }
                    }
                  }
                );
              } else {
                res.json({
                  Status: "Error",
                  Error: "No return seat available",
                });
              }
            }
          );
        }
      } else {
        res.json({ Status: "Error", Error: "No departure seat available" });
      }
    }
  );
};
