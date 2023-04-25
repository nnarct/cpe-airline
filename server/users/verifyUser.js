import jwt from "jsonwebtoken";
export const verifyUser = (req, res, next) => {
  const userToken = req.cookies.userToken;

  if (!userToken) return res.json({ Status: "You are not authenticated" });
  else {
    jwt.verify(userToken, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token is not ok" });
      else {
        req.firstName = decoded.firstName;
        next();
      }
    });
  }
};

export const verifyUserRes = (req, res) => {
  return res.json({ Status: "Success", firstName: req.firstName });
};
