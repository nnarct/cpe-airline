import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { FaUserFriends } from "react-icons/fa";
import { Card } from "../card";
import { DropHead } from "./components/drophead";
import { Minus, Plus, Row } from "./components/passenger";

export const Passenger = ({ values, setValues }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  const ref = useDetectClickOutside({ onTriggered: closeDropdown });

  return (
    <>
      <div ref={ref} className="w-full h-full">
        <div
          className={`flex items-center justify-between w-full h-full px-3 ${
            isOpen ? "ring ring-blue-500/20 rounded-xl" : ""
          }`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <DropHead
            icon={<FaUserFriends color="0D3E5E" size={20} />}
            title={`Passenger`}
            subtitle={`${values.adult} Adult, ${values.child} Child, ${values.infant} Infant`}
          />
        </div>

        {isOpen ? (
          <Card className="absolute left-0 top-20 z-20 h-auto flex flex-col justify-center ring ring-4 ring-gray-400/50">
            <table className="w-11/12 h-auto my-2 text-primary">
              <tbody>
                <Row title={"Adult"} age={"12 years and above"}>
                  <td
                    className={` ${
                      values.adult === 1
                        ? "opacity-50 cursor-not-allowed select-none"
                        : "opacity-100"
                    }`}
                    onClick={() => {
                      if (values.adult !== 1)
                        setValues({ ...values, adult: values.adult - 1 });
                    }}
                  >
                    <Minus />
                  </td>
                  <td className="text-center text-lg">{values.adult}</td>
                  <td
                    onClick={() =>
                      setValues({ ...values, adult: values.adult + 1 })
                    }
                  >
                    <Plus />
                  </td>
                </Row>
                <Row title={"Child"} age={"2 - 11 years"}>
                  <td
                    className={` ${
                      values.child === 0
                        ? "opacity-50 cursor-not-allowed select-none"
                        : "opacity-100"
                    }`}
                    onClick={() => {
                      if (values.child !== 0)
                        setValues({ ...values, child: values.child - 1 });
                    }}
                  >
                    <Minus />
                  </td>
                  <td className="text-center text-lg">{values.child}</td>
                  <td
                    onClick={() =>
                      setValues({ ...values, child: values.child + 1 })
                    }
                  >
                    <Plus />
                  </td>
                </Row>
                <Row title={"Infant"} age={"below 2 years"}>
                  <td
                    className={` ${
                      values.infant === 0
                        ? "opacity-50 cursor-not-allowed select-none"
                        : "opacity-100"
                    }`}
                    onClick={() => {
                      if (values.infant !== 0)
                        setValues({ ...values, infant: values.infant - 1 });
                    }}
                  >
                    <Minus />
                  </td>
                  <td className="text-center text-lg">{values.infant}</td>
                  <td
                    onClick={() =>
                      setValues({ ...values, infant: values.infant + 1 })
                    }
                  >
                    <Plus />
                  </td>
                </Row>
              </tbody>
            </table>
          </Card>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
