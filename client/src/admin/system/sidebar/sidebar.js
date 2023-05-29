import "./sidebar.css";
import { Menu } from "./sidebarMenu";

export const Sidebar = ({ setContent, current }) => {
  return (
    <>
      <div className="w-52 bg-sky-900 max-h-calc overflow-y-auto admin-sidebar">
        <ul className="list-none p-4 space-y-2">
          <Menu current={current} content="Dashboard">
            Dashboard
          </Menu>
          <Menu current={current} content="EmployeeList">
            Employee List
          </Menu>
          <Menu current={current} content="AirlineList">
            Airline List
          </Menu>
          <Menu current={current} content="AirportList">
            Airport List
          </Menu>
          <Menu current={current} content="FlightList">
            Flight Info
          </Menu>
          <Menu current={current} content="UserList">
            User List
          </Menu>
          <Menu current={current} content="PassengerList">
            Passenger List
          </Menu>

          <Menu current={current} content="PlaneList">
            Plane List
          </Menu>
          <Menu current={current} content="FlightRoute">
            Route
          </Menu>
        </ul>
      </div>
    </>
  );
};
