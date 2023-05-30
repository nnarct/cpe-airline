import Axios from "axios";
import Swal from "sweetalert2";

export const validate = (contact) => {
  if (contact.FirstName === undefined || contact.LastName === "") {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Please enter contact first name",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  } else if (contact.FirstName > 40) {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "First name must be less than 40 characters",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  } else if (/\d/.test(contact.FirstName)) {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Please enter a valid first name",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  }

  if (contact.LastName === undefined || contact.LastName === "") {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Please enter contact last name",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  } else if (contact.LastName > 40) {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Last name must be less than 40 characters",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  } else if (/\d/.test(contact.lastname)) {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Please enter a valid last name",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  }

  if (contact.email === undefined || contact.email === "") {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Please enter your email",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Please enter a valid email address",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  } else if (contact.email > 30) {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Email must be less than 40 characters.",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  }
  if (contact.phone === undefined || contact.phone === "") {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Please enter your phone",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  } else if (!/^\d{10}$/.test(contact.phone)) {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Please enter a valid phone number (10 digits)",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  }
  return 1;
};

export const setSession = (contact, values) => {
  sessionStorage.removeItem("contact");
  sessionStorage.removeItem("passenger");
  sessionStorage.setItem("contact", JSON.stringify(contact));
  sessionStorage.setItem("passenger", JSON.stringify(values));
};

export const validatePassenger = (fname, lname, dob, nationality, gender) => {
  if (!dob) {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Please select date of birth for all passengers",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  }
  if (
    fname === "" ||
    lname === "" ||
    dob.startDate === null ||
    nationality === "" ||
    gender === ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Please fill in all the fields",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  } else {
    if (fname.length > 40) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please fill Passenger firstname less than 40",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return 0;
    } else if (/\d/.test(fname)) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please enter a valid first name",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return 0;
    }
    if (lname.length > 40) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please fill Passenger lastname less than 40",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return 0;
    } else if (/\d/.test(lname)) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please enter a valid last name",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return 0;
    }

    if (nationality.length > 60) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please fill Passenger nationality less than 40",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return 0;
    } else if (/\d/.test(nationality)) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please enter a valid nationality",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return 0;
    }
  }
  return 1;
};
export const maxPassenger = (passenger) => {
  if (passenger.length > 9) {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Maximum 9 passengers allowed",
      confirmButtonColor: "#3085d6",
      timer: 4000,
      timerProgressBar: true,
    });
    return 0;
  }
  return 1;
};

export const initSession = (setContact, setValue) => {
  if (sessionStorage.contact !== null && sessionStorage.contact !== undefined) {
    setContact(JSON.parse(sessionStorage.contact));
  }
  if (
    sessionStorage.passenger !== null &&
    sessionStorage.passenger !== undefined
  ) {
    setValue(JSON.parse(sessionStorage.passenger));
  }
};

export const getFlightInfo = (flightData, setDep, setRet) => {
  Axios.post("http://localhost:3001/contact/flightInfo", flightData).then(
    (res, err) => {
      if (err)
        Swal.fire({
          icon: "error",
          title: "Sorry...",
          text: "Something went wrong!",
        }); // Todo - handle error
      if (res.data.Status === "Success") {
        setDep(res.data.DepFlight);
        if (flightData.isReturn) {
          setRet(res.data.RetFlight);
        }
        return;
      } else Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: res.data.Error,
      });
    }
  );
};

export const getAddOnInfo = (flightData, setAddon) => {
  Axios.post("http://localhost:3001/contact/addonInfo", flightData).then(
    (res, err) => {
      if (err)
        Swal.fire({
          icon: "error",
          title: "Sorry...",
          text: "Something went wrong!",
        }); // Todo - handle error
      if (res.data.Status === "Success") {
        setAddon({ dep: res.data.DepAddOns, ret: res.data.RetAddOns });
      } else Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: res.data.Error,
      });
    }
  );
};

export const getBagBase = (params, setBase) => {
  Axios.post("http://localhost:3001/contact/getBase", {
    isReturn: params.get("isReturn"),
    departureFlightID: params.get("departureFlightID"),
    returnFlightID: params.get("returnFlightID"),
    class: params.get("class"),
  }).then((res, err) => {
    if (err) Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Something went wrong!",
    }); // Todo - handle error
    if (res.data.Status === "Success") {
      setBase(res.data.Base);
    } else Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: res.data.Error,
    });
  });
};

export const handleValueChange = (index, newValue, value, setValue) => {
  const newArray = value.map((item) => {
    if (item.id === index) return { ...item, dob: newValue };
    return item;
  });
  setValue(newArray);
};

export const handleGender = (index, element, genders, setGenders) => {
  const newArray = genders.map((gen, i) => {
    if (i + 1 === index) return element;
    return gen;
  });
  setGenders(newArray);
};
