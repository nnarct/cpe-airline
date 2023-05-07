export const Popup = ({ children }) => {
  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-screen bg-black/20 flex flex-col items-center justify-center space-y-5 ">
        <div className="w-52 h-50 text-black bg-white shadow rounded">
          {children}
        </div>
      </div>
    </>
  );
};
