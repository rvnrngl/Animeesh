import React from "react";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const PaginateButtons = ({ page, hasNextPage, next, prev, route }) => {
  const navigate = useNavigate();

  const handlePageChange = (action) => {
    if (action === "next" && hasNextPage) {
      window.scrollTo({ top: 0 });
      navigate(route + `page=${page + 1}`);
    } else if (action === "prev" && page > 1) {
      window.scrollTo({ top: 0 });
      navigate(route + `page=${page - 1}`);
    }
  };

  return (
    <div className="w-full flex items-center justify-center gap-4 md:gap-8">
      <button
        disabled={prev}
        onClick={() => handlePageChange("prev")}
        className="relative p-2 px-4 text-xs dark:bg-zinc-800 border-b-4 group border-b-orange-400 rounded-none overflow-hidden 
  uppercase flex items-center gap-1 shadow-lg disabled:text-gray-500 disabled:cursor-not-allowed
  disabled:dark:bg-zinc-800/50 disabled:border-zinc-400 disabled:dark:border-zinc-500 enabled:hover:animate-pulse"
      >
        <BiChevronsLeft className="text-base" />
        <span>PREV</span>
        {!prev ? (
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        ) : (
          ""
        )}
      </button>
      <div className="text-xl md:text-2xl font-semibold lg:font-bold cursor-default text-orange-400">
        {page < 10 ? "0" + page : page}
      </div>
      <button
        disabled={next}
        onClick={() => handlePageChange("next")}
        className="relative p-2 px-4 text-xs dark:bg-zinc-800 border-b-4 group border-b-orange-400 rounded-none overflow-hidden 
  uppercase flex items-center gap-1 shadow-lg disabled:text-gray-500 disabled:cursor-not-allowed
  disabled:dark:bg-zinc-800/50 disabled:border-zinc-400 disabled:dark:border-zinc-500 enabled:hover:animate-pulse"
      >
        <span>NEXT</span>
        <BiChevronsRight className="text-base" />
        {!next ? (
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        ) : (
          ""
        )}
      </button>
    </div>
  );
};
