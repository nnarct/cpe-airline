import { Menu } from "./components/sidebarMenu";
export const Sidebar = ({ setContent, current }) => {
  return (
    <>
      <div className="w-52 bg-sky-900">
        <ul className="list-none p-4 space-y-2">
          <Menu current={current} setContent={setContent} content="Dashboard">Dashboard</Menu>
          <Menu current={current} setContent={setContent} content="EmployeeList">Employee List</Menu>
          <Menu current={current} setContent={setContent} content="AirlineList">Airline List</Menu>
          <Menu current={current} setContent={setContent} content="AirportList">Airport List</Menu>
          <Menu current={current} setContent={setContent} content="FlightList">Flight Info</Menu>
          <Menu current={current} setContent={setContent} content="UserList">User List</Menu>
          <Menu current={current} setContent={setContent} content="PassengerList">Passenger List</Menu>

          <Menu current={current} setContent={setContent} content="PlaneList">Plane List</Menu>
        </ul>
      </div>
    </>
  );
};
