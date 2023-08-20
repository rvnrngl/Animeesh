import React, { useEffect, useRef, useState } from "react";
import { Search } from "../components/Search";
import { META } from "@consumet/extensions";

import { Skeleton } from "@/components/ui/skeleton";

// react icons
import { Cards } from "../components/Cards";

export const SearchAnime = () => {
  const anilist = new META.Anilist();
  const [inputValue] = useState(sessionStorage.getItem("inputValue") || ""); // init input value stored in local storage
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSearchedAnime();
  }, [inputValue]);

  const getSearchedAnime = async () => {
    setIsLoading(true);
    try {
      const data = await anilist.search(inputValue, 1, 20);
      setSearchedAnime(data.results);
    } catch (error) {
      console.error("Error fetching searched anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchedData = (data) => {
    setSearchedAnime(data);
  };

  return (
    <div className="w-screen min-h-screen dark:bg-zinc-900 dark:text-gray-300">
      <div className="w-full h-full pt-5 px-4 flex flex-col gap-6 lg:gap-10 justify-center items-center">
        {/* search container */}
        <div className="lg:hidden w-full px-4">
          <Search onSearchedData={handleSearchedData} />
        </div>
        <div className="w-full flex justify-center sm:justify-start items-center font-semibold lg:font-bold dark:text-zinc-300 px-4 lg:mt-4">
          {inputValue === "" ? (
            <span className="text-xs xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-500">
              Search Anime...
            </span>
          ) : isLoading == true ? (
            <Skeleton
              className="w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px] h-3 xs:h-4 
            sm:h-5 md:h-6 lg:h-7 rounded-sm bg-zinc-200 dark:bg-zinc-800"
            ></Skeleton>
          ) : (
            <span className="text-xs xs:text-base sm:text-lg md:text-xl lg:text-2xl">
              Search Results for "{inputValue}"
            </span>
          )}
        </div>

        {/* items to be search */}
        <div className="w-full lg:px-2">
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
              <Cards animeList={searchedAnime} type={"search"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
