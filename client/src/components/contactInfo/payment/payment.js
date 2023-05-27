import Axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../../navbar";
import { PageWrapper } from "../components";
import { Star } from "../../../admin/components/star";
const handleNumber = (e) => {
  if (
    !/[0-9]/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight"
  )
    e.preventDefault();
};

const handelAlpha = (e) => {
  if (
    !/[a-zA-Z ]/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "." &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight"
  )
    e.preventDefault();
};

const PromptPay = () => {
  return (
    <>
      <ul className="pl-4">
        <li className="flex items-center space-x-3">
          <label htmlFor="PromtpayNumber">
            Citizen ID/Phone Number <Star />
          </label>
          <input
            required
            type="text"
            className="w-48 p-1 m-1 border rounded outline-none hover:ring active:ring-blue-200/80"
            name="PromtpayNumber"
            maxLength={13}
            minLength={10}
            onKeyDown={handleNumber}
            placeholder="Citizen ID/Phone Number"
          />
        </li>
      </ul>
    </>
  );
};

const Credit = ({ exp, setExp }) => {
  // Todo - validation
  return (
    <>
      <ul className="w-full pl-4">
        <li className="flex items-center">
          <label className="w-40 block text-right pr-2" htmlFor="cardHolder">
            Card Holder Name <Star />
          </label>
          <input
            required
            type="text"
            className="w-52 p-1 m-1 border rounded outline-none hover:ring active:ring-blue-200/80"
            name="cardHolder"
            maxLength={40}
            placeholder="Card Holder Name"
            onKeyDown={handelAlpha}
          />
        </li>
        <li className="flex items-center">
          <label className="w-40 block text-right pr-2" htmlFor="cardNumber">
            Card Number <Star />
          </label>
          <input
            required
            type="text"
            className="w-52 p-1 m-1 border rounded outline-none hover:ring active:ring-blue-200/80"
            name="cardNumber"
            pattern="[0-9]{16}"
            maxLength={16}
            minLength={16}
            placeholder="Card Number"
            onKeyDown={handleNumber}
          />
        </li>
        <li className="flex items-center">
          <label className="w-40 block text-right pr-2" htmlFor="expDate">
            Expire Date <Star />
          </label>
          <select
            required
            type="text"
            className="w-12 p-1 m-1 border rounded outline-none hover:ring active:ring-blue-200/80"
            name="expMonth"
            value={exp?.month}
            onChange={(e) => setExp({ ...exp, month: e.target.value })}
          >
            {[...Array(12).keys()].map((i) => {
              return (
                <option key={i} value={String(i + 1).padStart(2, "0")}>
                  {String(i + 1).padStart(2, "0")}
                </option>
              );
            })}
          </select>
          {" / "}
          <select
            required
            type="text"
            className="w-12 p-1 m-1 border rounded outline-none hover:ring active:ring-blue-200/80"
            name="expYear"
            value={exp?.year}
            onChange={(e) => setExp({ ...exp, year: String(e.target.value) })}
          >
            {[...Array(7).keys()].map((i) => {
              return (
                <option key={i} value={i + 23}>
                  {i + 23}
                </option>
              );
            })}
          </select>
        </li>
        <li className="flex items-center">
          <label className="w-40 block text-right pr-2" htmlFor="cvv">
            CVV <Star />
          </label>
          <input
            required
            type="text"
            className="w-12 p-1 m-1 border rounded outline-none hover:ring active:ring-blue-200/80"
            name="cvv"
            placeholder="CVV"
            maxLength={3}
            minLength={3}
            onKeyDown={handleNumber}
          />
        </li>
      </ul>
    </>
  );
};

