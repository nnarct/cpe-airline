import Axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../../navbar";
export const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    const id = params.get("id");
    if (id === null) navigate("/");
    else
      Axios.post("http://localhost:3001/getInvoice", { id: id }).then(
        (res, err) => {
          if (err) console.log(err);
          if (res.data.Error) alert(res.data.Error);
          else if (res.data.Status === "Success") setInvoice(res.data.Invoice);
        }
      );
  }, []);

  // Todo - UI for invoice
  // Todo - validate only user of the invoice can see the invoice

  return (
    <>
      <Navbar />
      <div className="min-h-calc container mx-auto border-l border-r">
        {invoice &&
          invoice.map((invc, i) => {
            return (
              <div key={i}>
                <ul>
                  <li>invoiceID : {invc.InvoiceID}</li>
                  <li>
                    name: {invc.fname} {invc.lname}
                  </li>
                </ul>
              </div>
            );
          })}{" "}
      </div>
    </>
  );
};
