import jwt from "jsonwebtoken";
export const verifyAdmin = (req, res, next) => {
  const admin = req.cookies.admin;
  if (!admin) return res.json({ Status: "You are not authenticated admin" });
  else {
    jwt.verify(admin, "admin-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Admin token is not ok" });
      else {
        req.Info = decoded.info;
        next();
      }
    });
  }
};

export const verifyAdminRes = (req, res) => {
  return res.json({ Status: "Success", Info: req.Info });
}