import { BsCheckLg } from "react-icons/bs";
import styled from "styled-components";

export const inp =
  "w-full px-1 border outline-none rounded focus:ring focus:ring-1 hover:ring hover:ring-blue-200/40 active:ring-blue-200/80";
export const dob =
  "px-1 border outline-none focus:ring focus:ring-1 hover:ring hover:ring-blue-200/40 active:ring-blue-200/80";

export const ExtWrap = ({ children }) => {
  return (
    <>
      <div className="w-full max-w-1000 mx-auto py-5 px-2 flex space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3 flex-col-reverse sm:flex-row">
        <div className="sm:w-3/5 md:w-4/6 bg-white border border-primary/40 rounded-md py-3 px-5">
          {children}
        </div>
      </div>
    </>
  );
};
export const ProtectionInput = styled.input`
  width: 1rem;
  height: 1rem;
  color: #3b82f6;
  background-color: #f3f4f6;
  border-color: #d1d5db;
  ring-color: #3b82f6;
  ring-offset-color: #1f2937;
  ring-width: 2px;
`;

export const ProtectionH1 = () => {
  return (
    <>
      <h1 className="text-2xl  bg-white font-bold text-primary border-b border-primary/20 mb-1 pb-1">
        Travel Protection
      </h1>
    </>
  );
};

export const InputFrom = ({ label, children }) => {
  return (
    <>
      <div className="flex items-center py-1.5">
        <label className="min-w-24 whitespace-nowrap text-primary">
          {label}
        </label>
        {children}
      </div>
    </>
  );
};

export const ContactSection = ({ children }) => {
  return (
    <>
      <div className="sm:w-3/5 md:w-4/6 bg-white border border-primary/40 rounded-md py-3 px-5">
        <h1 className="text-2xl  bg-white font-bold text-primary border-b border-primary/20 mb-1 pb-1">
          Contact Info
        </h1>
        {children}
      </div>
    </>
  );
};

export const PageWrapper = ({ children }) => {
  return (
    <>
      <div className="bg-slate-100 min-h-calc py-4">{children}</div>
    </>
  );
};

export const PassengerInfo = ({ type, no, children }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-primary border-b border-primary/20 mb-1 pb-1 mt-2">
        Passenger {no} <span className="font-normal text-base">( {type} )</span>
      </h1>
      <div className="">{children}</div>
    </>
  );
};

export const SaveTrip = () => {
  return (
    <>
      <h1>Yes, I want to protect my trip for ฿ 300</h1>
      <ul className="text-xs font-normal text-gray-500">
        <li className="flex">
          <BsCheckLg className="mt-1 mr-1" />
          Accidental Medical Expenses
        </li>
        <li className="flex">
          <BsCheckLg className="mt-1 mr-1" />
          24/7 Emergency Assistance & Medical Evacuation
        </li>
        <li className="flex">
          <BsCheckLg className="mt-1 mr-1" />
          Loss/Damage of Baggage & other Personal Items
        </li>
        <li className="flex">
          <BsCheckLg className="mt-1 mr-1" />
          Flight & Baggage Delay Cover
        </li>
        <li className="flex">
          <BsCheckLg className="mt-1 mr-1" />
          Personal Accident & much more
        </li>
      </ul>
    </>
  );
};

export const BaseLuggage = ({ base }) => {
  return (
    <>
      <div className="bg-green-300 border border-green-900 p-2 w-full rounded text-green-900 mt-1 mb-2">
        <p>You have {base?.CarryOn || "0"} kg. for Carry On Bag.</p>
        <p>You have {base?.CheckedIn || "0"} kg. for Checked-In Bag.</p>
      </div>
    </>
  );
};

export const LuggagesDep = ({ luggages, id, fn, addondep }) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="hover:bg-gray-100 cursor-pointer bg-white border p-2 w-full rounded flex">
          <input
            type="radio"
            id={`luggage${id}dep-0`}
            name={`l${id}dep`}
            value={0}
            className="w-3 mr-2 "
            defaultChecked
            onChange={() => fn(id, null)}
          />
          <label
            htmlFor={`luggage${id}dep-0`}
            className="cursor-pointer w-full flex justify-between"
          >
            <span className="cursor-pointer flex items-center">
              No checked-in baggage.
            </span>
          </label>
        </div>
        {luggages?.map((luggage, i) => {
          return (
            <div
              key={luggage.AddOnsID}
              className="hover:bg-gray-100 cursor-pointer bg-white border p-2 w-full rounded flex"
            >
              <input
                type="radio"
                id={`luggage${id}dep-${luggage.Weight}`}
                name={`l${id}dep`}
                value={luggage.AddOnsID}
                className="w-3 mr-2 "
                onChange={() => {
                  fn(id, luggage.AddOnsID);
                }}
              />
              <label
                htmlFor={`luggage${id}dep-${luggage.Weight}`}
                className="cursor-pointer w-full flex justify-between"
              >
                <span className="cursor-pointer flex items-center">
                  + {luggage.Weight} kg.
                </span>
                <span className="cursor-pointer font-bold text-lg whitespace-nowrap">
                  {luggage.Price} ฿
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};
export const LuggagesRet = ({ luggages, id, fn, addonret }) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="hover:bg-gray-100 cursor-pointer bg-white border p-2 w-full rounded flex">
          <input
            type="radio"
            id={`luggage${id}ret-0`}
            name={`l${id}ret`}
            value={0}
            className="w-3 mr-2 "
            defaultChecked
            onChange={() => fn(id, null)}
          />
          <label
            htmlFor={`luggage${id}ret-0`}
            className="cursor-pointer w-full flex justify-between"
          >
            <span className="cursor-pointer flex items-center">
              No checked baggage
            </span>
          </label>
        </div>
        {luggages?.map((luggage, i) => {
          return (
            <div
              key={luggage.AddOnsID}
              className="hover:bg-gray-100 cursor-pointer bg-white border p-2 w-full rounded flex"
            >
              <input
                type="radio"
                id={`luggage${id}ret-${luggage.Weight}`}
                name={`l${id}ret`}
                value={luggage.AddOnsID}
                className="w-3 mr-2 "
                onChange={() => {
                  fn(id, luggage.AddOnsID);
                }}
              />
              <label
                htmlFor={`luggage${id}ret-${luggage.Weight}`}
                className="cursor-pointer w-full flex justify-between"
              >
                <span className="cursor-pointer flex items-center">
                  + {luggage.Weight} kg.
                </span>
                <span className="cursor-pointer font-bold text-lg whitespace-nowrap">
                  {luggage.Price} ฿
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};
