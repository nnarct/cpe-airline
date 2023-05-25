import express from "express";
import mysql from "mysql";
import cors from "cors";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import Amadeus from "amadeus";

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
import { planeList } from "./admin/planeList.js";

import { editEmployee } from "./admin/edit/editEmployee.js";
import { editAirline } from "./admin/edit/editAirline.js";
import { editUser } from "./admin/edit/editUser.js";
import { editPassenger } from "./admin/edit/editPassenger.js";


import { deleteAirport } from "./admin/deleteAirport.js";

import { insertAirport } from "./admin/insertAirport.js";

import { verifyUserName, getUserName } from "./users/getUserName.js";
import { airportListUser } from "./users/airportList.js";
import { showProfile } from "./users/showProfile.js";
import { editProfile } from "./users/editProfile.js";
import { changePassword } from "./users/changePassword.js";
import { AmadeusSearchFlights } from "./users/amadeus.js";
import { searchFlights } from "./users/searchFlight/searchFlight.js";
import { getFlight } from "./users/searchFlight/getFlight.js";
import { flightInfo } from "./users/searchFlight/flightInfo.js";
import { insertBooking } from "./users/searchFlight/insertBooking.js";
import { getPayment } from "./users/searchFlight/getPayment.js";
import { getInvoice } from "./users/searchFlight/getInvoice.js";
import { deleteAirline } from "./admin/delete/deleteAirline.js";
import { deleteEmployee } from "./admin/delete/deleteEmployee.js";
import { deletePassenger } from "./admin/delete/deletePassenger.js";
import { editAirport } from "./admin/edit/editAirport.js";
import { editFlight } from "./admin/edit/editFlight.js";
import { verifyOwner, verifyOwnerRes } from "./users/searchFlight/verifyowner.js";


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
app.get("/system/planeList", planeList);

app.post("/system/editEmployee", editEmployee);
app.post("/system/editAirline", editAirline);
app.post("/system/editAirport", editAirport);
app.post("/system/editUser", editUser);
app.post("/system/editPassenger", editPassenger);
app.post("/system/editFlight", editFlight);

app.post("/system/insertAirport", insertAirport);

app.post("/system/deleteAirport", deleteAirport);
app.post("/system/deleteAirline", deleteAirline);
app.post("/system/deleteEmployee", deleteEmployee);
app.post("/system/deletePassenger", deletePassenger);

app.get("/userName", verifyUserName, getUserName);
app.get("/airportList", airportListUser);

// user profile
app.post("/showProfile", showProfile);
app.post("/editProfile", editProfile);
app.post("/user/changePassword", changePassword);

app.post("/AmadeusSearchFlights", AmadeusSearchFlights);
app.post("/search/SearchFlights", searchFlights);
app.post("/search/getFlight", getFlight);
app.post("/contact/flightInfo", flightInfo);
app.post("/insertBooking", insertBooking);

app.post("/getPayment", getPayment);
app.post("/getInvoice", getInvoice);
app.get("/invoice/userauth", verifyOwner, verifyOwnerRes);

app.listen(3001, () => {
  console.log("running on port 3001");
});
