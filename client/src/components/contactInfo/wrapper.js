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
        <div className="w-full max-w-1000 mx-auto py-5 px-2 flex space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3 flex-col-reverse sm:flex-row">
          {children}
        </div>
      </div>
    </>
  );
};
