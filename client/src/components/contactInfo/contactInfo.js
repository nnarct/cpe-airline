import Datepicker from "react-tailwindcss-datepicker";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../navbar";
import { FlightInfo } from "./flightInfo";
import { BsCheckLg } from "react-icons/bs";
import { Seatselect } from "./seatselect"
import {
  InputFrom,
  inp,
  ContactSection,
  PageWrapper,
  PassengerInfo,
} from "./components";

// Todo - restrict access to logged in users only

export const ContactInfo = () => {
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
      };
    })
  );

  useEffect(() => {
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

  const cfname = contact.fname;

  const email = contact.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contact.firstname);
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
    }
    else if (contact.firstname > 40) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please fill contact firstname less than 40",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }
    else if (/\d/.test(contact.firstname)) {
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
    }
    else if (contact.lastname > 40) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please fill contact lastname less than 40",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }
    else if (/\d/.test(contact.lastname)) {
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
    }
    else if (!emailRegex.test(contact.email)) {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "Please enter a valid email address",
        confirmButtonColor: "#3085d6",
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }
    else if (contact.email > 30) {
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
    }
    else if (!phoneRegex.test(contact.phone)) {
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
        }
        else if (/\d/.test(fname)) {
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
        }
        else if (/\d/.test(lname)) {
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
        }
        else if (/\d/.test(nationality)) {
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
      });
    }
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
              {pass &&
                pass.map((t, i) => {
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
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-1 mt-3 float-right w-fit rounded hover:ring "
              >
                Submit
              </button>
            </form>
          </ContactSection>

          <FlightInfo
            pass={Number(data.adult) + Number(data.child) + Number(data.infant)}
            classType={data.c}
          />
        </div>

        {/* Add on */}
        <div className="w-full max-w-1000 mx-auto py-5 px-2 flex space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3 flex-col-reverse sm:flex-row">
          <div className="sm:w-3/5 md:w-4/6 bg-white border border-primary/40 rounded-md py-3 px-5">
            <h1 className="text-2xl  bg-white font-bold text-primary border-b border-primary/20 mb-1 pb-1">
              Travel Protection
            </h1>
            <div className="mt-3">
              <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input id="TravelProtection1" type="radio" value="" name="TravelProtection" class="w-4 h-4 text-blue-600 bggray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="TravelProtection1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <h1>Yes, I want to protect my trip for ฿ 300</h1>
                  <ul className="text-xs font-normal text-gray-500">
                    <li className="flex"><BsCheckLg className="mt-1 mr-1"/>Accidental Medical Expenses</li>
                    <li className="flex"><BsCheckLg className="mt-1 mr-1"/>24/7 Emergency Assistance & Medical Evacuation</li>
                    <li className="flex"><BsCheckLg className="mt-1 mr-1"/>Loss/Damage of Baggage & other Personal Items</li>
                    <li className="flex"><BsCheckLg className="mt-1 mr-1"/>Flight & Baggage Delay Cover</li>
                    <li className="flex"><BsCheckLg className="mt-1 mr-1"/>Personal Accident & much more</li>
                  </ul>
                </label>
              </div>
              <div className="flex items-center pl-4 rounded dark:border-gray-700">
                <div className="mt-2">
                  <input checked id="TravelProtection2" type="radio" value="" name="TravelProtection" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="ml-2">
                  <label for="TravelProtection2" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    <p>No, I do not want to protect my trip.</p>
                    <p>In case of emergency, I will cover all expenses on my own.</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Baggage */}
        <div className="w-full max-w-1000 mx-auto py-5 px-2 flex space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3 flex-col-reverse sm:flex-row">
          <div className="sm:w-3/5 md:w-4/6 bg-white border border-primary/40 rounded-md py-3 px-5">
            <h1 className="text-2xl  bg-white font-bold text-primary border-b border-primary/20 mb-1 pb-1">
              Baggage
            </h1>
            <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 mt-3">
              <input id="Baggage-radio-1" type="radio" value="" name="Baggage-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="Baggage-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">
                <p>No checked baggage</p>
              </label>
            </div>
            <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 mt-2">
              <input id="Baggage-radio-2" type="radio" value="" name="Baggage-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="Baggage-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex flex-row">
                <p className="basis-3/4">5 kg</p>
                <p className="mr-3 text-right basis-1/4">฿ 490</p>
              </label>
            </div>
            <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 mt-2">
              <input id="Baggage-radio-3" type="radio" value="" name="Baggage-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="Baggage-radio-3" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex flex-row">
                <p className="basis-3/4">10 kg</p>
                <p className="mr-3 text-right basis-1/4">฿ 870</p>
              </label>
            </div>
          </div>
        </div>

        {/* seat */}
        <div className="w-full max-w-1000 mx-auto py-5 px-2 flex space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3 flex-col-reverse sm:flex-row">
          <div className="sm:w-3/5 md:w-4/6 bg-white border border-primary/40 rounded-md py-3 px-5">
            <Seatselect/>
          </div>
        </div>


      </PageWrapper>

    </>
  );
};
