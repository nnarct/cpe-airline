import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { MdEventSeat } from "react-icons/md";
import { DropHead } from "./components/drophead";
import { Card } from "../card";
export const Class = ({ values, setValues }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  const ref = useDetectClickOutside({ onTriggered: closeDropdown });
  const ClassList = ({ text }) => {
    return (
      <>
        <li
          onClick={() => setValues({ ...values, class: text })}
          className={`p-1 text-base ${
            values.class === text ? "bg-blue-300" : "hover:bg-blue-100"
          } transition duration-100 ease-in-out rounded`}
        >
          {text}
        </li>
      </>
    );
  };
  return (
    <>
      <div
        ref={ref}
        className={`flex items-center justify-between w-full h-full px-3 ${
          isOpen ? "ring ring-blue-500/20 rounded-xl" : ""
        }`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <DropHead
          icon={<MdEventSeat color="0D3E5E" size={20} />}
          title={"Class"}
          subtitle={values.class}
        />

        {isOpen ? (
          <Card className="absolute left-0 top-20 z-20 h-auto flex flex-col justify-center ring ring-4 ring-gray-400/50">
            <ul className="w-11/12 my-2">
              <ClassList text="Economy" />
              <ClassList text="Premium Economy" />
              <ClassList text="Business" />
              <ClassList text="First Class" />
            </ul>
          </Card>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
