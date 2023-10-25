import React from "react";
import { Link } from "react-router-dom";

export const UserToolBar = () => {
  const currentpath = window.location.hash;
  return (
    <div className="w-full flex uppercase items-center text-zinc-400 justify-center gap-5 p-2 px-4 rounded-md shadow-sm bg-zinc-800">
      <Link
        to={"/user/watch-list"}
        className={currentpath === "#/user/watch-list" ? "text-orange-400" : ""}
      >
        Watchlist
      </Link>
      <Link
        to={"/user/profile"}
        className={currentpath === "#/user/profile" ? "text-orange-400" : ""}
      >
        Profile
      </Link>
    </div>
  );
};
