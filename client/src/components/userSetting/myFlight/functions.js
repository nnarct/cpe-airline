import Axios from "axios";
import Swal from "sweetalert2";

export const getUserBookings = (setBookings) => {
  Axios.post("http://localhost:3001/getUserBookings").then((res, err) => {
    if (err) console.log(err);
    else if (res.data.Error === "No user's bookings found.") setBookings([]);
    else if (res.data.Error === "Error while user's bookings ...") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res,
        confirmButtonColor: "#2563eb",
      });
    } else if (res.data.Status) setBookings(res.data.Data);
  });
};

export const getBooking = (
  bookingID,
  setBooking,
  setPassengers,
  setOpenOneBooking,
  setBase
) => {
  Axios.post("http://localhost:3001/getBooking", { id: bookingID }).then(
    (res, err) => {
      if (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred! Please contact admin.",
          confirmButtonColor: "#2356ed",
        });
        setOpenOneBooking(false);
      } else if (res.data.Error) {
        Swal.fire({
          icon: "error",
          title: "Sorry...",
          text: res.data.Error,
          confirmButtonColor: "#2356ed",
        });
        setOpenOneBooking(false);
      } else if (res.data.Status === "Success") {
        setBooking(res.data.Booking);
        setPassengers(res.data.Passengers);
        Axios.post("http://localhost:3001/contact/getBase", {
          isReturn: 0,
          departureFlightID: res.data.Booking.FlightID,
          returnFlightID: null,
          class: res.data.Booking.Class,
        }).then((res, err) => {
          if (err) {
            Swal.fire({
              icon: "error",
              title: "Sorry...",
              text: "An error occurred! Please contact admin.",
              confirmButtonColor: "#2356ed",
            });
            setOpenOneBooking(false);
          } // Todo - handle error
          else if (res.data.Status === "Success") {
            setBase(res.data.Base);
          } else {
            Swal.fire({
              icon: "error",
              title: "Sorry...",
              text: res.data.Error,
              confirmButtonColor: "#2356ed",
            });
            setOpenOneBooking(false);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please contact admin.",
          confirmButtonColor: "#2356ed",
        });
      }
    }
  );
};

export const editBooking = (
  booking,
  getBooking,
  bookingID,
  setBooking,
  setPassengers,
  setOpenOneBooking,
  setBase
) => {
  Swal.fire({
    title: "Edit contact information",
    html: `
    <div class="pb-4">You are editing contact information for booking ID:
      <span class="font-bold">
      ${booking?.BookingID}
      </span>
    </div>
    <div class="flex items-center justify-center py-1">
      <label htmlFor="contactFname" class="w-32 block">First Name</label>
      <input id="contactFname" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="First name" value="${booking.ContactFirstname}">
    </div>
    <div class="flex items-center justify-center py-1">
      <label htmlFor="contactLname" class="w-32 block">Last Name</label>
      <input id="contactLname" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="Last name" value="${booking.ContactLastname}">
    </div>
    <div class="flex items-center justify-center py-1">
      <label htmlFor="contactEmail" class="w-32 block">Email</label>
      <input id="contactEmail" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="Email" value="${booking.ContactEmail}">
    </div>
    <div class="flex items-center justify-center py-1">
      <label htmlFor="contactPhone" class="w-32 block">Phone</label>
      <input id="contactPhone" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="0994848848" value="${booking.ContactPhone}">
    </div>`,
    confirmButtonText: "Save",
    confirmButtonColor: "#2356ed",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    reverseButtons: true,
    preConfirm: () => {
      const fname = document.getElementById("contactFname").value;
      const lname = document.getElementById("contactLname").value;
      const email = document.getElementById("contactEmail").value;
      const telno = document.getElementById("contactPhone").value;
      if (!fname) Swal.showValidationMessage("Please enter your first name.");
      else if (!/^[a-zA-Z\s]+$/.test(fname))
        Swal.showValidationMessage("First name must contain only letters.");
      else if (fname.length > 40)
        Swal.showValidationMessage(
          "First name must be less than 40 characters."
        );
      if (!lname) Swal.showValidationMessage("Please enter your last name.");
      else if (!/^[a-zA-Z\s]+$/.test(lname))
        Swal.showValidationMessage("Last name must contain only letters.");
      else if (lname.length > 40)
        Swal.showValidationMessage(
          "Last name must be less than 40 characters."
        );
      if (!email) Swal.showValidationMessage("Please enter your email.");
      else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        Swal.showValidationMessage("Please enter a valid email.");
      else if (email.length > 40)
        Swal.showValidationMessage("Email must be less than 40 characters.");
      if (!telno) Swal.showValidationMessage("Please enter your phone number.");
      else if (!/^[0-9]+$/.test(telno))
        Swal.showValidationMessage("Phone number must contain only numbers.");
      else if (telno[0] !== "0")
        Swal.showValidationMessage("Phone number must start with 0.");
      else if (telno.length > 10)
        Swal.showValidationMessage(
          "Phone number must be less than 10 characters."
        );
      return { id: booking?.BookingID, fname, lname, email, telno };
    },
  }).then((result) => {
    if (!result.isConfirmed) {
      return;
    }
    Axios.post("http://localhost:3001/editBooking", result.value).then(
      (res, err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred! Please contact admin.",
            confirmButtonColor: "#2356ed",
          });
        } else if (res.data.Error) {
          Swal.fire({
            icon: "error",
            title: "Sorry...",
            text: res.data.Error,
            confirmButtonColor: "#2356ed",
          });
        } else if (res.data.Status === "Edit contact successfully.") {
          Swal.fire("Edited!", "Your booking has been edited.", "success").then(
            () => {
              getBooking(
                bookingID,
                setBooking,
                setPassengers,
                setOpenOneBooking,
                setBase
              );
            }
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please contact admin.",
            confirmButtonColor: "#2356ed",
          });
        }
      }
    );
  });
};

