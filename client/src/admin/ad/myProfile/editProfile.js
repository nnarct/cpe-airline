import Axios from "axios";
import Swal from "sweetalert2";

export const editProfile = (info, setInfo, airlines, setAirlines) => {
  Swal.fire({
    title: "Edit Profile",
    html: `
    <form>
      //from here // firstName, lastName, email, telNo, Airline
      //ไม่ต้องใส่ username, password, position
      <form>
              <div class="flex items-center justify-center ">
                <label htmlFor="FirstName" class="w-24 block">FirstName</label>
                <input id="swal-input1" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" placeholder="FirstName" value="${
                  info?.FirstName
                }">
              </div>
              <div class="flex items-center justify-center py-2.5">
                <label htmlFor="LastName" class="w-24 block">LastName</label>
                <input id="swal-input2" class="w-full md:w-4/5 px-2 py-2.5 active:ring rounded border" placeholder="LastName" value="${
                  info?.LastName
                }">
              </div>
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
