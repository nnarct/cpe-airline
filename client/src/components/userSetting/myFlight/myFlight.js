import { useState } from "react";
import { Transaction } from "./transaction";
import { Menu } from "./menu";

export const MyFlight = () => {
  // initialize the state to show the upcoming flights section by default
  const [selectedSection, setSelectedSection] = useState("Upcoming Flights");

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="container max-w-[1000px] mx-2">
          <div className="font-medium text-center text-gray-500 border-b border-gray-200">
            <ul className="flex flex-wrap">
              <Menu
                text={"Upcoming Flights"}
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <Menu
                text={"Departed Flights"}
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
              <Menu
                text={"Canceled Flights"}
                setSelectedSection={setSelectedSection}
                selectedSection={selectedSection}
              />
            </ul>
          </div>

          {selectedSection === "Upcoming Flights" && <Transaction />}
          {selectedSection === "Departed Flights" && <Transaction />}
          {selectedSection === "Canceled Flights" && <Transaction />}
        </div>
      </div>
    </>
  );
};
