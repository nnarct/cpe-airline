export const Menu = ({ content, setContent, children, current }) => {
  return (
    <li
      onClick={() => setContent(content)}
      className={`whitespace-nowrap py-3 px-2 rounded text-white ${
        content === current
          ? "bg-gradient-to-r from-gray-900/70 to-gray-700/70"
          : "hover:bg-sky-800 transition ease-in-out cursor-pointer"
      }`}
    >
      {children}
    </li>
  );
};
