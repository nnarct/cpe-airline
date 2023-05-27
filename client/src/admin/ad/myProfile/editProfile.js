import Axios from "axios";
import Swal from "sweetalert2";

export const editProfile = (info, setInfo, airlines, setAirlines) => {
  Swal.fire({
    title: "Edit Profile",
    html: `
    <form>
      //from here // firstName, lastName, email, telNo, Airline
      //ไม่ต้องใส่ username, password, position
    </form>    
    `,
    showCancelButton: true,
    confirmButtonText: `Save`,
    cancelButtonText: `Cancel`,
    focusCancel: true,
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
    preConfirm: () => {
      // validate input-> fill all field
      return {
        // all input + id: info.EmployeeID
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.post("http://localhost:3001/admin/editProfile", result.value).then(
        (res, err) => {
          //if err
          //if success => then getInfo(cookie, setInfo, airlines, setAirlines);
          // else (res.data.Error)
        }
      );
    }
  });
};
