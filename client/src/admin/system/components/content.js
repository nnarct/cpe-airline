export const Content = ({ children }) => {
  return (
    <>
      <div className="flex flex-col items-center w-full max-h-calc overflow-y-auto p-4">
        {children}
      </div>
    </>
  );
};