export const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentForm = useRef(null);
  const params = new URLSearchParams(location.search);
  const price = 1000;
  const [type, setType] = useState({ Name: "Visa", PaymentID: 1 });
  const [exp, setExp] = useState({ month: "06", year: "23" });
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    if(sessionStorage.passenger == null || sessionStorage.contact === null || sessionStorage.contact === undefined)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Session expired, please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3B82F6",
      }).then(() => navigate("/"));
    Axios.post("http://localhost:3001/getPayment").then((res, err) => {
      if (err) {
        Swal.fire({
          icon: "error",
          title: "API Error",
          text: "Error while getting payment method.",
          confirmButtonText: "OK",
          confirmButtonColor: "#3B82F6",
        }).then(() => navigate("/"));
      }
      else setPayments(res.data.Payments);
    });
  }, []);

  const handleSubmit = (e) => {
    // Todo - validation
    e.preventDefault();
    if (
      sessionStorage.passenger !== null &&
      sessionStorage.passenger !== undefined &&
      sessionStorage.contact !== null &&
      sessionStorage.contact !== undefined
    ) {
      const contact = JSON.parse(sessionStorage.contact);
      const passenger = JSON.parse(sessionStorage.passenger);
      const form = paymentForm.current;
      let booking = {
        contact: contact,
        passenger: passenger,
        isReturn: params.get("isReturn"),
        Total: price,
        departureFlightID: params.get("departureFlightID"),
      };
      if (params.get("returnFlightID") !== null)
        booking.returnFlightID = params.get("returnFlightID");

      if (type.Name === "PromptPay") {
        if(form["PromtpayNumber"].value.length !== 10 && form["PromtpayNumber"].value.length !== 13){
          Swal.fire({
            icon: "error",
            title: "Oops! Sorry",
            text: "PromtPay number must be 10 0r 13 digits",
          });
          return;
        }
        if(contact.firstname + " " + contact.lastname === '' || form["PromtpayNumber"].value === ''){
          Swal.fire({
            icon: "error",
            title: "Oops! Sorry",
            text: "Please fill all the fields",
          });
          return;
        }
        booking.payment = {
          PaymentID: type.PaymentID,
          BillTo: contact.firstname + " " + contact.lastname,
          PromtpayNumber: form["PromtpayNumber"].value,
        };
      } else {
        if(form["cardHolder"].value === '' || form["cardNumber"].value === '' || form["cvv"].value === '' || exp.month === '' || exp.year === ''){
          Swal.fire({
            icon: "error",
            title: "Oops! Sorry",
            text: "Please fill all the fields",
          });
          return;
        }
        booking.payment = {
          PaymentID: type.PaymentID,
          BillTo: form["cardHolder"].value,
          CardNumber: form["cardNumber"].value,
          ExpDate: exp.month + "/" + exp.year,
          CVV: form["cvv"].value,
        };
      }
      Axios.post("http://localhost:3001/insertBooking", booking).then(
        (res, err) => {
          if (err) console.log(err);
          if (res.data.Error) {
            Swal.fire({
              icon: "error",
              title: "Oops! Sorry",
              text: "Something went wrong, please contact admin..",
            });
            return;
          }
          if (res.data.Status) {
            Swal.fire({
              icon: "success",
              title: res.data.Status,
              text: "Your booking has been made!",
              timer: 4000,
              timerProgressBar: true,
              confirmButtonColor: "#3085d6",
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.timer
              ) {
                sessionStorage.clear();
                navigate("/invoice?id=" + res.data.ID);
              }
            });
          }
        }
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Return to home page in 4 seconds.",
        timer: 4000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) navigate("/");
      });
    }
  };

  return (
    <>
    
      <Navbar />
      <PageWrapper>
        
        <form
          ref={paymentForm}
          className="mx-auto bg-white w-120 flex flex-col p-3 md:p-6 rounded-xl shadow"
        >
          <h1 className="text-primary font-black text-4xl pb-4 mb-4 border-b">
            Payment
          </h1>
          <span className="pl-4 flex items-center pb-4 mb-4 border-b text-lg">
            <label
              htmlFor="paymentMethod"
              className="pr-2 text-right font-semibold"
            >
              Select payment method <Star />
            </label>
            <select
              name="payment"
              className="w-min px-1 m-1 border rounded outline-none hover:ring active:ring-blue-200/80"
              onChange={(e) => setType(JSON.parse(e.target.value))}
            >
              {payments &&
                payments.map((payment, i) => {
                  return (
                    <option key={i} value={JSON.stringify(payment)}>
                      {payment.Name}
                    </option>
                  );
                })}
            </select>
          </span>
          {type.Name === "PromptPay" ? (
            <PromptPay />
          ) : (
            <Credit exp={exp} setExp={setExp} />
          )}
          <div className="text-right border-t py-3 mt-4">
            <span className="font-bold text-xl">Total</span>
            <span className="font-bold text-3xl px-5">{price}</span>
            <span>฿ </span>
          </div>
          <button
            onClick={handleSubmit}
            className="float-left bg-blue-500 rounded-md hover:ring my-2 py-2 text-xl text-white font-bold"
          >
            Submit Payment
          </button>
        </form>
      </PageWrapper>
    </>
  );
};
