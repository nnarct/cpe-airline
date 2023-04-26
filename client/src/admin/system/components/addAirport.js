import Axios from "axios";
import { useState } from "react";
export const AddAirport = () => {
  const Star = () => {
    return <span className="text-red-500">*</span>;
  };
  const [values, setValues] = useState({
    AirportID: "",
    Name: "",
    IATA: "",
    State: "",
    Province: "",
  });
  const handleSubmit = (e) => {
    if (values.IATA.length !== 3) {
      alert("IATA must be 3 capital characters");
    } else {
      
      Axios.post("http://localhost:3001/system/insertAirport", values)
        .then((res) => {
          if (res.data.Status === "Create new airport successfully! :)") {
            alert(res.data.Status);
          } else {
            alert(res.data.Error);
          }
        })
        .then((err) => {
          if (err) console.log(err);
        });
    }
  };
  return (
    <>
      <div className="flex flex-col items-center bg-gray-50 border rounded mt-4 p-3">
        <h1 className="text-xl">Add New Airport</h1>
        <form
          className="rounded w-96 flex flex-col p-4 "
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label htmlFor="name">
            Airport Name <Star />
          </label>
          <input
            required
            name="name"
            type="text"
            className="mb-2 border rounded p-1"
            placeholder="Airport Name"
            onChange={(e) => setValues({ ...values, Name: e.target.value })}
          />
          <label htmlFor="iata">
            IATA
            <Star />
          </label>
          <input
            required
            name="iata"
            type="text"
            className="mb-2 border rounded p-1"
            placeholder="IATA"
            onChange={(e) => setValues({ ...values, IATA: e.target.value.toUpperCase() })}
          />
          <label htmlFor="state">
            State
            <Star />
          </label>
          <input
            required
            name="state"
            type="text"
            className="mb-2 border rounded p-1"
            placeholder="State"
            onChange={(e) => setValues({ ...values, State: e.target.value })}
          />
          <label htmlFor="province">
            Province
            <Star />
          </label>
          <input
            required
            name="province"
            type="text"
            className="mb-2 border rounded p-1"
            placeholder="Province"
            onChange={(e) => setValues({ ...values, Province: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white rounded py-1 px-3 hover:opacity-40  active:opacity-80"
            type="submit"
          >
            Add Airport
          </button>
        </form>
      </div>
    </>
  );
};
