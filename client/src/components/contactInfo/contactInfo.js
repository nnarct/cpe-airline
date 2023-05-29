import Axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import Datepicker from "react-tailwindcss-datepicker";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../navbar";
import { FlightInfo } from "./flightInfo";
import { Seatselect } from "./seatselect";
import {
  InputFrom,
  inp,
  ContactSection,
  PageWrapper,
  PassengerInfo,
  SaveTrip,
  ProtectionInput,
  ProtectionH1,
  ExtWrap,
  BaseLuggage,
  LuggagesRet,
  LuggagesDep,
} from "./components";

// Todo - restrict access to logged in users only

export const ContactInfo = () => {
  const [baggageDate, setBaggageDate] = useState(1);
  const navigate = useNavigate();
  const info = useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const data = {
    adult: Number(params.get("adult")),
    child: Number(params.get("child")),
    infant: Number(params.get("infant")),
    c: params.get("class"),
  };
  const [contact, setContact] = useState({});
  const pass = [];
  for (let i = 0; i < data.adult; i++) pass.push("Adult");
  for (let i = 0; i < data.child; i++) pass.push("Child");
  for (let i = 0; i < data.infant; i++) pass.push("Infant");
  const [value, setValue] = useState(
    pass.map((p, j) => {
      return {
        id: j + 1,
        fname: "",
        lname: "",
        nationality: "",
        gender: "",
        dob: { startDate: null, endDate: null },
        addOnsID: null,
      };
    })
  );
  const [addon, setAddon] = useState([]);
  const [addondep, setAddondep] = useState(pass.map((p) => null));
  const [addonret, setAddonret] = useState(pass.map((p) => null));
  const flightData = {
    isReturn: params.get("isReturn"),
    departureFlightID: params.get("departureFlightID"),
    returnFlightID: params.get("returnFlightID"),
  };
  const [dep, setDep] = useState({});
  const [ret, setRet] = useState({});
  useEffect(() => {
    setContact({ ...contact, protection: true });
    if (
      sessionStorage.contact !== null &&
      sessionStorage.contact !== undefined
    ) {
      setContact(JSON.parse(sessionStorage.contact));
    }
    if (
      sessionStorage.passenger !== null &&
      sessionStorage.passenger !== undefined
    ) {
      setValue(JSON.parse(sessionStorage.passenger));
    }
    Axios.post("http://localhost:3001/contact/flightInfo", flightData).then(
      (res, err) => {
        if (err) console.log(err);
        if (res.data.Status === "Success") {
          setDep(res.data.DepFlight);
          if (data.isReturn !== "0") setRet(res.data.RetFlight);
        } else console.log(res.data.Error);
      }
    );
    Axios.post("http://localhost:3001/contact/addonInfo", flightData).then(
      (res, err) => {
        if (err) console.log(err);
        if (res.data.Status === "Success") {
          setAddon({ dep: res.data.DepAddOns, ret: res.data.RetAddOns });
        } else console.log(res.data.Error);
      }
    );
  }, []);

  const handleValueChange = (index, newValue) => {
    const newArray = value.map((item) => {
      if (item.id === index) return { ...item, dob: newValue };
      return item;
    });
    setValue(newArray);
  };

  const [genders, setGenders] = useState(pass.map((p) => ""));

  const handleGender = (index, element) => {
    const newArray = genders.map((gen, i) => {
      if (i + 1 === index) return element;
      return gen;
    });
    setGenders(newArray);
  };
  const handleDepAdd = (index, element) => {
    const newArray = addondep.map((d, i) => {
      if (i === index) return element;
      return d;
    });
    setAddondep(newArray);
  };
  const handleRetAdd = (index, element) => {
    const newArray = addonret.map((r, i) => {
      if (i === index) return element;
      return r;
    });
    setAddonret(newArray);
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.firstname === undefined || contact.firstname === "") {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please enter your contact firstname",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    } else if (contact.firstname > 40) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please fill contact firstname less than 40",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    } else if (/\d/.test(contact.firstname)) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please enter a valid first name",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    if (contact.lastname === undefined || contact.lastname === "") {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please enter your contact lastname",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    } else if (contact.lastname > 40) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please fill contact lastname less than 40",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    } else if (/\d/.test(contact.lastname)) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please enter a valid last name",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
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
      return;
    } else if (!emailRegex.test(contact.email)) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please enter a valid email address",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    } else if (contact.email > 30) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please fill email less than 40",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
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
      return;
    } else if (!phoneRegex.test(contact.phone)) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please enter a valid phone number (10 digits)",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }

    const form = info.current;
    let values = [];
    for (let i = 1; i <= pass.length; i++) {
      const fname = form[`fname${i}`].value;
      const lname = form[`lname${i}`].value;
      const nationality = form[`nationality${i}`].value;
      const gender = genders[i - 1];
      const dob = value.find((v) => v.id === i);
      const addDep = addondep[i - 1];
      const addRet = addonret[i - 1];
      if (!dob) {
        Swal.fire({
          icon: "error",
          title: "Sorry...",
          text: "Please select date of birth for all passengers",
          confirmButtonColor: "#3085d6",
          timer: 4000,
          timerProgressBar: true,
        });
        return;
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
        return;
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
          return;
        } else if (/\d/.test(fname)) {
          Swal.fire({
            icon: "error",
            title: "Sorry...",
            text: "Please enter a valid first name",
            confirmButtonColor: "#3085d6",
            timer: 4000,
            timerProgressBar: true,
          });
          return;
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
          return;
        } else if (/\d/.test(lname)) {
          Swal.fire({
            icon: "error",
            title: "Sorry...",
            text: "Please enter a valid last name",
            confirmButtonColor: "#3085d6",
            timer: 4000,
            timerProgressBar: true,
          });
          return;
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
          return;
        } else if (/\d/.test(nationality)) {
          Swal.fire({
            icon: "error",
            title: "Sorry...",
            text: "Please enter a valid nationality",
            confirmButtonColor: "#3085d6",
            timer: 4000,
            timerProgressBar: true,
          });
          return;
        }
      }
      values.push({
        id: i,
        firstname: fname,
        lastname: lname,
        dob: JSON.stringify(dob.dob),
        nationality: nationality,
        gender: gender,
        addondep: addDep,
        addonret: addRet,
      });
    }
    console.log(contact);
    console.log(values);
    sessionStorage.removeItem("contact");
    sessionStorage.removeItem("passenger");
    sessionStorage.setItem("contact", JSON.stringify(contact));
    sessionStorage.setItem("passenger", JSON.stringify(values));
    navigate("/payment" + location.search);
  };

  return (
    <>
      <Navbar />

      <PageWrapper>
        <div className="w-full max-w-1000 mx-auto py-5 px-2 flex space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3 flex-col-reverse sm:flex-row">
          <ContactSection>
            <form action="" ref={info}>
              <InputFrom label="First Name">
                <input
                  name="cfirstname"
                  type="text"
                  className={inp}
                  defaultValue={contact.firstname}
                  onChange={(e) =>
                    setContact({ ...contact, firstname: e.target.value })
                  }
                />
              </InputFrom>
              <InputFrom label="Last Name">
                <input
                  name="clastname"
                  type="text"
                  className={inp}
                  defaultValue={contact.lastname}
                  onChange={(e) =>
                    setContact({ ...contact, lastname: e.target.value })
                  }
                />
              </InputFrom>
              <InputFrom label="Phone">
                <input
                  name="cphone"
                  type="text"
                  className={inp}
                  defaultValue={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                />
              </InputFrom>
              <InputFrom label="Email">
                <input
                  name="cemail"
                  type="text"
                  className={inp}
                  defaultValue={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                />
              </InputFrom>
              {pass?.map((t, i) => {
                return (
                  <PassengerInfo type={t} no={i + 1} key={i}>
                    <InputFrom label="First Name">
                      <input
                        name={`fname${i + 1}`}
                        type="text"
                        className={inp}
                        defaultValue={value[i]?.firstname}
                      />
                    </InputFrom>
                    <InputFrom label="Last Name">
                      <input
                        name={`lname${i + 1}`}
                        type="text"
                        className={inp}
                        defaultValue={value[i]?.lastname}
                      />
                    </InputFrom>
                    <InputFrom label="Nationality">
                      <input
                        name={`nationality${i + 1}`}
                        type="text"
                        className={inp}
                        defaultValue={value[i]?.nationality}
                      />
                    </InputFrom>
                    <InputFrom label="Date of birth">
                      <Datepicker
                        asSingle={true}
                        useRange={false}
                        minDate={new Date("1900-01-02")}
                        maxDate={new Date()}
                        value={
                          value[i]
                            ? {
                                startDate: value[i].dob.startDate,
                                endDate: value[i].dob.endDate,
                              }
                            : null
                        }
                        placeholder="DD-MM-YYYY"
                        displayFormat={"DD-MM-YYYY"}
                        inputClassName={inp}
                        onChange={(e) => handleValueChange(i + 1, e)}
                      />
                      <label
                        id={`gender${i + 1}`}
                        className="px-3 whitespace-nowrap text-primary"
                      >
                        Gender
                      </label>
                      <span className="flex space-x-2 pr-3">
                        <input
                          type="radio"
                          htmlFor="gender"
                          name={`gender${i + 1}`}
                          onClick={() => handleGender(i + 1, "female")}
                        />
                        <span>female</span>
                      </span>
                      <span className="flex space-x-2 pr-3">
                        <input
                          type="radio"
                          htmlFor="gender"
                          name={`gender${i + 1}`}
                          onClick={() => handleGender(i + 1, "male")}
                          className="p-1"
                        />
                        <span>male</span>
                      </span>
                    </InputFrom>
                  </PassengerInfo>
                );
              })}
            </form>
          </ContactSection>
          <FlightInfo
            pass={Number(data.adult) + Number(data.child) + Number(data.infant)}
            classType={data.c}
          />
        </div>

        {/* Add on */}
        <ExtWrap>
          <ProtectionH1 />
          <div className="mt-3">
            <div className="flex items-center pl-4 border border-gray-200 rounded">
              <ProtectionInput
                defaultChecked
                id="TravelProtection1"
                type="radio"
                value=""
                name="TravelProtection"
                onChange={() => setContact({ ...contact, protection: true })}
              />
              <label
                htmlFor="TravelProtection1"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
              >
                <SaveTrip />
              </label>
            </div>
            <div className="flex items-center pl-4 rounded">
              <div className="mt-2">
                <ProtectionInput
                  id="TravelProtection2"
                  type="radio"
                  value=""
                  name="TravelProtection"
                  onChange={() => setContact({ ...contact, protection: false })}
                />
              </div>
              <div className="ml-2">
                <label
                  htmlFor="TravelProtection2"
                  className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
                >
                  <p>No, I do not want to protect my trip.</p>
                  <p>
                    In case of emergency, I will cover all expenses on my own.
                  </p>
                </label>
              </div>
            </div>
          </div>
        </ExtWrap>

        {/* Baggage */}
        <ExtWrap>
          <div className="border-b border-primary/20 mb-1 pb-1 flex ">
            <h1 className="text-2xl font-bold text-primary ">Baggage</h1>
            <div
              className={`cursor-pointer text-xs ml-4 w-36 text-center justify-center text-gray-600 flex items-center hover:bg-slate-100 cursor-pointer ${
                baggageDate === 1 && "bg-slate-100"
              }`}
              onClick={() => setBaggageDate(1)}
            >
              {moment(dep.DepartureTime).format("DD MMM YYYY")}
            </div>
            {flightData.isReturn ? (
              <div
                className={`cursor-pointer border-l w-36 text-xs text-center text-gray-600 flex justify-center items-center hover:bg-slate-100 cursor-pointer ${
                  baggageDate === 2 && "bg-slate-100"
                }`}
                onClick={() => setBaggageDate(2)}
              >
                {moment(ret.DepartureTime).format("DD MMM YYYY")}
              </div>
            ) : null}
          </div>
          <div className={baggageDate === 1 ? "block" : "hidden"}>
            {pass?.map((p, i) => {
              return (
                <>
                  <div className="flex items-center justify-between">
                    <h1 className="mt-1 text-lg font-medium text-gray-600">
                      Passenger {i + 1} ({p})
                    </h1>
                  </div>
                  <BaseLuggage>5</BaseLuggage>
                  <LuggagesDep
                    luggages={addon.dep}
                    id={i}
                    fn={handleDepAdd}
                    addondep={addondep}
                  />
                </>
              );
            })}
          </div>
          <div className={baggageDate === 2 ? "block" : "hidden"}>
            {pass?.map((p, i) => {
              return (
                <>
                  <div className="flex items-center justify-between">
                    <h1 className="mt-1 text-lg font-medium text-gray-600">
                      Passenger {i + 1} ({p})
                    </h1>
                  </div>
                  <BaseLuggage>5</BaseLuggage>
                  <LuggagesRet
                    luggages={addon.ret}
                    id={i}
                    fn={handleRetAdd}
                    addonret={addonret}
                  />
                </>
              );
            })}
          </div>
        </ExtWrap>

        {/* seat */}
        <ExtWrap>
          <Seatselect />
        </ExtWrap>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-1 mt-3t w-fit rounded hover:ring "
        >
          Submit
        </button>
      </PageWrapper>
    </>
  );
};
