export const Card = ({ className, children }) => {
  return (
    <>
      <div className={`w-full h-20 flex items-center bg-white border border-primary rounded-xl active:ring active:ring-blue-200/40 cursor-pointer ${className}`}>
        {children}
      </div>
    </>
  );
};
