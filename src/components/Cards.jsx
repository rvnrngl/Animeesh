import React from "react";

import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

//icons
import { AiFillLike, AiFillStar } from "react-icons/ai";
import { PiTelevisionBold } from "react-icons/pi";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const Cards = ({ animeList, type }) => {
  const navigate = useNavigate();

  const handleNavigation = (anime) => {
    window.localStorage.setItem("type", type);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (anime.title?.english !== null) {
      navigate(
        `/watch/${anime.title?.english
          .replace(/[-:]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase()}`,
        { state: { anime } }
      );
    } else {
      navigate(
        `/watch/${anime.title?.userPreferred
          .replace(/[-:]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase()}`,
        { state: { anime } }
      );
    }
  };

  return (
    <>
      {animeList.map((anime, index) => {
        return (
          <HoverCard key={index} openDelay={300} closeDelay={100}>
            <HoverCardTrigger asChild>
              <div
                onClick={() => handleNavigation(anime)}
                className="flex flex-col items-center text-sm lg:text-base rounded-sm overflow-hidden group cursor-pointer"
              >
                <div className="h-full w-full rounded-sm overflow-hidden relative">
                  <img
                    src={anime.image}
                    alt={anime.title?.english}
                    className="h-full w-full object-cover object-center group-hover:scale-110 ease-in-out duration-300"
                  />
                  {/* hover */}
                  <div
                    className="hidden bg-transparent group-hover:bg-zinc-900/70 absolute top-0 left-0 w-full h-full 
                    lg:flex justify-center items-center transition-all duration-200"
                  >
                    <FaPlay
                      className=" text-transparent group-hover:text-orange-500 text-3xl lg:text-4xl group-hover:block 
                transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="w-full text-left dark:text-gray-300 py-2 flex flex-col group-hover:brightness-75">
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
                  <div className=" flex gap-2 text-[10px] xs:text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                    <span>{anime.type}</span>
                    <span>•</span>
                    {type === "recent" ? (
                      <span>Latest Episode: {anime.episodeNumber}</span>
                    ) : (
                      <span>EPS: {anime.totalEpisodes}</span>
                    )}
                  </div>
                </div>
              </div>
            </HoverCardTrigger>
            {type === "recent" ? (
              <HoverCardContent
                side="right"
                align="end"
                className="bg-zinc-100/90 dark:bg-zinc-800/90 border dark:border-none w-[300px]"
              >
                <div className="w-full flex justify-between space-x-4 text-gray-900 dark:text-gray-200">
                  <div className="space-y-1 flex flex-col gap-2 text-sm">
                    <h1 className="text-base font-semibold text-orange-400 leading-5">
                      {anime.title?.english === null
                        ? anime.title?.userPreferred
                        : anime.title?.english}
                    </h1>
                    <div className="flex items-center justify-between text-sm">
                      <div className="inline-flex items-center gap-2">
                        <span className="inline-flex items-center gap-[2px]">
                          <AiFillLike className=" text-blue-500" />
                          {anime.rating}
                        </span>
                        <span className="bg-gray-400 text-gray-100 dark:bg-zinc-200 dark:text-gray-900 text-xs px-2 rounded-sm">
                          HD
                        </span>
                      </div>
                      <span className="bg-gray-400 text-gray-100 dark:bg-zinc-200 dark:text-gray-900 text-xs px-2 rounded-sm">
                        {anime.type}
                      </span>
                    </div>
                    {/* description */}
                    <p className="text-sm w-full text-gray-500 dark:text-gray-400">
                      {anime.episodeTitle?.length > 60
                        ? anime.episodeTitle.slice(0, 60) + "..."
                        : anime.episodeTitle}
                    </p>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          Other Name:{" "}
                        </span>
                        {anime.title?.native} {anime.title?.romaji}{" "}
                        {anime.title.userPreferred}
                      </span>
                      <span className="text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          Latest Episode:{" "}
                        </span>
                        {anime.episodeNumber}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Genres:{" "}
                        {anime.genres.map((genre, index) => (
                          <span
                            key={index}
                            className="text-gray-900 dark:text-gray-200"
                          >
                            {genre}{" "}
                          </span>
                        ))}
                      </span>
                    </div>
                    <button
                      onClick={() => handleNavigation(anime)}
                      className="bg-orange-500 py-2 rounded-full font-semibold flex justify-center items-center 
                      gap-2 hover:text-gray-200 dark:hover:text-gray-900 ease-in-out duration-200"
                    >
                      <PiTelevisionBold size={20} />
                      <span>WATCH NOW</span>
                    </button>
                  </div>
                </div>
              </HoverCardContent>
            ) : (
              <HoverCardContent
                side="right"
                align="end"
                className="bg-zinc-100/90  dark:bg-zinc-800/90 border dark:border-none w-[300px]"
              >
                <div className="w-full flex justify-between space-x-4 text-gray-900 dark:text-gray-200">
                  <div className="space-y-1 flex flex-col gap-2 text-sm">
                    <h1 className="text-base font-semibold text-orange-400 leading-5">
                      {anime.title?.english === null
                        ? anime.title?.userPreferred
                        : anime.title?.english}
                    </h1>
                    <div className="flex items-center justify-between text-sm">
                      <div className="inline-flex items-center gap-2">
                        <span className="inline-flex items-center gap-[2px]">
                          <AiFillLike className=" text-blue-500" />
                          {anime.rating}
                        </span>
                        <span className="inline-flex items-center gap-[2px]">
                          <AiFillStar className=" text-yellow-500" />
                          {anime.popularity}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="bg-gray-400 text-gray-100 dark:bg-zinc-200 dark:text-gray-900 text-xs px-2 rounded-sm">
                          HD
                        </span>
                        <span className="bg-gray-400 text-gray-100 dark:bg-zinc-200 dark:text-gray-900 text-xs px-2 rounded-sm">
                          {anime.type}
                        </span>
                      </div>
                    </div>
                    {/* description */}
                    <p className="text-sm w-full text-gray-500 dark:text-gray-400">
                      {anime.description?.length > 60
                        ? anime.description
                            ?.replace(/<\/?i\s*\/?>/g, "")
                            ?.replace(/<\/?br\s*\/?>/g, "")
                            .slice(0, 60) + "..."
                        : anime.description}
                    </p>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          Other Name:{" "}
                        </span>
                        {anime.title?.native} {anime.title?.romaji}{" "}
                        {anime.title.userPreferred}
                      </span>
                      <span className="text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          Release Date:{" "}
                        </span>
                        {anime.releaseDate}
                      </span>
                      <span className="text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          Status:{" "}
                        </span>
                        {anime.status}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Genres:{" "}
                        {anime.genres.map((genre, index) => (
                          <span
                            key={index}
                            className="text-gray-900 dark:text-gray-200"
                          >
                            {genre}{" "}
                          </span>
                        ))}
                      </span>
                    </div>

                    <button
                      onClick={() => handleNavigation(anime)}
                      className="bg-orange-500 py-2 rounded-full font-semibold flex justify-center items-center 
                      gap-2 hover:text-gray-200 dark:hover:text-gray-900 ease-in-out duration-200"
                    >
                      <PiTelevisionBold size={20} />
                      <span>WATCH NOW</span>
                    </button>
                  </div>
                </div>
              </HoverCardContent>
            )}
          </HoverCard>
        );
      })}
    </>
  );
};
