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
import { editEmployee } from "./admin/editEmployee.js";
import { editAirline } from "./admin/editAirline.js";
import { loginAdmin } from "./admin/loginAdmin.js";
import { logoutAdmin } from "./admin/logoutAdmin.js";
import { employeeList } from "./admin/employeeList.js";
import { airlineList } from "./admin/airlineList.js";
import { insertAirport } from "./admin/insertAirport.js";
import { airportList } from "./admin/airportList.js";

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

app.get("/", verifyUser, verifyUserRes);
app.get("/emauth", verifyAdmin, verifyAdminRes);

app.post("/register", register);
app.post("/login", login);
app.get("/logout", logout);

app.post("/admin/register", registerAdmin);
app.post("/admin/login", loginAdmin);
app.get("/admin/logout", logoutAdmin);

app.get("/system/employeeList", employeeList);
app.get("/system/airlineList", airlineList);
app.get("/system/airportList", airportList);

app.post("/system/editEmployee", editEmployee);
app.post("/system/editAirline", editAirline);

app.post("/system/insertAirport", insertAirport);

app.listen(3001, () => {
  console.log("running on port 3001");
});
