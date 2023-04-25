import express from "express";
import mysql from "mysql";
import cors from "cors";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import { verifyUser, verifyUserRes } from "./users/verifyUser";
import { register } from "./users/register";
import { login } from "./users/login";
import { logout } from "./users/logout";

import { verifyAdmin, verifyAdminRes } from "./admin/verifyAdmin";
import { registerAdmin } from "./admin/registerAdmin";
import { editEmployee } from "./admin/editEmployee";
import { editAirline } from "./admin/editAirline";
import { loginAdmin } from "./admin/loginAdmin";
import { logoutAdmin } from "./admin/logoutAdmin";
import { employeeList } from "./admin/employeeList";
import { airlineList } from "./admin/airlineList";

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

app.get("/admin/employeeList", employeeList);
app.get("/admin/airlineList", airlineList);

app.post("/system/editEmployee", editEmployee);
app.post("/system/editAirline", editAirline);

app.listen(3001, () => {
  console.log("running on port 3001");
});
