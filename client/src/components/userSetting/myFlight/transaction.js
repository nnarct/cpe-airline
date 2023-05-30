import { Item } from "./item";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { OneBooking } from "./oneBooking";
export const Transaction = ({ bookings, s }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookingID = params.get("bookingID");
  const currentPath = location.pathname + location.search.slice(0, 6);

  const [openOneBooking, setOpenOneBooking] = useState(0);
  useEffect(() => {
    if (bookingID === null) setOpenOneBooking(false);
    else setOpenOneBooking(true);
  }, [bookingID]);

  return openOneBooking ? (
    <OneBooking s={s} setOpenOneBooking={setOpenOneBooking} currentPath={currentPath} bookingID={bookingID}/>
  ) : (
    <>
      <ul>
        <div className="mt-3">
          {bookings?.map((booking, i) => {
            return (
              <Link
                key={booking?.bookingID}
                to={`${currentPath}&bookingID=${booking.BookingID}`}
              >
                <span className="max-w-1000 flex items-center mt-3 bg-white border border-gray-200 rounded-lg shadow hover:ring ring-gray-200">
                  <Item {...booking} />
                </span>
              </Link>
            );
          })}
        </div>
      </ul>
    </>
  );
};
