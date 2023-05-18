import { useState } from "react";
import { Navbar } from "../../navbar";
import { Sidebar } from "../sidebar/index.js";
import { MyFlight } from "../myFlight/myFlight.js";
import { EditProfile } from "./editProfile";

export const UserProfile = () => {
  const [content, setContent] = useState("My Profile");
  return (
    <>
      <Navbar />
      <div className="max-w-screen min-h-calc flex">
        <Sidebar content={content} setContent={setContent} />
        <div className="bg-gray-100 w-full">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full flex justify-center items-center p-3 bg-white mb-4 bg-blue-100 border-b border-neutral-200 ">
              <h1 className="container text-3xl font-semibold max-w-1000">
                {content}
              </h1>
            </div>
            {content === "My Profile" && <EditProfile />}
            {content === "My Flight" && <MyFlight />}
          </div>
        </div>
      </div>
    </>
  );
};
