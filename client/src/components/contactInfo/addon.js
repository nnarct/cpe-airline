import { ExtWrap, ProtectionH1, ProtectionInput, SaveTrip } from "./components";
export const AddOns = ({ contact, setContact }) => {
  return (
    <>
      {/* Add on */}
      <ExtWrap>
        <ProtectionH1 />
        <div className="mt-3">
          <div className="hover:bg-gray-100  flex items-center pl-4 border border-gray-200 rounded">
            <ProtectionInput
              defaultChecked
              id="TravelProtection1"
              type="radio"
              value=""
              name="TravelProtection"
              onChange={() => setContact({ ...contact, Protection: true })}
            />
            <label
              htmlFor="TravelProtection1"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
            >
              <SaveTrip />
            </label>
          </div>
          <div className="flex mt-2 items-center pl-4 rounded hover:bg-gray-100  ">
            <div className="">
              <ProtectionInput
                id="TravelProtection2"
                type="radio"
                value=""
                name="TravelProtection"
                onChange={() => setContact({ ...contact, Protection: false })}
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="TravelProtection2"
                className="w-full ml-2 py-2 text-sm font-medium text-gray-900 flex flex-col justify-center"
              >
                <p>No, I do not want to protect my trip.</p>
                <p>
                  In case of emergency, I will cover all expenses on my own.
                </p>
              </label>
            </div>
          </div>
        </div>
      </ExtWrap>
    </>
  );
};
