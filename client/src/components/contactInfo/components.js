export const inp =
  "w-full px-1 border outline-none rounded focus:ring focus:ring-1 hover:ring hover:ring-blue-200/40 active:ring-blue-200/80";
export const dob =
  "px-1 border outline-none focus:ring focus:ring-1 hover:ring hover:ring-blue-200/40 active:ring-blue-200/80";
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
      <div className="bg-slate-100 min-h-calc">
        {children}
        </div>
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
