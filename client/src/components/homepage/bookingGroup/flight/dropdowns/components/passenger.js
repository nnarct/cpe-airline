import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const Minus = () => {
  return (
    <>
      <span className="h-full flex items-center justify-center text-xl font-black">
        <AiOutlineMinus />
      </span>
    </>
  );
};

export const Plus = () => {
  return (
    <>
      <span className="h-full flex items-center justify-center text-xl font-black">
        <AiOutlinePlus />
      </span>
    </>
  );
};

export const Row = ({ title, age, children }) => {
  return (
    <>
      <tr>
        <td>
          <div className="flex flex-col pb-1">
            <span className="text-lg font-semibold">{title}</span>
            <span className="text-xs leading-4">{age}</span>
          </div>
        </td>
        {children}
      </tr>
    </>
  );
};
