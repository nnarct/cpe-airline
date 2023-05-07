import { Link } from "react-router-dom";
export const Menu = ({ to, className, children }) => {
  return (
    <>
      <Link to={to}>
        <li
          className={`h-12 flex items-center px-4 text-white hover:bg-black/30 transition duration-500 linear ${className}`}
        >
          {children}
        </li>
      </Link>
    </>
  );
};
