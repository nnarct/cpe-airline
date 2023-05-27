export const Seat = ({ seatNumber, seatStatus }) => {
    return seatStatus === 1 ? (
        <div className="m-2">

            <input disabled type="radio" id={seatNumber} name="SeatSelect" className="hidden peer" />
            <label htmlFor={seatNumber} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-gray-200 border-2 border-gray-200 rounded-lg ">
                {seatNumber}
            </label>
        </div>

    ) : (
        <div className="m-2">
            <input  type="radio" id={seatNumber} name="SeatSelect" className="hidden peer" />
            <label htmlFor={seatNumber} className="inline-flex items-center justify-between w-full p-5 text-black bg-orange-300 border-2 border-orange-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <p>{seatNumber}</p>
            </label>
        </div>
    );

};