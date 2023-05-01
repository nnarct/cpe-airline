import { BiRadioCircleMarked, BiRadioCircle } from "react-icons/bi";
export const Type = ({ isReturn, setIsReturn }) => {
  return (
    <>
      <div className="flex py-2 space-x-1">
        <div
          className="text-primary font-semibold flex items-center cursor-pointer rounded-md pr-2 hover:shadow-sm hover:shadow-blue-20 border border-transparent border-gray-200 hover:bg-white transition duration-150 hover:ring active:ring-primary"
          onClick={() => setIsReturn(0)}
        >
          {!isReturn ? (
            <BiRadioCircleMarked size="30px" color="#0D3E5E" />
          ) : (
            <BiRadioCircle size="30px" color="#0D3E5E40" />
          )}
          <span className="select-none">One-Way</span>
        </div>

        <div
          className="text-primary font-semibold flex items-center cursor-pointer rounded-md pr-2 hover:shadow-sm hover:shadow-blue-20 border border-transparent border-gray-200 hover:bg-white transition duration-150 hover:ring active:ring-primary"
          onClick={() => setIsReturn(1)}
        >
          {isReturn ? (
            <BiRadioCircleMarked size="30px" color="#0D3E5E" />
          ) : (
            <BiRadioCircle size="30px" color="#0D3E5E40" />
          )}
          <span className="select-none">Return</span>
        </div>
      </div>
    </>
  );
};
