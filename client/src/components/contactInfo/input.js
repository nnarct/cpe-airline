export const inp =
  "w-full px-1 border outline-none focus:ring focus:ring-1 hover:ring hover:ring-blue-200/40 active:ring-blue-200/80";
export const dob = "px-1 border outline-none focus:ring focus:ring-1 hover:ring hover:ring-blue-200/40 active:ring-blue-200/80"
export const InputFrom = ({ label, children }) => {
  return (
    <>
      <div className="flex items-center py-1">
        <label className="min-w-24 whitespace-nowrap text-primary">{label}</label>
        {children}
      </div>
    </>
  );
};