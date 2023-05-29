export const Chart = ({ children, topic, className }) => {
  return (
    <div
      className={`container bg-white rounded-2xl border my-4 p-5 shadow ${className} `}
    >
      <h1 className="font-bold text-2xl pb-4 text-primary">{topic}</h1>
      <div className={`${className}`}>{children}</div>
    </div>
  );
};
