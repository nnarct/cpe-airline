export const Table = ({ children }) => {
  return (
    <>
      <table className="w-full container bg-white">{children}</table>
    </>
  );
};
export const THead = ({ children }) => {
  return (
    <>
      <thead>
        <tr>{children}</tr>
      </thead>
    </>
  );
};

export const Th = ({ children, className, width }) => {
  return (
    <>
      <th
        className={`p-1 border border-1 border-black whitespace-nowrap ${className} ${width}`}
      >
        {children}
      </th>
    </>
  );
};

export const TBody = ({ children }) => {
  return (
    <>
      <tbody>{children}</tbody>
    </>
  );
};

export const Td = ({ e, className }) => {
  return (
    <>
      <td className={`border px-3 py-2 ${className}`}>{e ? e : "-"}</td>
    </>
  );
};
