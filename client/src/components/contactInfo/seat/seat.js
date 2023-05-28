import Swal from "sweetalert2";

export const checkUniqueData = (dep, ret) => {
  const combined = [...dep, ...ret];
  const uniqueSet = new Set(combined);
  return combined.length === uniqueSet.size;
};
export const Seat = ({ id, seat, seatID, setSeatID, dif }) => {
  const handleSeat = (index, element) => {
    if(seatID.includes(element)) return; // seat is already selected
    const newArray = seatID.map((seat, i) => {
      if (i === index) return element;
      return seat;
    });
    setSeatID(newArray);
  };

  if (seat.isBooked)
    return (
      <>
        <div
          className={`col-span-2 flex items-center justify-center font-bold text-xl w-full text-gray-500 border-2 border-gray-400 py-4 bg-gray-300 rounded-lg ${
            seat.SeatCode.includes("C") ? "mr-2" : ""
          }  `}
          onClick={() => {
            Swal.fire({
              position: "top-end",
              html: `<h1 class="text-2xl text-red-600">Seat ${seat.SeatCode} is not available.</h1>`,
              showConfirmButton: false,
              timer: 1000,
              backdrop: false,
            });
          }}
        >
          {seat.SeatCode}
        </div>
        {seat.SeatCode.includes("C") && <div className="w-12" />}
      </>
    );
  return (
    <>
      <div
        className={`col-span-2 shadow flex items-center justify-center w-full cursor-pointer font-bold text-xl border-2 py-4 rounded-lg  ${seatID.includes(seat.SeatID) ? "bg-red-400" : 
        (  seat.Class === "Economy"
          ? "bg-blue-300 border-blue-100 hover:border-blue-400"
          : "bg-green-300 border-green-100 hover:border-green-400")
        } `}
        onClick={() => handleSeat(id, seat.SeatID)}
      >
        {seat.SeatCode}
      </div>
      {seat.SeatCode.includes("C") && <div className="w-12" />}
    </>
  );
};
