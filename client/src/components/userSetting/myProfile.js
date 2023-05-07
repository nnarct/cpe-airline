import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../navbar";
import { Sidebar } from "./sidebar/index.js";
import { EditProfile } from "./editProfile.js";
import { MyFlight } from "./myFlight.js";

export const MyProfile = () => {
  const { id } = useParams();
  const [content, setContent] = useState("editProfile");
  return (
    <>
      <Navbar />
      <div className="max-w-screen min-h-calc flex">
        <Sidebar content={content} setContent={setContent} />
        <div className="bg-slate-50 w-full">
          {content === "editProfile" && <EditProfile />}
          {content === "myFlight" && <MyFlight />}
        </div>
      </div>
    </>
  );
};
