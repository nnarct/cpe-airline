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

// select of non-system admin
import { selectPassenger } from "./admin/restrict/passenger/select.js";

// list
import { employeeList } from "./admin/employeeList.js";
import { airlineList } from "./admin/airlineList.js";
import { airportList } from "./admin/airportList.js";
import { flightList } from "./admin/flightList.js";
import {
  passengerList,
  passengerListGroupByBooking,
} from "./admin/passengerList.js";
import { userList } from "./admin/userList.js";
import { planeList } from "./admin/planeList.js";

// edit
import { editEmployee } from "./admin/edit/editEmployee.js";
import { editAirline } from "./admin/edit/editAirline.js";
import { editUser } from "./admin/edit/editUser.js";
import { editPassenger } from "./admin/edit/editPassenger.js";
import { editAirport } from "./admin/edit/editAirport.js";
import { editFlight } from "./admin/edit/editFlight.js";
import { editPlane } from "./admin/edit/editPlane.js";

// insert
import { insertAirport } from "./admin/insert/insertAirport.js";
import { insertAirline } from "./admin/insert/insertAirline.js";
import { insertPlane } from "./admin/insert/insertPlane.js";
import { insertUser } from "./admin/insert/insertUser.js";
import { insertFlight } from "./admin/insert/insertFlight.js";

//delete
import { deleteAirline } from "./admin/delete/deleteAirline.js";
import { deleteEmployee } from "./admin/delete/deleteEmployee.js";
import { deletePassenger } from "./admin/delete/deletePassenger.js";
import { deleteAirport } from "./admin/delete/deleteAirport.js";
import { deletePlane } from "./admin/delete/deletePlane.js";
import { deleteFlight } from "./admin/delete/deleteFlight.js";
import { deleteUser } from "./admin/delete/deleteUser.js";

// verify auth
import { verifyUserName, getUserName } from "./users/getUserName.js";
import { airportListUser } from "./users/airportList.js";

// user my profile
import { showProfile } from "./users/showProfile.js";
import { editProfile } from "./users/editProfile.js";
import { changePassword } from "./users/changePassword.js";
import { getUserBooking } from "./users/myFlight/getUserBooking.js";

// search flight
import { searchFlights } from "./users/searchFlight/searchFlight.js";

// create booking
import {
  verifyOwner,
  verifyOwnerRes,
} from "./users/searchFlight/verifyowner.js";
import { getFlight } from "./users/createBooking/getFlight.js";
import { flightInfo } from "./users/createBooking/flightInfo.js";
import { insertBooking } from "./users/createBooking/insertBooking.js";
import { getPayment } from "./users/createBooking/getPayment.js";
import { getInvoice } from "./users/createBooking/getInvoice.js";
import { addOnInfo, getBase } from "./users/createBooking/addOns.js";
import { getAvailableSeat } from "./users/createBooking/getAvailableSeat.js";

//import { deleteFlight } from "../client/delete/deleteFlight.js";
import { selectFlight } from "./admin/restrict/flight/select.js";


// admin my profile
import { adminInfo } from "./admin/adminInfo.js";
import { editSystemProfile } from "./admin/edit/editSystemProfile.js";
import { editAdminProfile } from "./admin/edit/editAdminProfile.js";

// dashboard
import { bookingCount } from "./admin/dashboard/bookCount.js"
import { flightCount } from "./admin/dashboard/flightCount.js";
import { userCount } from "./admin/dashboard/userCount.js";
import { genderCount } from "./admin/dashboard/genderCount.js"
import { getFlightCountsBySection } from "./admin/dashboard/Destination.js"
import { getBookingInfo } from "./users/myFlight/getBookingInfo.js";

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
db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
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
app.post("/admin/info", adminInfo);
app.post("/admin/editProfile", editAdminProfile);
app.get("/system/employeeList", employeeList);
app.get("/system/airlineList", airlineList);
app.get("/system/airportList", airportList);
app.get("/system/flightList", flightList);
app.get("/system/userList", userList);
app.get("/system/passengerList", passengerList);
app.get("/system/passengerListGroupByBookingID", passengerListGroupByBooking);
app.get("/system/planeList", planeList);

app.post("/system/editProfile", editSystemProfile);
app.post("/system/editEmployee", editEmployee);
app.post("/system/editAirline", editAirline);
app.post("/system/editAirport", editAirport);
app.post("/system/editUser", editUser);
app.post("/system/editPassenger", editPassenger);
app.post("/system/editFlight", editFlight);
app.post("/system/editPlane", editPlane);

app.post("/system/insertAirport", insertAirport);
app.post("/system/insertAirline", insertAirline);
app.post("/system/insertPlane", insertPlane);
app.post("/system/insertUser", insertUser);
app.post("/system/insertFlight", insertFlight);

app.post("/system/deleteAirport", deleteAirport);
app.post("/system/deleteAirline", deleteAirline);
app.post("/system/deleteEmployee", deleteEmployee);
app.post("/system/deletePassenger", deletePassenger);
app.post("/system/deleteAirport", deleteAirport);
app.post("/system/deletePlane", deletePlane);
app.post("/system/deleteUser", deleteUser);
app.post("/system/deleteFlight", deleteFlight);

app.get("/userName", verifyUserName, getUserName);
app.get("/airportList", airportListUser);

// user profile
app.post("/showProfile", showProfile);
app.post("/editProfile", editProfile);
app.post("/user/changePassword", changePassword);
app.post("/getUserBooking", getUserBooking);
app.post('/getBookingInfo',getBookingInfo);

// app.post("/AmadeusSearchFlights", AmadeusSearchFlights);
app.post("/search/SearchFlights", searchFlights);
app.post("/search/getFlight", getFlight);
app.post("/contact/flightInfo", flightInfo);
app.post("/contact/addonInfo", addOnInfo);
app.post("/contact/getBase", getBase);
app.post("/insertBooking", insertBooking);

app.post("/getPayment", getPayment);
app.post("/getInvoice", getInvoice);
app.get("/invoice/userauth", verifyOwner, verifyOwnerRes);
app.post("/getAvailableSeat", getAvailableSeat);


// Dashboard
app.get("/system/genderCount", genderCount);
app.get("/system/bookCount", bookingCount);
app.get("/system/destination", getFlightCountsBySection)
app.get("/system/flightCount", flightCount);
app.get("/system/userCount", userCount);

// select for non-system admin
app.post("/selectPassenger", selectPassenger);
app.post("/selectFlight", selectFlight);
app.listen(3001, () => {
  console.log("running on port 3001");
});
