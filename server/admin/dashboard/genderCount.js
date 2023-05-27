import { db } from "../../index.js";

export const genderCount = (req, res) => {
  const maleCountQuery = "SELECT COUNT(Gender) AS MaleCount FROM passenger WHERE Gender LIKE 'male'";
  const femaleCountQuery = "SELECT COUNT(Gender) AS FemaleCount FROM passenger WHERE Gender LIKE 'female'";
  db.query(maleCountQuery, (err, data1) => {
    if (err)
      return res.json({ Error: "Select male count error in server..." });
      const male = data1[0];
      const maleCount = parseInt(male.MaleCount);
    db.query(femaleCountQuery, (err, data2) => {
      if (err)
        return res.json({ Error: "Select female count error in server..." });
      const female = data2[0];
      const femaleCount = parseInt(female.FemaleCount);
      return res.json({
        Status: "Successfully retrieved passenger count",
        MaleCount: maleCount,
        FemaleCount: femaleCount,
      })
  });
});
};