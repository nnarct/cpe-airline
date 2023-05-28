export const Seat = ({ seat }) => {
  if (seat.isBooked)
    return (
      <>
        <div
          className={`col-span-2 flex items-center justify-center font-bold text-xl w-full text-gray-500 border-2 border-gray-600 py-4 bg-gray-300 rounded-lg ${
            seat.SeatCode.includes("C") ? "mr-2" : ""
          }`}
        >
          {seat.SeatCode}
        </div>
        {seat.SeatCode.includes("C") && <div className="w-12" />}
      </>
    );
  return (
    <>
      <div
        className={`col-span-2 shadow flex items-center justify-center w-full cursor-pointer font-bold text-xl border-2 py-4 border-gray-600 rounded-lg ${
          seat.Class === "Economy"
            ? "bg-blue-300 border-blue-100 hover:border-blue-400"
            : "bg-green-300 border-green-100 hover:border-green-400"
        }  `}
      >
        {seat.SeatCode}
      </div>
      {seat.SeatCode.includes("C") && <div className="w-12" />}
    </>
  );
};
