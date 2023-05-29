import { useLocation, useNavigate } from "react-router-dom";

export const Price = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const flightData = {
    isReturn: Number(params.get("isReturn")),
    departureFlightID: params.get("departureFlightID"),
    returnFlightID: params.get("returnFlightID"),
  };
  if (
    flightData.departureFlightID === null ||
    (flightData.isReturn === 1 && flightData.returnFlightID === null)
  )
    navigate("/");

  return (
    <div className="bg-white border border-primary/40 rounded-md py-3 px-3 mt-3">
      <h2 className="text-center font-bold text-2xl border-b">Price</h2>

      <p>Price: $1,000</p>
      <p>Deposit: $500</p>
      <p>Balance: $500</p>
    </div>
  );
};
