export const logoutAdmin = (req, res) => {
  res.clearCookie("admin");
  return res.json({ Status: "Success admin" });
};
