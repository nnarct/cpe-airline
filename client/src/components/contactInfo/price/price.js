import Axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Price = ({ protection, addondep, addonret, setTotal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const pass =
    Number(params.get("adult")) +
    Number(params.get("child")) +
    Number(params.get("infant"));
  const flightData = {
    isReturn: Number(params.get("isReturn")),
    DepartureFlightID: params.get("departureFlightID"),
    ReturnFlightID: params.get("returnFlightID"),
    Class: params.get("class"),
  };
  if (
    flightData.DepartureFlightID === null ||
    (flightData.isReturn === 1 && flightData.ReturnFlightID === null)
  )
    navigate("/");
  const [depPrice, setDepPrice] = useState([]);
  const [retPrice, setRetPrice] = useState([]);

  // set base flight price from departure flight price and return flight price
  const basePrice = flightData.isReturn
    ? depPrice?.Price + retPrice?.Price
    : depPrice?.Price;

  const addOnsDepPrice = addondep.reduce((sum, a) => {
    if (a && typeof a === "object" && "Price" in a) return sum + a.Price;
    return sum;
  }, 0); // sum price of all selected add ons for departure flight
  const addOnsRetPrice = addonret.reduce((sum, a) => {
    if (a && typeof a === "object" && "Price" in a) return sum + a.Price;
    return sum;
  }, 0);
  const addOnsTotalPrice = addOnsDepPrice + addOnsRetPrice;
  useEffect(() => {
    Axios.post("http://localhost:3001/getPrice", flightData).then(
      (res, err) => {
        if (err) throw err;
        if (res.data.Status === "Success") {
          setDepPrice(res.data.DepartureFlightPrice);
          if (flightData.isReturn === 1)
            setRetPrice(res.data.ReturnFlightPrice);
        } else console.log(res.data.Error);
      }
    );
    setTotal(addOnsTotalPrice + (protection ? 300 : 0) + basePrice * pass);
  }, []);
  return (
    <div className="bg-white border border-primary/40 rounded-md py-3 px-3 mt-3">
      <h2 className="text-center font-bold text-2xl border-b">Price</h2>
      <div className="px-2 text-sm">
        <div className="flex justify-between font-bold pt-2 pb-2">
          <span>Adult</span>
          <span>
            <span>฿ </span>
            {basePrice?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {" x "} {pass}
          </span>
        </div>
        <div className="flex justify-between text-gray-600 pb-2">
          <span>Base fare </span>
          <span>
            <span>฿ </span>
            {(basePrice * pass)
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </div>
        {(protection || addOnsTotalPrice > 0) && (
          <div className="flex justify-between font-bold pt-2 mt-1 border-t">
            <span>Add-ons</span>
            <span>
              <span>฿ </span>
              {(addOnsTotalPrice + (protection ? 300 : 0))
                ?.toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
        )}
        {addOnsTotalPrice > 0 && (
          <div className="flex justify-between text-gray-600 pt-2 mb-1">
            <span>Checked baggage</span>
            <span>
              <span>฿ </span>
              {addOnsTotalPrice
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
        )}
        {protection === true && (
          <div className="flex justify-between text-gray-600 pt-2 mb-2">
            <span>Trip protection</span>
            <span>
              <span>฿ </span>
              300
            </span>
          </div>
        )}
        {
          <div className="flex justify-between font-bold pt-2 mt-1 border-t">
            <span>Total</span>
            <span>
              <span>฿ </span>
              {(addOnsTotalPrice + (protection ? 300 : 0) + basePrice * pass)
                ?.toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
        }
      </div>
    </div>
  );
};
