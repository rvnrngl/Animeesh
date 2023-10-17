import { UserCard } from "@/components/UserCard";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { UserToolBar } from "@/components/UserToolBar";
import { Outlet } from "react-router-dom";

export const User = () => {
  const url = import.meta.env.VITE_API;
  const userID = window.localStorage.getItem("userID");
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(`${url}/user/${userID}`);
      setUserInfo(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
