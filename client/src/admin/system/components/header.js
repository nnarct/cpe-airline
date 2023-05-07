export const Header = ({ children }) => {
  return (
    <>
      <div className="container text-3xl pb-4 font-bold flex justify-between">
        {children}
      </div>
    </>
  );
};
