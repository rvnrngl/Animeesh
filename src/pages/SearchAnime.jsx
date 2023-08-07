import React, { useEffect, useRef, useState } from "react";
import { Search } from "../components/Search";
import { META } from "@consumet/extensions";

// react icons
import { FaPlay } from "react-icons/fa";
import { Cards } from "../components/Cards";

export const SearchAnime = () => {
  const anilist = new META.Anilist();
  const [inputValue] = useState(localStorage.getItem("inputValue") || ""); // init input value stored in local storage
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const getSearchedAnime = async () => {
    await anilist.search(inputValue).then((data) => {
      setSearchedAnime(data.results);
    });
  };

  useEffect(() => {
    getSearchedAnime();
    localStorage.removeItem("inputValue");
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
      <div className="w-full h-full pt-5 px-4 flex flex-col gap-4 justify-center items-center">
        {/* search container */}
        <Search onSearchedData={handleSearchedData} />
        {/* items to be search */}
        <div className="w-full px-4">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
            <Cards animeList={searchedAnime} type={"search"} />
          </div>
        </div>
      </div>
    </div>
  );
};
