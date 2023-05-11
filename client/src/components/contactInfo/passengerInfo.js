export const PassengerInfo = ({ type, no,children }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-primary border-b border-primary/20 mb-1 pb-1 mt-2">
        Passenger {no} <span className="font-normal text-base">( {type} )</span>
      </h1>
      <div className="">{children}</div>
    </>
  );
};
