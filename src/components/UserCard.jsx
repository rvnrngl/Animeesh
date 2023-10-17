import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserCard = ({ userInfo }) => {
  const { username, joinDate, watchList } = userInfo;
  return (
    <div className="w-full flex flex-col items-center p-4 px-8 dark:bg-zinc-800 shadow-sm rounded-md gap-3">
      {/* image */}
      <div className="w-[120px] h-[120px] lg:w-[140px] lg:h-[140px] rounded-full border-[3px] lg:border-[5px] border-zinc-900 hover:border-zinc-900/50">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="border bg-zinc-900/50">
            <span className="font-black text-9xl uppercase -translate-y-1">
              {username.charAt(0)}
            </span>
          </AvatarFallback>
        </Avatar>
      </div>
      {/* details */}
      <div className="w-full max-w-xs flex flex-col items-center justify-center gap-3">
        <h1 className="text-xl md:text-3xl font-semibold text-zinc-400">
          {username}
        </h1>
        <div className="w-full text-sm flex justify-between items-center text-zinc-500">
          <span>Join Date</span>
          <span>{joinDate}</span>
        </div>
        <div className="w-full text-sm flex justify-between items-center text-zinc-500">
          <span>Watch ist</span>
          <span>{watchList.length}</span>
        </div>
      </div>
    </div>
  );
};
