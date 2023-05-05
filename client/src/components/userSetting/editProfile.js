import { useState } from "react";
export const EditProfile = () => {
  const user = {
    FirstName: "Parichat",
    LastName: "Sianainnnnnnnnnnnnnn",
    Email: "Woonchat@gmail.com",
    TelNo: "08-7296-2660" ,
    password: "parichat"
  };
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <div>
        <h1 className="p-3 bg-white mb-4 text-3xl bg-blue-100 border-b border-neutral-200 font-bold">My Profile</h1>
        {isEditing?<>
          <div className="relative mb-4 flex flex-wrap items-stretch">
          <span
            className="flex items-center whitespace-nowrap rounded-l border border-r-0 
            border-neutral-300 px-3 py-1 text-center leading-6 text-neutral-700 w-24 font-semibold"
            >Firstname</span>
          <input
            type="text"
            className="relative m-0 block w-px min-w-0 flex-auto rounded-r border border-neutral-300 
            bg-white px-3 py-1 leading-6
            text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] 
            focus:border-primary focus:text-neutral-700 focus:ring ring-blue-200/40 
            focus:outline-none"/>
        </div>

        <div className="relative mb-4 flex flex-wrap items-stretch">
          <span
            className="flex items-center whitespace-nowrap rounded-l border border-r-0 
            border-neutral-300 px-3 py-1 text-center leading-6 text-neutral-700 w-24 font-semibold"
            >Lastname</span>
          <input
            type="text"
            className="relative m-0 block w-px min-w-0 flex-auto rounded-r border border-neutral-300 
            bg-white px-3 py-1 leading-6
            text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] 
            focus:border-primary focus:text-neutral-700 focus:ring ring-blue-200/40 
            focus:outline-none"/>
        </div>


        <div className="relative mb-4 flex flex-wrap items-stretch">
          <span
            className="flex items-center whitespace-nowrap rounded-l border border-r-0 
            border-neutral-300 px-3 py-1 text-center leading-6 text-neutral-700 w-24 font-semibold"
            >Email</span>
          <input
            type="text"
            className="relative m-0 block w-px min-w-0 flex-auto rounded-r border border-neutral-300 
            bg-white px-3 py-1 leading-6
            text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] 
            focus:border-primary focus:text-neutral-700 focus:ring ring-blue-200/40 
            focus:outline-none "/>
        </div>
        
        <div className="relative mb-4 flex flex-wrap items-stretch">
          <span
            className="flex items-center whitespace-nowrap rounded-l border border-r-0 
            border-neutral-300 px-3 py-1 text-center leading-6 text-neutral-700 w-24 font-semibold"
            >TelNo</span>
          <input
            type="text"
            className="relative m-0 block w-px min-w-0 flex-auto rounded-r border border-neutral-300 
            bg-white px-3 py-1 leading-6
            text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] 
            focus:border-primary focus:text-neutral-700 focus:ring ring-blue-200/40 
            focus:outline-none" />
        </div>

        <div className="relative mb-4 flex flex-wrap items-stretch">
          <span
            className="flex items-center whitespace-nowrap rounded-l border border-r-0 
            border-neutral-300 px-3 py-1 text-center leading-6 text-neutral-700 w-24 font-semibold"
            >Password</span>
          <input
            type="text"
            className="relative m-0 block w-px min-w-0 flex-auto rounded-r border border-neutral-300 
            bg-white px-3 py-1 leading-6
            text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] 
            focus:border-primary focus:text-neutral-700 focus:ring ring-blue-200/40 
            focus:outline-none "/>
        </div>

        <div className="w-full flex items-center justify-end">
          <button onClick={() => setIsEditing(false)} className="bg-blue-500 hover:bg-blue-700 text-white 
          font-bold py-2 px-6 rounded-full">
           Save changes
          </button>
        </div></> : (<div className='flex flex-row gap-4'>
          <div className="flex flex-col">
            <div className="bg-white mb-2 bg-blue-100 border-b border-neutral-200 bg-red-10 p-2 m-2 rounded-lg font-semibold">Firstname</div>
            <div className="bg-white mb-2 bg-blue-100 border-b border-neutral-200 bg-red-10 p-2 m-2 rounded-lg font-semibold">Lastname</div>
            <div className="bg-white mb-2 bg-blue-100 border-b border-neutral-200 bg-red-10 p-2 m-2 rounded-lg font-semibold">Email</div>
            <div className="bg-white mb-2 bg-blue-100 border-b border-neutral-200 bg-red-10 p-2 m-2 rounded-lg font-semibold">TelNo</div>
            <div className="bg-white mb-2 bg-blue-100 border-b border-neutral-200 bg-red-10 p-2 m-2 rounded-lg font-semibold">Password</div>
          </div>
            <div className="flex flex-col w-1/2">
            <div className="bg-white mb-2 bg-blue-100 border-b border-neutral-200 bg-red-10 p-2 m-2 rounded-lg font-thin">{user.FirstName}</div>
            <div className="bg-white mb-2 bg-blue-100 border-b border-neutral-200 bg-red-10 p-2 m-2 rounded-lg font-thin">{user.LastName}</div>
            <div className="bg-white mb-2 bg-blue-100 border-b border-neutral-200 bg-red-10 p-2 m-2 rounded-lg font-thin">{user.Email}</div>
            <div className="bg-white mb-2 bg-blue-100 border-b border-neutral-200 bg-red-10 p-2 m-2 rounded-lg font-thin">{user.TelNo}</div>
            <div className="bg-white mb-2 bg-blue-100 border-b border-neutral-200 bg-red-10 p-2 m-2 rounded-lg font-thin">{user.password}</div>
          </div>

          <div className="w-full flex flex-col items-center justify-end">
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-700 text-white 
          font-bold py-2 px-6 rounded-full">
           Edit
          </button>
        </div></div>)}

      </div>
    </>
  );
};
