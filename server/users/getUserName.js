import jwt from "jsonwebtoken";
export const verifyUserName = (req, res, next) => {
  const userToken = req.cookies.userToken;
  if (!userToken) return res.json({ Status: "You are not authenticated User" });
  else {
    jwt.verify(userToken, "user-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "User token is not ok" });
      else {
        req.UserID = decoded.UserID;
        req.FirstName = decoded.FirstName;
        req.LastName = decoded.LastName;
        next();
      }
    });
  }
};

export const getUserName = (req, res) => {
  return res.json({
    Status: "Success",
    Data: [req.UserID, req.FirstName, req.LastName],
  });
};
