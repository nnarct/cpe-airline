export const Table = ({ children }) => {
  return (
    <>
      <table className="table-fixed w-full container bg-white">
        {children}
      </table>
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
        className={`px-1 py-2 border border-1 border-black whitespace-nowrap ${className} ${width}`}
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
      <td className={`border px-1 py-2 ${className}`}>{e ? e : "-"}</td>
    </>
  );
};

export const Edit = () => {
  return (
    <>
      <th className="border border-black px-3 py-2 min-w-[60px] max-w-[60px] w-[60px]">
        Edit
      </th>
    </>
  );
};
