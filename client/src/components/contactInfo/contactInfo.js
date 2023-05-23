import Datepicker from "react-tailwindcss-datepicker";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../navbar";
import { FlightInfo } from "./flightInfo";
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
  const handleSubmit = (e) => {
    e.preventDefault();
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
        // Todo - validate contact fields must not empty
        // Todo - validate all field
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
      </PageWrapper>
    </>
  );
};
