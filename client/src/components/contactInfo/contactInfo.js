import Axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import Datepicker from "react-tailwindcss-datepicker";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { Navbar } from "../navbar";
import { FlightInfo } from "./flightInfo";
import { Seatselect } from "./seatselect";
import {
  InputFrom,
  inp,
  ContactSection,
  PageWrapper,
  PassengerInfo,
  ExtWrap,
  BaseLuggage,
  LuggagesRet,
  LuggagesDep,
} from "./components";
import { AddOns } from "./addon";
import {
  getAddOnInfo,
  getBagBase,
  getFlightInfo,
  initSession,
  maxPassenger,
  setSession,
  validate,
  validatePassenger,
  handleValueChange,
  handleGender,
} from "./functions";

// Todo - restrict access to logged in users only

export const ContactInfo = () => {
  const navigate = useNavigate();
  const info = useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [baggageDate, setBaggageDate] = useState(1);
  const [contact, setContact] = useState({});
  const data = {
    adult: Number(params.get("adult")),
    child: Number(params.get("child")),
    infant: Number(params.get("infant")),
    c: params.get("class"),
  };
  const flightData = {
    isReturn: params.get("isReturn"),
    departureFlightID: params.get("departureFlightID"),
    returnFlightID: params.get("returnFlightID"),
  };
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
  const [genders, setGenders] = useState(pass.map((p) => ""));
  const [addondep, setAddondep] = useState(pass.map((p) => null));
  const [addonret, setAddonret] = useState(pass.map((p) => null));
  const [base, setBase] = useState([]);
  const [dep, setDep] = useState({});
  const [ret, setRet] = useState({});
  useEffect(() => {
    if (maxPassenger(pass) === 0) navigate("/");
    setContact({ ...contact, protection: true });
    initSession(setContact, setValue);
    getFlightInfo(flightData, setDep, setRet);
    getAddOnInfo(flightData, setAddon);
    getBagBase(params, setBase);
  }, []);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(contact) === 0) return;
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
      if (validatePassenger(fname, lname, dob, nationality, gender) === 0)
        return;
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
    setSession(contact, values);
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
                        onChange={(e) =>
                          handleValueChange(i + 1, e, value, setValue)
                        }
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
                          onClick={() =>
                            handleGender(i + 1, "female", genders, setGenders)
                          }
                        />
                        <span>female</span>
                      </span>
                      <span className="flex space-x-2 pr-3">
                        <input
                          type="radio"
                          htmlFor="gender"
                          name={`gender${i + 1}`}
                          onClick={() =>
                            handleGender(i + 1, "male", genders, setGenders)
                          }
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
        {/* Trip Protection */}
        <AddOns contact={contact} setContact={setContact} />
        {/* Baggage */}
        <ExtWrap>
          <div className="border-b border-primary/20 mb-1 pb-1 flex ">
            <h1 className="text-2xl font-bold text-primary ">Baggage</h1>
            <div
              className={`cursor-pointer text-xs ml-4 w-36 text-center justify-center text-gray-600 flex items-center hover:bg-slate-100 cursor-pointer flex flex-col py-1 ${
                baggageDate === 1 && "bg-slate-100"
              }`}
              onClick={() => setBaggageDate(1)}
            >
              <span>{moment(dep.DepartureTime).format("DD MMM YYYY")}</span>
              <span className="flex items-center">
                {dep.OriIATA} <BsArrowRightShort /> {dep.DesIATA}
              </span>
            </div>
            {flightData.isReturn ? (
              <div
                className={`cursor-pointer border-l w-36 text-xs text-center text-gray-600 flex justify-center items-center hover:bg-slate-100 cursor-pointer flex flex-col py-1 ${
                  baggageDate === 2 && "bg-slate-100"
                }`}
                onClick={() => setBaggageDate(2)}
              >
                <span>{moment(ret.DepartureTime).format("DD MMM YYYY")}</span>
                <span className="flex items-center">
                  {ret.OriIATA} <BsArrowRightShort /> {ret.DesIATA}
                </span>
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
                  <BaseLuggage base={base?.DepBase} />
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
                  <BaseLuggage base={base?.RetBase} />
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
        <Seatselect params={params}/>
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
