import Swal from "sweetalert2";
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
    // Todo- verify userToken 
    Axios.get("http://localhost:3001/invoice/userauth").then((res, err) => {
      if (err) 
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err,
          timer: 4000,
          timerProgressBar: true,
          confirmButtonText: "Close"
        }).then(res => {
          navigate("/");
          return;
        })
      
      if (res.data.Status && res.data.Status === "You are not authenticated") 
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: "Please Log in first.",
          confirmButtonText: "Login"
        }).then(result => {
          if (result.isConfirmed)
            navigate("/login");
          return;
        })
      
      if (res.data.Error && res.data.Error === "Token is not ok") 
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please login again",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        }).then(result => {
          navigate("/");
          return;
        })
      
      if (res.data.Status && res.data.Status === "Success") {
        const value = {
          user: res.data.UserID,
          id: id
        }
        Axios.post("http://localhost:3001/getInvoice", value).then(
          (response, error) => {
            if (error)
              console.log(error);
            if (response.data.Error) {
              Swal.fire({
                icon: "error",
                title: "Sorry",
                text: response.data.Error,
                timer: 3000,
                timerProgressBar: true,
                confirmButtonText: "back to homepage"
              }).then(res => navigate("/"));
            }
            if (response.data.Status === "Success") 
              setInvoice(response.data.Invoice);
          }
        );
      }
    });
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
          })}
      </div>
    </>
  );
};
