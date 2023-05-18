import jwt from "jsonwebtoken";
import { db } from "../../index.js";
export const insertBooking = (req, res) => {
  const payment = req.body.payment;
  const contact = req.body.contact;
  const passenger = req.body.passenger;
  const isReturn = req.body.isReturn;
  const departureFlightID = req.body.departureFlightID;
  const returnFlightID = isReturn === "1" ? req.body.returnFlightID : null;
  let UserID = "";
  const userToken = req.cookies.userToken;
  if (!userToken) return res.json({ Error: "You are not logged in user" });
  else {
    jwt.verify(userToken, "user-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "User token is not ok" });
      else UserID = decoded.UserID;
    });
  }

  const sqlInvoice =
    payment.PaymentID === 2
      ? "INSERT INTO `invoice` (`PaymentID`, `BillTo`, `Total`, `PromptpayNumber`) VALUES (?,?,?,?)"
      : "INSERT INTO `invoice` (`PaymentID`, `BillTo`, `Total`, `CardNumber`, `CVV` ,`ExpDate`) VALUES (?,?,?,?,?,?)";
  const invoiceValue =
    payment.PaymentID === 2
      ? [
          payment.PaymentID,
          payment.BillTo,
          req.body.Total,
          payment.PromtpayNumber,
        ]
      : [
          payment.PaymentID,
          payment.BillTo,
          req.body.Total,
          payment.CardNumber,
          payment.CVV,
          payment.ExpDate,
        ];

  const sqlDepBooking =
    "INSERT INTO `booking` (`UserID`, `ContactFirstname`, `ContactLastname`, `ContactPhone`, `ContactEmail`, `FlightID`,`InvoiceID`) VALUES (?,?,?,?,?,?,?)";

  const sqlPassenger =
    "INSERT INTO `passenger` (`FirstName`, `LastName`, `DOB`, `Gender` ,`Nationality`, `BookingID`) VALUES (?,?,?,?,?,?)";

  db.query(sqlInvoice, invoiceValue, (err, result) => {
    if (err) res.json({ Error: "Error while creating invoice in server" });
    else {
      const invoiceID = result.insertId;
      db.query(
        sqlDepBooking,
        [
          UserID,
          contact.firstname,
          contact.lastname,
          contact.phone,
          contact.email,
          departureFlightID,
          Number(invoiceID),
        ],
        (err, result) => {
          if (err)
            res.json({
              Error: "Error while creating departure booking in server",
            });
          else {
            const bookingID = result.insertId;
            passenger.forEach((p) => {
              db.query(
                sqlPassenger,
                [
                  p.firstname,
                  p.lastname,
                  JSON.parse(p.dob).startDate + " 00:00:00",
                  p.gender,
                  p.nationality,
                  Number(bookingID),
                ],
                (err, result) => {
                  if (err)
                    res.json({
                      Error:
                        "Error while creating departure passenger in server",
                    });
                }
              );
            });
          }
        }
      );
      if (isReturn) {
        db.query(
          sqlDepBooking,
          [
            UserID,
            contact.firstname,
            contact.lastname,
            contact.phone,
            contact.email,
            returnFlightID,
            Number(invoiceID),
          ],
          (err, result) => {
            if (err)
              res.json({
                Error: "Error while creating return flight booking in server",
              });
            else {
              const bookingID = result.insertId;
              passenger.forEach((p) => {
                db.query(
                  sqlPassenger,
                  [
                    p.firstname,
                    p.lastname,
                    JSON.parse(p.dob).startDate + " 00:00:00",
                    p.gender,
                    p.nationality,
                    Number(bookingID),
                  ],
                  (err, result) => {
                    if (err)
                      res.json({
                        Error:
                          "Error while creating return passenger in server",
                      });
                  }
                );
              });
              return res.json({ Status: "Success" });
            }
          }
        );
      } else {
        return res.json({ Status: "Success" });
      }
    }
  });
};
