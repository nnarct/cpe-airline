import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const SALT = 10;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cpeairline",
  port: 3306,
});

const verifyUser = (req, res, next) => {
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

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", firstName: req.firstName });
});

app.post("/register", (req, res) => {
  const sqlCheck = `SELECT * FROM user WHERE email = "${req.body.email}"`;
  const sql =
    "INSERT INTO user (FirstName, LastName, Email, TelNo, Password) VALUES (?)";
  db.query(sqlCheck, (err, response) => {
    if (err) return res.json({ Error: "Error while checking email in db..." });
    if (response.length > 0)
      return res.json({ Error: "Email is already exist." });
    bcrypt.hash(req.body.password.toString(), SALT, (err, hash) => {
      if (err) return res.json({ Error: "Error while hashing password !" });
      const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.telNo,
        hash,
      ];
      db.query(sql, [values], (err, result) => {
        if (err)
          return res.json({ Error: "Inserting data error in server..." });
        return res.json({ Status: "Create new user successfully! :)" });
      });
    });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Login error in server..." });
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error..." });
          if (response) {
            const firstName = data[0].firstName;
            const token = jwt.sign({ firstName }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("userToken", token);
            return res.json({ Status: "Successfully login" });
          } else {
            return res.json({ Error: "Password does not match..." });
          }
        }
      );
    } else return res.json({ Error: "Data not found" });
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("userToken");
  return res.json({ Status: "Success" });
});

const verifyAdmin = (req, res, next) => {
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

app.get("/emauth", verifyAdmin, (req, res) => {
  return res.json({ Status: "Success", Info: req.Info });
});

app.post("/admin/register", (req, res) => {
  const sqlCheck = `SELECT * FROM employee WHERE username = ?`;
  const sql =
    "INSERT INTO employee (FirstName, LastName, username, Email, TelNo, Password, Position) VALUES (?)";
  db.query(sqlCheck, [req.body.username], (err, response) => {
    if (err)
      return res.json({ Error: "Error while checking username in db..." });
    if (response.length > 0)
      return res.json({ Error: "Username is already exist." });
    bcrypt.hash(req.body.password.toString(), SALT, (err, hash) => {
      if (err) return res.json({ Error: "Error while hashing password !" });
      const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.username,
        req.body.email,
        req.body.TelNo,
        hash,
        req.body.position,
      ];
      db.query(sql, [values], (err, result) => {
        if (err)
          return res.json({ Error: "Inserting data error in server..." });
        return res.json({ Status: "Create new admin successfully! :)" });
      });
    });
  });
});

app.post("/system/editEmployee", (req, res) => {
  const sql =
    "UPDATE employee SET FirstName = ?, LastName = ?, username = ?, Email = ?, TelNo = ?, Position = ?, AirlineID = ? WHERE EmployeeID =?";
  db.query(
    sql,
    [
      req.body.FirstName,
      req.body.LastName,
      req.body.username,
      req.body.Email,
      req.body.TelNo,
      req.body.Position,
      req.body.AirlineID,
      req.body.EmployeeID,
    ],
    (err, result) => {
      if (err) {
        return res.json({ Error: "Error while editing employee..." });
      }
      return res.json({ Status: "Edit employee successfully! :)" });
    }
  );
});
app.post("/system/editAirline", (req, res) => {
  const sql =
    "UPDATE airline SET Name = ?, LogoImage = ?, Link = ? WHERE AirlineID =?";
  db.query(
    sql,
    [req.body.Name, req.body.LogoImage, req.body.Link, req.body.AirlineID],
    (err, result) => {
      if (err) {
        return res.json({ Error: "Error while editing airline..." });
      }
      return res.json({ Status: "Edit airline successfully! :)" });
    }
  );
});

app.post("/system/editAirport", (req, res) => {
  const sql =
    "UPDATE airport SET Name = ?, IATA = ?, State = ?, Province = ? WHERE AirportID =?";
  db.query(
    sql,
    [req.body.Name, req.body.IATA, req.body.State,req.body.Province, req.body.AirportID],
    (err, result) => {
      if (err) {
        return res.json({ Error: "Error while editing airport..." });
      }
      return res.json({ Status: "Edit airport successfully! :)" });
    }
  );
});

app.post("/admin/login", (req, res) => {
  const sql = "SELECT * FROM employee WHERE username = ?";
  db.query(sql, [req.body.username], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Login error in server..." });
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error..." });
          if (response) {
            const info = data[0];
            const token = jwt.sign({ info }, "admin-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("admin", token);
            return res.json({
              Status: "Successfully login admin",
              Position: data[0].Position,
            });
          } else {
            return res.json({ Error: "Password does not match..." });
          }
        }
      );
    } else return res.json({ Error: "Data not found" });
  });
});

app.get("/admin/logout", (req, res) => {
  res.clearCookie("admin");
  return res.json({ Status: "Success admin" });
});

app.get("/admin/employeeList", (req, res) => {
  const sql = "SELECT * FROM employee";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ Error: "Select employee list error in server..." });
    }
    if (data.length > 0) {
      // console.log(data);
      return res.json({
        Status: "Successfully select employee list",
        Data: data,
      });
    } else {
      return res.json({ Error: "Employee List not found" });
    }
  });
});
app.get("/admin/airlineList", (req, res) => {
  const sql = "SELECT * FROM airline";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Select airline list error in server..." });
    }
    if (data.length > 0) {
      // console.log(data);
      return res.json({
        Status: "Successfully select airline list",
        Data: data,
      });
    } else {
      return res.json({ Error: "Airline List not found" });
    }
  });
});

app.get("/admin/airportList", (req, res) => {
  const sql = "SELECT * FROM airport";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Select airport list error in server..." });
    }
    if (data.length > 0) {
      // console.log(data);
      return res.json({
        Status: "Successfully select airport list",
        Data: data,
      });
    } else {
      return res.json({ Error: "Airport List not found" });
    }
  });
});
// app.post("/api/airline", (req, res) => {
//   const sql = "SELECT * FROM airline";
//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.json({ Error: "Select airline list error in server..." });
//     }
//     if (data.length > 0) {
//       return res.json({
//         Status: "Successfully select airline list",
//         Data: data,
//       });
//     } else {
//       return res.json({ Error: "Airline List not found" });
//     }
//   });
// });

app.listen(3001, () => {
  console.log("running on port 3001");
});
