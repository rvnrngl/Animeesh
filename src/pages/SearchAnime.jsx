import React from "react";
import { ImSearch } from "react-icons/im";

export const SearchAnime = () => {
  return (
    <div className="w-screen min-h-screen dark:bg-zinc-800 dark:text-gray-300">
      <div className="w-full h-full pt-[90px] flex justify-center items-center">
        {/* search container */}
        <div className="p-2 flex justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Search anime..."
            className="text-gray-900 text-base lg:text-xl py-2 px-4 border border-gray-500 dark:border-none outline-none rounded-full"
          />
          <button className="p-3 rounded-full bg-gray-600">
            <ImSearch size={20} />
          </button>
        </div>
        {/* items to be search */}
        <div></div>
      </div>
    </div>
  );
};
