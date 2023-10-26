import React from "react";
import { Link } from "react-router-dom";

export const UserToolBar = () => {
  const currentpath = window.location.hash;
  return (
    <div className="w-full grid grid-cols-2 place-items-center uppercase items-center text-zinc-400 justify-center overflow-hidden rounded-md shadow-sm bg-zinc-800">
      <Link
        to={"/user/watch-list"}
        className={`${
          currentpath === "#/user/watch-list" ? "text-orange-400" : ""
        } w-full flex items-center justify-center px-4 py-2 font-semibold border-r border-zinc-700 
        hover:bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900`}
      >
        Watchlist
      </Link>
      <Link
        to={"/user/profile"}
        className={`${
          currentpath === "#/user/profile" ? "text-orange-400" : ""
        } w-full flex items-center justify-center px-4 py-2 font-semibold border-l border-zinc-700 
        hover:bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900`}
      >
        Profile
      </Link>
    </div>
  );
};
