import React from "react";
import { useNavigate } from "react-router-dom";

export const Relations = ({ relations, type }) => {
  const navigate = useNavigate();

  const handleNavigation = (anime) => {
    window.localStorage.setItem("type", type);
    if (anime.title?.english !== null) {
      navigate(
        `/watch/${anime.title?.english
          .replace(/[-:]/g, "")
          .replace(/\s+/g, "-")
          .replace(/\//g, "-")
          .toLowerCase()}`,
        { state: { anime } }
      );
    } else {
      navigate(
        `/watch/${anime.title?.userPreferred
          .replace(/[-:]/g, "")
          .replace(/\s+/g, "-")
          .replace(/\//g, "-")
          .toLowerCase()}`,
        { state: { anime } }
      );
    }
  };

  return (
    <>
      {relations?.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => handleNavigation(item)}
            className="dark:bg-zinc-800 h-[80px] flex gap-2 sm:gap-4 cursor-pointer hover:brightness-110"
          >
            <img
              src={item.image}
              alt={item.title.english}
              className="h-full object-cover object-center"
            />
            <div className="w-full flex flex-col items-start justify-center gap-[2px]">
              <span className=" text-gray-500 text-xs">
                {item.relationType}
              </span>
              <span className="text-gray-300 text-sm sm:text-lg line-clamp-1">
                {item.title?.english === null
                  ? item.title?.userPreferred !== undefined
                    ? item.title?.userPreferred
                    : item.title?.romaji
                  : item.title?.english}
              </span>
              <div className="flex gap-2 items-center text-[10px] text-gray-500 sm:text-xs">
                <span>{item.type}</span>
                <span>•</span>
                <span>Rating: {item.rating}</span>
                <span>•</span>
                <span>Status: {item.status}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
