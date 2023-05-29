import { Link, useLocation } from "react-router-dom";
export const Menu = ({ text, selectedSection, setSelectedSection }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentPath = location.pathname + location.search.slice(0, 6);
  return (
    <>
    <Link to={currentPath}>
      <li
        onClick={() => setSelectedSection(text)}
        className={`cursor-pointer mr-2 inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 ${
          selectedSection === text
            ? "text-blue-700 bg-white"
            : "hover:text-gray-600 hover:bg-gray-200"
        }`}
      >
        {text}
      </li></Link>
    </>
  );
};
