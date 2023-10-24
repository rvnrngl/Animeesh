import { UseFetchUserInfo } from "@/hooks/UseFetchUserInfo";
import React from "react";

export const UserProfile = () => {
  const userInfo = UseFetchUserInfo();
  return (
    <div className="w-full h-full flex items-center justify-center bg-zinc-800 p-4 rounded-md shadow-sm">
      <h1 className="text-zinc-300">Change Settings</h1>
    </div>
  );
};
