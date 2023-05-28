import Axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Star } from "../../components/star";

export const AddAirport = () => {
  const [values, setValues] = useState({
    AirportID: "",
    Name: "",
    IATA: "",
    State: "",
    Province: "",
    section:"",
  });
  const handleSubmit = (e) => {
    if (values.IATA.length !== 3) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "IATA must be 3 capital characters",
        timer: 2000,
        timerProgressBar: true,
      });
    } else {
      Axios.post("http://localhost:3001/system/insertAirport", values)
        .then((res) => {
          if (res.data.Status === "Create new airport successfully! :)")
            Swal.fire({
              icon: "success",
              title: "Success",
              text: res.data.Status,
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          else
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.data.Error,
              timer: 5000,
              timerProgressBar: true,
            });
        })
        .then((err) => {
          if (err) console.log(err);
        });
    }
  };
  return (
    <>

      <div className="">
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
              onChange={(e) =>
                setValues({ ...values, IATA: e.target.value.toUpperCase() })
              }
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
              onChange={(e) =>
                setValues({ ...values, Province: e.target.value })
              }
            />
            
          <label htmlFor="section">
            section
            <Star />
          </label>
          <select
            id="section"
            className="mb-2 border rounded p-1"
            value={values.section} // Assuming you have a state variable named `values` where you store form data
            onChange={(e) => setValues({ ...values, section: e.target.value })}
           >
            <option value="South">South</option>
            <option value="Central">Central</option>
            <option value="North">North</option>
            <option value="Northeast">Northeast</option>
          </select>

            <button
              className="bg-blue-500 text-white rounded py-1 px-3 hover:opacity-40  active:opacity-80"
              type="submit"
            >
              Add Airport
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
