export const MenuChoice = ({
  text,
  content,
  icon,
  index,
  changeContent,
  active,
}) => {
  const i = Number(index);
  return (
    <>
      <div
        className="w-full cursor-pointer"
        onClick={() => changeContent(content, i)}
      >
        <div
          className={`flex justify-center items-center text-primary 
        hover:bg-gray-200 border-b-2 hover:border-b-primary rounded-t-xl active:bg-gray-300
        ${active === i ? "bg-gray-200 border-b-primary" : "border-b-primary/20"}
        transition duration-300 linear 
        `}
        >
          {icon}
          <span className="py-2 ml-2 font-semibold uppercase  select-none text-xs sm:text-base md:text-lg lg:text-xl">
            {text}
          </span>
        </div>
      </div>
    </>
  );
};
