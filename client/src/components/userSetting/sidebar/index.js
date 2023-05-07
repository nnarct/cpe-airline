export const Sidebar = ({ content, setContent }) => {
  return (
    <>
      <div className="bg-white border border-r p-1">
        <ul>
          <li
            className="px-5 py-2 text-primary whitespace-nowrap rounded-md hover:text-white hover:bg-blue-500 cursor-pointer transition duration-200 linear"
            onClick={() => setContent("My Profile")}
          >
            Edit Profile
          </li>
          <li
            className="px-5 py-2 text-primary whitespace-nowrap rounded-md hover:text-white hover:bg-blue-500 cursor-pointer transition duration-200 linear"
            onClick={() => setContent("My Flight")}
          >
            My Flight
          </li>
        </ul>
      </div>
    </>
  );
};
