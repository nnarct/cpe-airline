import Axios from "axios";
import Swal from "sweetalert2";
import { getInfo } from "./getInfo";
// import { useCookies } from "react-cookie";
// const cookies = useCookies();
// const cookie = cookies[0].admin;
// const [info, setInfo] = useState({});
// useEffect(() => {
//   getInfo(cookie, setInfo);
// }, [cookie]);
// export const getInfo = async (cookie,setInfo) => {
//   try {
//     const res = await fetch("http://localhost:3001/system/myProfile");
//     const data = await res.json();
//     setInfo(data.Data);
//   } catch (error) {
//   }
// };
export const editProfile = (info, setInfo, cookie) => {
  Swal.fire({
    title: "Edit Profile",
    html: `
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
              </div>
              <div class="flex items-center justify-center">
              <label for="Email" class="w-24 block">Email</label>
              <input type="email" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" id="Email" value="${
                info.Email}">
            </div>
            <div class="flex items-center justify-center">
              <label for="TelNo" class="w-24 block">TelNo</label>
              <input type="text" class="w-full md:w-4/5 px-2 py-1.5 active:ring rounded border my-2" id="TelNo" value="${
                info.TelNo}">
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
      const FirstName = document.getElementById("FirstName").value;
      const LastName = document.getElementById("LastName").value;
      const Email = document.getElementById("Email").value;
      const TelNo = document.getElementById("TelNo").value;
      if (FirstName === "" || LastName === "" || Email === "" || TelNo === "")
        Swal.showValidationMessage(`Please enter all information.`);
      if (!/^[a-zA-Z\s]+$/.test(FirstName) || !/^[a-zA-Z\s]+$/.test(LastName))
        Swal.showValidationMessage(
          `First name and last name must be alphabet only.`
        );
      if (FirstName.length > 40 || LastName.length > 40)
        Swal.showValidationMessage(
          `First name and last name must be less than 40 characters.`
        );
      if (TelNo.length !== 10)
        Swal.showValidationMessage(`Phone number must be 10 numbers.`);
      if (TelNo[0] !== "0")
        Swal.showValidationMessage(`Phone number must start with 0.`);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email))
        Swal.showValidationMessage(`Please enter a valid email.`);
      return {
        EmployeeID: info.EmployeeID,
        FirstName,
        LastName,
        Email,
        TelNo,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) 
      Axios.post("http://localhost:3001/system/editProfile",result.value
      ).then((res, err) => {
          if (err){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return;
        }
          if (res.data.Status){
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.Status,
            timer: 3000,
            timerProgressBar: true,
            confirmButtonColor: "#2563eb",
          }).then(()=>{
            getInfo(cookie, setInfo);
          });
        }
        else if (res.data.Error)
          Swal.fire({
            icon: "error",
            title: "Sorry",
            text: res.data.Error,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      );
    });
};