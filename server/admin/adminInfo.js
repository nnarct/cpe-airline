import jwt from "jsonwebtoken";
export const adminInfo = (req, res) => {
  if (req.body.cookieID) {
    jwt.verify(req.body.cookieID, "admin-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Admin token is not ok" });
      delete decoded.info.Password;
      return res.json({ Status: "Success", Info: decoded.info});
    });
  }
  else return res.json({ Error: "You are not authenticated admin" });
};