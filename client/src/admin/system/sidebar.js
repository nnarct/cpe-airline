export const Sidebar = ({ setContent }) => {
  const Menu = ({ content, children }) => {
    return (
      <li
        onClick={() => setContent(content)}
        className="whitespace-nowrap hover:bg-sky-800 px-2 rounded text-white"
      >
        {children}
      </li>
    );
  };
  return (
    <>
      <div className="w-52 bg-sky-900">
        <ul className="list-none p-4 space-y-2">
          <Menu content="EmployeeList">Employee List</Menu>
          <Menu content="AirlineList">Airline List</Menu>
          <Menu content="AirportList">Airport List</Menu>
        </ul>
      </div>
    </>
  );
};
