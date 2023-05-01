import { Link } from "react-router-dom";
export const ForNoob = () => {
  return (
    <div className="h-12 flex items-center justify-center space-x-3">
      <Link to="/login">
        <span className="py-1.5 px-4 rounded border border-2 border-white font-bold text-white hover:text-primary hover:bg-white transition ease-out">Login</span>
      </Link>
      <Link to="/register">
        <span className="py-1.5 px-4 rounded border border-2 border-white bg-white  font-bold text-primary hover:text-white hover:bg-primary transition ease-out">Register</span>
      </Link>
    </div>
  );
};
