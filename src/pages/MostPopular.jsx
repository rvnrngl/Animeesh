import React, { useEffect, useState } from "react";
import { Cards } from "../components/Cards";
import { META } from "@consumet/extensions";

import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentSeason } from "@/utils/currentSeasonUtils";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";

export const MostPopular = () => {
  const anilist = new META.Anilist();
  const [popularAnime, setPopularAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const season = getCurrentSeason(currentDate);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    hasNextPage: true,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getPopularAnime(1, 30, ["POPULARITY_DESC"], year, season, "next");
  }, []);

  useEffect(() => {
    if (pagination.hasNextPage) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
    if (pagination.currentPage > 1) {
      setPrevDisabled(false);
    } else {
      setPrevDisabled(true);
    }
  }, [pagination.hasNextPage, pagination.currentPage]);

  const getPopularAnime = async (
    pageNumber,
    itemsPerPage,
    sort,
    year,
    season,
    action
  ) => {
    setIsLoading(true);
    try {
      const data = await anilist.advancedSearch(
        undefined,
        "ANIME",
        pageNumber,
        itemsPerPage,
        undefined,
        sort,
        undefined,
        undefined,
        year,
        undefined,
        season
      );
      setPopularAnime(data.results);
      if (action === "next") {
        setPagination({
          currentPage: data.currentPage,
          hasNextPage: data.hasNextPage,
        });
      } else {
        setPagination({
          currentPage: data.currentPage,
          hasNextPage: data.hasNextPage,
        });
      }
    } catch (error) {
      console.error("Error fetching popular anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (action) => {
    const currentPage = pagination.currentPage;

    if (action === "next" && pagination.hasNextPage) {
      window.scrollTo({ top: 0 });
      await getPopularAnime(
        currentPage + 1,
        30,
        ["POPULARITY_DESC"],
        year,
        season,
        action
      );
    } else if (action === "prev" && currentPage > 1) {
      window.scrollTo({ top: 0 });
      await getPopularAnime(
        currentPage - 1,
        30,
        ["POPULARITY_DESC"],
        year,
        season,
        action
      );
    }
  };

  return (
    <div className="w-screen min-h-screen dark:bg-zinc-900 dark:text-gray-300">
      <div className="w-full h-full pt-5 px-4 flex flex-col gap-8 justify-center items-center">
        {/* Title */}
        {isLoading === true ? (
          <div className="w-full flex flex-col gap-1 justify-between items-center px-4 lg:mt-4">
            <Skeleton className="w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px] h-3 xs:h-4 sm:h-5 md:h-6 lg:h-7 rounded-sm bg-zinc-200 dark:bg-zinc-800"></Skeleton>
            <Skeleton className="w-[50px] sm:w-[100px] h-3 xs:h-4 sm:h-5 md:h-6 lg:h-7 rounded-sm bg-zinc-200 dark:bg-zinc-800"></Skeleton>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-1 justify-between items-center px-4 lg:mt-4">
            <span className="text-center text-xs xs:text-base sm:text-lg md:text-xl lg:text-3xl font-semibold lg:font-bold">
              Most Popular Anime
            </span>
            {popularAnime.length < 1 ? (
              ""
            ) : (
              <span className="text-gray-600 dark:text-gray-400 text-[10px] xs:text-xs sm:text-sm lg:text-base font-thin">
                Page:{" "}
                {pagination.currentPage < 10
                  ? "0" + pagination.currentPage
                  : pagination.currentPage}
              </span>
            )}
          </div>
        )}
        {/* items */}
        <div className="w-full flex flex-col gap-5 lg:gap-10 lg:px-2">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
            {isLoading === true ? (
              Array.from({ length: 20 }, (_, index) => {
                return (
                  <div
                    key={index}
                    className="h-[300px] flex flex-col items-start gap-1"
                  >
                    <Skeleton className="w-full h-full rounded-sm bg-zinc-200 dark:bg-zinc-800"></Skeleton>
                    <Skeleton className="w-2/4 h-3 rounded-none bg-zinc-200 dark:bg-zinc-800"></Skeleton>
                    <Skeleton className="w-3/4 h-3 rounded-none bg-zinc-200 dark:bg-zinc-800"></Skeleton>
                  </div>
                );
              })
            ) : (
              <Cards animeList={popularAnime} type={"popular"} />
            )}
          </div>
          {/* paginate */}
          {!isLoading && popularAnime.length > 0 ? (
            <div className="w-full flex items-center justify-center gap-4 md:gap-8">
              <button
                disabled={prevDisabled}
                onClick={() => handlePageChange("prev")}
                className="relative p-2 px-4 text-xs dark:bg-zinc-800 border-b-4 group border-b-orange-400 rounded-none overflow-hidden 
              uppercase flex items-center gap-1 shadow-lg disabled:text-gray-500 disabled:cursor-not-allowed
              disabled:dark:bg-zinc-800/50 disabled:border-zinc-400 disabled:dark:border-zinc-500 enabled:hover:animate-pulse"
              >
                <BiChevronsLeft className="text-base" />
                <span>PREV</span>
                {!prevDisabled ? (
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                ) : (
                  ""
                )}
              </button>
              <div className="text-xl md:text-2xl font-semibold lg:font-bold cursor-default text-orange-400">
                {pagination.currentPage < 10
                  ? "0" + pagination.currentPage
                  : pagination.currentPage}
              </div>
              <button
                disabled={nextDisabled}
                onClick={() => handlePageChange("next")}
                className="relative p-2 px-4 text-xs dark:bg-zinc-800 border-b-4 group border-b-orange-400 rounded-none overflow-hidden 
              uppercase flex items-center gap-1 shadow-lg disabled:text-gray-500 disabled:cursor-not-allowed
              disabled:dark:bg-zinc-800/50 disabled:border-zinc-400 disabled:dark:border-zinc-500 enabled:hover:animate-pulse"
              >
                <span>NEXT</span>
                <BiChevronsRight className="text-base" />
                {!nextDisabled ? (
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                ) : (
                  ""
                )}
              </button>
            </div>
          ) : (
            <span
              className="text-2xl lg:text-4xl font-bold text-center text-gray-600/80 
              col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 xl:col-span-6"
            >
              No Results Found
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
