import { useEffect, useState } from "react";
import { editProfile } from "./editProfile";
import {
  MyProfileWrapper,
  Card,
  NameIcon,
  DataBlock,
  ButtonWrap,
} from "./styles";
import { getInfo } from "./getInfo";
import { useCookies } from "react-cookie";
export const MyProfile = () => {
  const cookies = useCookies();
  const cookie = cookies[0].admin;
  const [info, setInfo] = useState({});
  const [airlines, setAirlines] = useState([]);
  useEffect(() => {
    getInfo(cookie, setInfo, setAirlines);
  }, [cookie]);
  return (
    <>
      <MyProfileWrapper>
        <div className="my-3 flex justify-center text-4xl font-semibold">
          Admin
        </div>
        <Card className="flex items-center">
          <NameIcon>{info.FirstName ? info.FirstName[0] : ""}</NameIcon>
          <div>
            <DataBlock title={"First Name"}>{info?.FirstName}</DataBlock>
            <DataBlock title={"Last Name"}>{info?.LastName}</DataBlock>
          </div>
        </Card>
        <Card>
          <DataBlock title={"Email"}>{info?.Email || "-"}</DataBlock>
        </Card>
        <Card>
          <DataBlock title={"Phone Number"}>{info?.TelNo || "-"}</DataBlock>
        </Card>
        <Card>
          <DataBlock title={"UserName"}>{info?.username}</DataBlock>
        </Card>
        <Card>
          <DataBlock title={"Password"}>******</DataBlock>
        </Card>

        <ButtonWrap>
          <button
            onClick={() => editProfile(info, setInfo, airlines, setAirlines)}
            className="m-2 bg-blue-500 text-white font-bold py-2 px-6 rounded hover:ring focus:bg-blue-600"
          >
            Edit
          </button>
        </ButtonWrap>
      </MyProfileWrapper>
    </>
  );
};
