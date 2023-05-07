export const ContentWrap = ({ children }) => {
  return (
    <>
      <div className="relative -top-20 z-10 mx-5 flex justify-center">
        <div className="container max-w-5xl p-6 bg-gray-100 rounded-2xl shadow-md">
          {children}
        </div>
      </div>
    </>
  );
};
