import { ButtonWrap, Card, DataBlock, MyProfileWrapper, NameIcon } from "./myProfileComps";
export const MyProfile = ({ user, setIsEditing }) => {
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
            data={`${user.TelNo.substring(0, 3)}-${user.TelNo.substring(3, 6)}-${user.TelNo.substring(6, 19)}`}
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
      </MyProfileWrapper>
    </>
  );
};
