import { IoIosArrowDown } from "react-icons/io";
export const DropHead = ({ icon, title, subtitle }) => {
  return (
    <>
      <div className="flex items-center text-primary">
        <span className="px-2">{icon}</span>
        <div className="flex flex-col pl-2">
          <h1 className="text-xl font-bold line-clamp-1">{title}</h1>
          {subtitle ? (
            <span className="text-xs line-clamp-1">{subtitle}</span>
          ) : null}
        </div>
      </div>
      <div className="px-2">
        <IoIosArrowDown color="0D3E5E" size={20} />
      </div>
    </>
  );
};
