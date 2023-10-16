import React from "react";

export const NavBarMenuButton = ({ onClick, title, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full min-w-[150px] flex items-center justify-start 
      gap-2 bg-inherit hover:bg-zinc-800 px-4 py-2"
    >
      {children}
      {title}
    </button>
  );
};
