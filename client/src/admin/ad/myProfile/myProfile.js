import {
    ButtonWrap,
    Card,
    DataBlock,
    MyProfileWrapper,
    NameIcon,
  } from "./styles";

export const MyProfile = () => {
    return (
      <>
      <div className="my-3 flex justify-center text-4xl font-semibold">Admin</div>
        <MyProfileWrapper>
          <Card className="flex items-center">
            <NameIcon>AD</NameIcon>
            <div>
              <DataBlock title={"First Name"} children="Jonathan" />
              <DataBlock title={"Last Name"} children="Jones" />
            </div>
          </Card>
          <Card>
            <DataBlock title={"AirlineID"} children="2" />
          </Card>
          <Card>
            <DataBlock title={"Email"} children="Johnjo12@gmailcom" />
          </Card>
          <Card>
            <DataBlock title={"Phone Number"} children= "093438236" />
          </Card>
          <Card>
            <DataBlock title={"UserName"} children= "JonesJo02" />
          </Card>
          <Card>
            <DataBlock title={"PassWord"} children= "**********" />
          </Card>
          
          <ButtonWrap>
          <button
              // onClick={()}
              className="m-2 bg-blue-500 text-white font-bold py-2 px-6 rounded hover:ring focus:bg-blue-600"
            > Edit </button>
          </ButtonWrap>
  
  
        </MyProfileWrapper>
      </>
    );
  };