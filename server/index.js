import express from "express";
import mysql from "mysql";
import cors from "cors";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import { verifyUser, verifyUserRes } from "./users/verifyUser.js";
import { register } from "./users/register.js";
import { login } from "./users/login.js";
import { logout } from "./users/logout.js";

import { verifyAdmin, verifyAdminRes } from "./admin/verifyAdmin.js";
import { registerAdmin } from "./admin/registerAdmin.js";
import { loginAdmin } from "./admin/loginAdmin.js";
import { logoutAdmin } from "./admin/logoutAdmin.js";

import { employeeList } from "./admin/employeeList.js";
import { airlineList } from "./admin/airlineList.js";
import { airportList } from "./admin/airportList.js";
import { flightList } from "./admin/flightList.js";
import { passengerList } from "./admin/passengerList.js";
import { userList } from "./admin/userList.js";

import { editEmployee } from "./admin/editEmployee.js";
import { editAirline } from "./admin/editAirline.js";

import { deleteAirport } from "./admin/deleteAirport.js";

import { insertAirport } from "./admin/insertAirport.js";

import { verifyUserName, getUserName } from "./users/getUserName.js";
import { airportListUser } from "./users/airportList.js";

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

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cpeairline",
  port: 4306,
});

// authentication
app.get("/", verifyUser, verifyUserRes);
app.get("/emauth", verifyAdmin, verifyAdminRes);
// user
app.post("/register", register);
app.post("/login", login);
app.get("/logout", logout);
// admin authentication
app.post("/admin/register", registerAdmin);
app.post("/admin/login", loginAdmin);
app.get("/admin/logout", logoutAdmin);

// system admin
app.get("/system/employeeList", employeeList);
app.get("/system/airlineList", airlineList);
app.get("/system/airportList", airportList);
app.get("/system/flightList", flightList);
app.get("/system/userList", userList);
app.get("/system/passengerList", passengerList);

app.post("/system/editEmployee", editEmployee);
app.post("/system/editAirline", editAirline);

app.post("/system/insertAirport", insertAirport);

app.post("/system/deleteAirport", deleteAirport);

app.get("/userName", verifyUserName, getUserName);
app.get("/airportList", airportListUser);

app.listen(3001, () => {
  console.log("running on port 3001");
});
