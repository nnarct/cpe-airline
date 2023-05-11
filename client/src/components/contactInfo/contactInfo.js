import { useLocation } from "react-router-dom";
import { Navbar } from "../navbar";
import { InputFrom, inp, dob } from "./input";
import { PassengerInfo } from "./passengerInfo";

// To do - restrict access to logged in users only

export const ContactInfo = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const data = {
    adult: Number(params.get("adult")),
    child: Number(params.get("child")),
    infant: Number(params.get("infant")),
  };
  const pass = [];
  for (let i = 0; i < data.adult; i++) {
    pass.push("Adult");
  }
  for (let i = 0; i < data.child; i++) {
    pass.push("Child");
  }
  for (let i = 0; i < data.child; i++) {
    pass.push("Infant");
  }
  return (
    <>
      <Navbar />
      <div className="bg-slate-100">
        <div className="container mx-auto p-3 flex space-x-3 ">
          <div className="w-4/6 bg-white border border-primary rounded-md p-2">
            <h1 className="text-2xl  bg-white font-bold text-primary border-b border-primary/20 mb-1 pb-1">
              Contact Info
            </h1>
            <form action="">
              <InputFrom label="First Name">
                <input
                  required
                  type="text"
                  className={inp}
                  placeholder="Enter first name here"
                />
              </InputFrom>
              <InputFrom label="Last Name">
                <input
                  required
                  type="text"
                  className={inp}
                  placeholder="Enter last name here"
                />
              </InputFrom>
              <InputFrom label="Phone">
                <input
                  required
                  type="text"
                  className={inp}
                  placeholder="Enter phone number here"
                />
              </InputFrom>
              <InputFrom label="Email">
                <input
                  required
                  type="text"
                  className={inp}
                  placeholder="Enter email here"
                />
              </InputFrom>
              {pass.map((t, i) => {
                return (
                  <PassengerInfo type={t} no={i + 1} key={i}>
                    <InputFrom label="First Name">
                      <input
                        type="text"
                        className={inp}
                        placeholder="Enter first name here"
                      />
                    </InputFrom>
                    <InputFrom label="Last Name">
                      <input
                        type="text"
                        className={inp}
                        placeholder="Enter last name here"
                      />
                    </InputFrom>

                    <InputFrom label="Phone">
                      <input
                        type="text"
                        className={`bg-red-300 ${inp}`}
                        placeholder="Enter phone number here"
                      />
                    </InputFrom>
                    <InputFrom label="Nationality">
                      <input
                        type="text"
                        className={inp}
                        placeholder="Enter nationality here"
                      />
                    </InputFrom>

                    <InputFrom label="Date of birth">
                      <input
                        type="date"
                        className={dob}
                        min="1900-01-02"
                        max="2023-05-09"
                      />
                      <label
                        id="gender"
                        className="px-3 whitespace-nowrap text-primary"
                      >
                        Gender
                      </label>
                      <span className="flex space-x-2 pr-3">
                        <input
                          type="radio"
                          htmlFor="gender"
                          name="gender"
                          placeholder="Enter phone number here"
                        />
                        <span>female</span>
                      </span>
                      <span className="flex space-x-2 pr-3">
                        <input
                          type="radio"
                          htmlFor="gender"
                          name="gender"
                          placeholder="Enter phone number here"
                          className="p-1"
                        />
                        <span>male</span>
                      </span>
                    </InputFrom>
                  </PassengerInfo>
                );
              })}
            </form>
          </div>
          <div className="h-min w-2/6 bg-white border border-primary rounded-md p-2">
            hi
          </div>
        </div>
      </div>
    </>
  );
};
