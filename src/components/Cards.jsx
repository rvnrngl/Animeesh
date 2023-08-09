import React from "react";

import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Cards = ({ animeList, type }) => {
  const navigate = useNavigate();
  const handleNavigation = (anime) => {
    window.localStorage.setItem("type", type);
    navigate("/watch", { state: { anime } });
  };

  return (
    <>
      {animeList.map((anime, index) => {
        return (
          <div
            key={index}
            onClick={() => handleNavigation(anime)}
            className="flex flex-col items-center text-sm lg:text-base rounded-sm overflow-hidden group cursor-pointer"
          >
            <div className="h-full w-full rounded-sm overflow-hidden object-cover relative">
              <img
                src={anime.image}
                alt={anime.title?.english}
                className="h-full w-full object-cover object-center"
              />
              {/* hover */}
              <div
                className="bg-transparent group-hover:bg-zinc-900/60 absolute top-0 left-0 w-full h-full 
              flex justify-center items-center transition-all duration-200"
              >
                <FaPlay
                  className=" text-transparent group-hover:text-orange-500 text-3xl lg:text-4xl group-hover:block 
                transition-all duration-200"
                />
              </div>
            </div>
            <div className="w-full text-left dark:text-gray-300 py-2 flex flex-col">
              <span className="xs:hidden dark:text-white text-sm font-semibold">
                {anime.title?.english === null
                  ? anime.title?.userPreferred?.length > 10
                    ? anime.title?.userPreferred.slice(0, 10) + "..."
                    : anime.title?.userPreferred
                  : anime.title?.english?.length > 10
                  ? anime.title?.english.slice(0, 10) + "..."
                  : anime.title?.english}
              </span>
              <span className="hidden xs:block dark:text-white text-sm font-semibold">
                {anime.title?.english === null
                  ? anime.title?.userPreferred?.length > 20
                    ? anime.title?.userPreferred.slice(0, 20) + "..."
                    : anime.title?.userPreferred
                  : anime.title?.english?.length > 20
                  ? anime.title?.english.slice(0, 20) + "..."
                  : anime.title?.english}
              </span>
              <div className=" flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{anime.type}</span>
                <span>•</span>
                {type === "recent" ? (
                  <span>Episode: {anime.episodeNumber}</span>
                ) : (
                  <span>EPS: {anime.totalEpisodes}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
