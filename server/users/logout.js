export const logout = (req, res) => {
  res.clearCookie("userToken");
  return res.json({ Status: "Success" });
};
