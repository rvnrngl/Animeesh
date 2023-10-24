import { UserCard } from "@/components/UserCard";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { UserToolBar } from "@/components/UserToolBar";
import { Outlet } from "react-router-dom";
import { UseFetchUserInfo } from "@/hooks/UseFetchUserInfo";

export const User = () => {
  const userInfo = UseFetchUserInfo();
  return (
    <div className="w-screen min-h-screen dark:bg-zinc-900">
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
        {userInfo && <UserCard userInfo={userInfo} />}
        <UserToolBar />
        <Outlet />
      </div>
    </div>
  );
};
