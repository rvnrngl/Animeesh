import { UseFetchUserInfo } from "@/hooks/UseFetchUserInfo";
import React from "react";

export const UserProfile = () => {
  const userInfo = UseFetchUserInfo();
  const { username } = userInfo;

  const handleSubmit = () => {
    alert("Not implemented yet!");
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-5 justify-center bg-zinc-800 p-4 rounded-md shadow-sm text-zinc-300">
      <h1 className="font-semibold text-lg">Settings</h1>
      <div className="w-full text-sm flex items-end gap-3 justify-around md:px-5">
        <div className="w-full max-w-xs flex flex-col gap-4">
          <p>Update username</p>
          <input
            type="text"
            placeholder={username}
            className="bg-transparent outline-none border py-2 px-4 border-zinc-600 rounded-md placeholder:text-zinc-500 placeholder:font-[400]"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="flex-shrink-0 py-2 px-4 bg-orange-400 text-zinc-900 rounded-md"
        >
          Update
        </button>
      </div>
      <div className="w-full text-sm flex items-end gap-3 justify-around md:px-5">
        <div className="w-full max-w-xs flex flex-col gap-4">
          <p>Update password</p>
          <input
            type="text"
            placeholder="Enter current password"
            className=" bg-transparent outline-none border py-2 px-4 border-zinc-600 rounded-md placeholder:text-zinc-500 placeholder:font-[400]"
          />
          <input
            type="text"
            placeholder="Enter new password"
            className=" bg-transparent outline-none border py-2 px-4 border-zinc-600 rounded-md placeholder:text-zinc-500 placeholder:font-[400]"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="flex-shrink-0 py-2 px-4 bg-orange-400 text-zinc-900 rounded-md"
        >
          Update
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="flex-shrink-0 py-2 px-4 my-5 bg-red-500 text-white/90 rounded-md"
      >
        Delete account
      </button>
    </div>
  );
};
