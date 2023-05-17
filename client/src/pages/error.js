import { Link } from "react-router-dom";

const Wrap = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-primary/60">
        <div className="container bg-white h-screen">{children}</div>
      </div>
    </>
  );
};

export const Error = () => {
  return (
    <>
      <Wrap>// Todo - woon - implement error page here</Wrap>
    </>
  );
};
