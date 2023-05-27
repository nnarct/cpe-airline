import Axios from "axios";
import Swal from "sweetalert2";
export const getInfo = (cookieID, setInfo) => {
  Axios.post("http://localhost:3001/admin/info", { cookieID }).then(
    (res, err) => {
      if (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
          confirmButtonColor: "#3085d6",
        });
        return;
      }
      if (res.data.Status === "Success") {
        setInfo(res.data.Info);
        return;
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res.data.Error,
        confirmButtonColor: "#3085d6",
      });
    }
  );
};
