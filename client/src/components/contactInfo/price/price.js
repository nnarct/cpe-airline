import Axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Price = () => {
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
  },[]);
  const basePrice = flightData.isReturn
    ? depPrice?.find((p) => p.Class === flightData.Class)?.Price +
      retPrice?.find((p) => p.Class === flightData.Class)?.Price
    : depPrice?.find((p) => p.Class === flightData.Class)?.Price;
    console.log(String(basePrice).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  return (
    <div className="bg-white border border-primary/40 rounded-md py-3 px-3 mt-3">
      <h2 className="text-center font-bold text-2xl border-b">Price</h2>
      <p className="">Departure Flight</p>
      <table className="table-fixed">
        <tr className="text-sm font-bold">
          <td className="w-full">Adult</td>
          <td className="whitespace-nowrap">
            {String(basePrice)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {' x '} {pass} {' '} <span>฿</span>
          </td>
        </tr>
        <tr>Ticket Price</tr>
      </table>
    </div>
  );
};
