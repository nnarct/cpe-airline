export const Card = ({ className, children }) => {
  return (
    <>
      <div className={`w-full h-20 flex items-center bg-white border border-primary rounded-xl active:ring cursor-pointer ${className}`}>
        {children}
      </div>
    </>
  );
};
