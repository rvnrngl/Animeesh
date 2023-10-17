import React from "react";

export const UserToolBar = () => {
  return (
    <div className="w-full flex items-center text-zinc-400 justify-center gap-5 p-2 px-4 rounded-md shadow-sm bg-zinc-800">
      <button>Watchlist</button>
      <button>Profile</button>
      <button>Account</button>
    </div>
  );
};
