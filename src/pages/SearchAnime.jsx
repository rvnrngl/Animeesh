import React, { useEffect, useRef, useState } from "react";
import { Search } from "../components/Search";
import { META } from "@consumet/extensions";

// react icons
import { Cards } from "../components/Cards";

export const SearchAnime = () => {
  const anilist = new META.Anilist();
  const [inputValue] = useState(localStorage.getItem("inputValue") || ""); // init input value stored in local storage
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const getSearchedAnime = async () => {
    await anilist.search(inputValue, 1, 20).then((data) => {
      setSearchedAnime(data.results);
    });
  };

  useEffect(() => {
    getSearchedAnime();
  }, [inputValue]);

  const handleSearchedData = (data) => {
    if (data.length > 0) {
      setIsFetched(true);
      setSearchedAnime(data);
    } else {
      setIsFetched(false);
    }
  };

  return (
    <div className="w-screen min-h-screen dark:bg-zinc-900 dark:text-gray-300">
      <div className="w-full h-full pt-5 px-4 flex flex-col gap-10 justify-center items-center">
        {/* search container */}
        <div className="lg:hidden w-full px-4">
          <Search onSearchedData={handleSearchedData} />
        </div>
        <div className="w-full flex justify-center sm:justify-start items-center text-zinc-300 px-4 lg:mt-4">
          <span className="text-xs xs:text-base sm:text-lg md:text-xl lg:text-2xl">
            Search results for "{inputValue}"
          </span>
        </div>

        {/* items to be search */}
        <div className="w-full lg:px-2">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
            <Cards animeList={searchedAnime} type={"search"} />
          </div>
        </div>
      </div>
    </div>
  );
};
