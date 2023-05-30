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
      ? "INSERT INTO `invoice` (`PaymentID`, `BillTo`, `Total`, `PromptpayNumber`,`Class`) VALUES (?,?,?,?,?)"
      : "INSERT INTO `invoice` (`PaymentID`, `BillTo`, `Total`, `CardNumber`, `CVV` ,`ExpDate`, `Class`) VALUES (?,?,?,?,?,?,?)";
  const invoiceValue =
    payment.PaymentID === 2
      ? [
          payment.PaymentID,
          payment.BillTo,
          contact.Total,
          payment.PromtpayNumber,
          contact.Class,
        ]
      : [
          payment.PaymentID,
          payment.BillTo,
          contact.Total,
          payment.CardNumber,
          payment.CVV,
          payment.ExpDate,
          contact.Class,
        ];

  const sqlDepBooking =
    "INSERT INTO `booking` (`UserID`, `ContactFirstname`, `ContactLastname`, `ContactPhone`, `ContactEmail`, `FlightID`,`InvoiceID`,`Protection`) VALUES (?,?,?,?,?,?,?,?)";

  const sqlPassenger =
    "INSERT INTO `passenger` (`FirstName`, `LastName`, `DOB`, `Gender` ,`Nationality`, `BookingID`, `AddOnsID`, `SeatID`) VALUES (?,?,?,?,?,?,?,?)";
  db.query(sqlInvoice, invoiceValue, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Error while creating invoice in server" });
    } else {
      const invoiceID = result.insertId;
      db.query(
        sqlDepBooking,
        [
          UserID,
          contact.FirstName,
          contact.LastName,
          contact.phone,
          contact.email,
          departureFlightID,
          Number(invoiceID),
          contact.Protection ? 1 : 0,
        ],
        (err, result) => {
          if (err)
            return res.json({
              Error: "Error while creating departure booking in server",
            });
          else {
            const bookingID = result.insertId;
            passenger.forEach((p) => {
              db.query(
                sqlPassenger,
                [
                  p.FirstName,
                  p.LastName,
                  JSON.parse(p.dob).startDate + " 00:00:00",
                  p.gender,
                  p.nationality,
                  Number(bookingID),
                  p.addondep,
                  p.DepSeatID,
                ],
                (err, result) => {
                  if (err)
                    return res.json({
                      Error:
                        "Error while creating departure passenger in server",
                    });
                }
              );
            });
          }
        }
      );
      if (isReturn === 1 || isReturn === "1") {
        db.query(
          sqlDepBooking,
          [
            UserID,
            contact.FirstName,
            contact.LastName,
            contact.phone,
            contact.email,
            returnFlightID,
            Number(invoiceID),
            contact.Protection ? 1 : 0,
          ],
          (err, result) => {
            if (err)
              return res.json({
                Error: "Error while creating return flight booking in server",
              });
            else {
              const bookingID = result.insertId;
              passenger.forEach((p) => {
                db.query(
                  sqlPassenger,
                  [
                    p.FirstName,
                    p.LastName,
                    JSON.parse(p.dob).startDate + " 00:00:00",
                    p.gender,
                    p.nationality,
                    Number(bookingID),
                    p.addonret,
                    p.RetSeatID,
                  ],
                  (err, result) => {
                    if (err)
                      return res.json({
                        Error:
                          "Error while creating return passenger in server",
                      });
                  }
                );
              });
              return res.json({ Status: "Success", ID: invoiceID });
            }
          }
        );
      } else {
        return res.json({ Status: "Success", ID: invoiceID });
      }
    }
  });
};
