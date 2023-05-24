import jwt from "jsonwebtoken";
export const verifyOwner = (req, res, next) => {
  const userToken = req.cookies.userToken;
  let userID ;
  if (!userToken) return res.json({ Status: "You are not authenticated" });
  else {
    jwt.verify(userToken, "user-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token is not ok" });
      else {
        req.userID = decoded.UserID;
        next();
      }
    });
  }
};

export const verifyOwnerRes = (req, res) => {
  return res.json({ Status: "Success", UserID: req.userID });
};
