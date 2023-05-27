import jwt from "jsonwebtoken";
export const verifyAdmin = (req, res, next) => {
  const admin = req.cookies.admin;
  if (admin) {
    jwt.verify(admin, "admin-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Admin token is not ok" });
      req.Info = decoded.info;
      next();
    });
  }
  else return res.json({ Status: "You are not authenticated admin" });
};

export const verifyAdminRes = (req, res) => {
  return res.json({ Status: "Success", Info: req.Info });
}