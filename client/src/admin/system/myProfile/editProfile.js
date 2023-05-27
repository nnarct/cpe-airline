import Axios from "axios";
import Swal from "sweetalert2";

export const editProfile = (info, setInfo) => {
  Swal.fire({
    title: "Edit Profile",
    html: `
    <form>
      //from here // firstName, lastName, email, telNo, 
      //ไม่ต้องใส่ username, password
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
      // return value
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.post("http://localhost:3001/admin/editProfile", result.value).then(
        (res, err) => {
          //if err
          //if success => then setInfo(res.data.Info) (แทน get บลาๆ  )
          // else (res.data.Error)
        }
      );
    }
  });
};
