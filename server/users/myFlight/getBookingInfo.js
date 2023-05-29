import { db } from "../../index.js";
export const getBookingInfo = (req, res) =>{
   
    const sql = 
    "SELECT b.ContactFirstname,b.ContactLastname,b.ContactPhone,b.ContactEmail,p.FirstName,p.LastName,i.Class,s.SeatCode,ad.Weight FROM passenger p INNER JOIN booking b  ON b.BookingID=p.BookingID inner JOIN invoice i ON b.InvoiceID=i.InvoiceID left JOIN seat s ON p.SeatID=s.SeatID left JOIN addons ad ON p.AddOnsID=ad.AddOnsID WHERE b.BookingID=?";
    console.log(req.body)
    db.query(sql, [req.body.id], (err, data) => {
        if (err){
            return res.json({ Error: "Error while get booking info..." });
        }
        if(data.length > 0)
            return res.json({ Status: "Success", Info: data });
        else return res.json({ Error: "No booking info found."});
      }
    );
  };
