export const Row = ({ head, children }) => {
    return (
      <>
        <div className="mb-4 flex w-full px-3">
          <span className="w-32 min-w-fit px-3 py-1 flex items-center bg-white rounded-l border border-r-0   border-neutral-300 text-center leading-6 text-neutral-700 font-semibold whitespace-nowrap">
            {head}
          </span>
          {children}
        </div>
      </>
    );
  };
  
  export const Card = ({ className, children }) => {
    return (
      <>
        <div
          className={`p-2 m-2 bg-white border border-neutral-200 rounded hover:ring ring-blue-200/20 ${className}`}
        >
          {children}
        </div>
      </>
    );
  };
  
  export const MyProfileWrapper = ({ children }) => {
    return (
      <>
      <div className="flex justify-center items-center ">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col w-full">{children}</div>
        </div>
      </div>
      </>
    );
  };
  
  export const NameIcon = ({ children }) => {
    return (
      <>
        <div className="m-3 flex items-center justify-center bg-orange-600  border border-orange-300 border-4 text-white  text-4xl w-20 h-20 uppercase rounded-full">
          <span>{children}</span>
        </div>
      </>
    );
  };
  
  export const DataBlock = ({ title, children }) => {
    return (
      <>
        <h4 className="text-lg font-semibold">{title}</h4>
        <span>{children}</span>

        
      </>
    );
  };
  
  export const ButtonWrap = ({ children }) => {
    return (
      <>
        <div className="w-full flex items-center justify-end">{children}</div>
      </>
    );
  };
  
  export const ErrorMessage = ({ err }) => {
    return (
      <div className="bg-red-200 p-1 rounded text-red-600 text-center my-1">
        {err}
      </div>
    );
  };
  