export const editPassenger = (
  passenger,
  bookingID,
  setBooking,
  setPassengers,
  setOpenOneBooking,
  setBase
) => {
  Swal.fire({
    title: "Edit passenger details",
    html: `
  <div class="pb-4">You are editing passenger id:
    <span class="font-bold">
    ${passenger?.PassengerID}
    </span>
      </div>
    <div class="flex items-center justify-center py-1">
      <label htmlFor="fname" class="w-24 block">First Name</label>
      <input id="fname" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="First name" value="${passenger.FirstName}">
    </div>
    <div class="flex items-center justify-center py-1">
      <label htmlFor="lname" class="w-24 block">Last
      Name</label>
      <input id="lname" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="Last name" value="${passenger.LastName}">
    </div>
    <div class="flex items-center justify-center py-1">
      <label htmlFor="nationality" class="w-24 block">Nationality</label>
      <input id="nationality" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border" placeholder="TH" value="${passenger.Nationality}">
    </div>
  `,
    confirmButtonText: "Save",
    confirmButtonColor: "#2356ed",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    reverseButtons: true,
    preConfirm: () => {
      const fname = document.getElementById("fname").value;
      const lname = document.getElementById("lname").value;
      const nationality = document.getElementById("nationality").value;
      if (!fname) Swal.showValidationMessage("Please enter your first name.");
      else if (!/^[a-zA-Z\s]+$/.test(fname))
        Swal.showValidationMessage("First name must contain only letters.");
      else if (fname.length > 40)
        Swal.showValidationMessage(
          "First name must be less than 40 characters."
        );
      if (!lname) Swal.showValidationMessage("Please enter your last name.");
      else if (!/^[a-zA-Z\s]+$/.test(lname))
        Swal.showValidationMessage("Last name must contain only letters.");
      else if (lname.length > 40)
        Swal.showValidationMessage(
          "Last name must be less than 40 characters."
        );
      if (!nationality)
        Swal.showValidationMessage("Please enter your nationality.");
      else if (!/^[a-zA-Z\s]+$/.test(nationality))
        Swal.showValidationMessage("Last name must contain only letters.");
      else if (nationality.length > 40)
        Swal.showValidationMessage(
          "Nationality must be less than 40 characters."
        );
      return { id: passenger?.PassengerID, fname, lname, nationality };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.post("http://localhost:3001/editPassenger", result.value).then(
        (res, err) => {
          if (err)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              confirmButtonColor: "#2563eb",
            });
          else if (res.data.Status) {
            Swal.fire("Edited!", res.data.Status, "success").then(() =>
              getBooking(
                bookingID,
                setBooking,
                setPassengers,
                setOpenOneBooking,
                setBase
              )
            );
          } else
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.data.Error,
              confirmButtonColor: "#2563eb",
            });
        }
      );
    }
  });
};

export const cancelBooking = (id, currentPath, navigate) => {
  Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    confirmButtonText: "Yes, cancel it!",
    confirmButtonColor: "red",
    showCancelButton: true,
    focusCancel: true,
    cancelButtonText: "No, keep it",
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.post("http://localhost:3001/cancelBooking", {
        id: id,
      }).then((res, err) => {
        if (err) Swal.fire("Error!", "Something went wrong.", "error");
        else if (res.data.Status === "Cancel booking successfully! :)")
          Swal.fire({
            title: "Canceled!",
            html: `<div>Your booking has been canceled.</div><div>We will refund your money within 7 days.</div>`,
            icon: "success",
            confirmButtonText: "Noted!",
            confirmButtonColor: "#2356ed",
            timer: 8000,
            timerProgressBar: true,
          }).then(() => navigate(currentPath));
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        text: "Your booking is safe :)",
        backdrop: false,
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "top-end",
      });
    }
  });
};
