import { useState } from "react";
import {
  ButtonWrap,
  Card,
  DataBlock,
  MyProfileWrapper,
  NameIcon,
} from "./myProfileComps";
export const MyProfile = ({ user, setIsEditing }) => {
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  return (
    <>
      <MyProfileWrapper>
        <Card className="flex items-center">
          <NameIcon>{user.FirstName[0]}</NameIcon>
          <div>
            <DataBlock title={"First Name"} data={user.FirstName} />
            <DataBlock title={"Last Name"} data={user.LastName} />
          </div>
        </Card>
        <Card>
          <DataBlock title={"Email"} data={user.Email} />
        </Card>
        <Card>
          <DataBlock
            title={"Phone Number"}
            data={`${user.TelNo.substring(0, 3)}-${user.TelNo.substring(
              3,
              6
            )}-${user.TelNo.substring(6, 19)}`}
          />
        </Card>

        <ButtonWrap>
          <button
            onClick={() => setIsEditing(true)}
            className="m-2 bg-blue-500 text-white 
font-bold py-2 px-6 rounded hover:ring focus:bg-blue-600"
          >
            Edit
          </button>
        </ButtonWrap>
        <Card>
          <DataBlock title={"Change Password"}>
            <form action="">
              <ul>
                <li className="flex space-x-2 items-center">
                  <p className="w-44 whitespace-nowrap w-1/6">
                    Current Password
                  </p>
                  <input
                    required
                    type="password"
                    className="rounded text-sm border w-4/6 hover:ring outline-none p-1 m-1 focus:ring ring-blue-200/40"
                  />
                </li>
                <li className="flex space-x-2 items-center">
                  <p className="w-44 whitespace-nowrap w-1/6">New Password</p>
                  <input
                    required
                    type="password"
                    className="rounded text-sm border w-4/6 hover:ring outline-none p-1 m-1 focus:ring ring-blue-200/40"
                    onChange={(e) => {
                      setNewPass(e.target.value);
                    }}
                  />
                </li>
                <li className="flex space-x-2 items-center">
                  <p className="w-44 whitespace-nowrap w-1/6">
                    Confirm New Password
                  </p>
                  <input
                    required
                    type="password"
                    className="rounded text-sm border w-4/6 hover:ring outline-none p-1 m-1 focus:ring ring-blue-200/40"
                    onChange={(e) => {
                      setNewPass2(e.target.value);
                    }}
                  />
                </li>
                {newPass !== newPass2 ? (
                  <div className="bg-red-200 p-1 rounded text-red-600 text-center">
                    Password does not match.
                  </div>
                ) : null}
              </ul>
            </form>
          </DataBlock>
        </Card>
      </MyProfileWrapper>
    </>
  );
};
