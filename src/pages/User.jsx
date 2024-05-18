import { UserCard } from "@/components/UserCard";
import React from "react";
import { UserToolBar } from "@/components/UserToolBar";
import { Outlet } from "react-router-dom";
import { UseFetchUserInfo } from "@/hooks/UseFetchUserInfo";

export const User = () => {
  const userInfo = UseFetchUserInfo();
  return (
    <div className="w-screen min-h-screen bg-zinc-950">
      <div className="w-full max-w-2xl mx-auto h-full flex flex-col items-center justify-center gap-3 p-4">
        <UserCard userInfo={userInfo} />
        <UserToolBar />
        <Outlet />
      </div>
    </div>
  );
};
