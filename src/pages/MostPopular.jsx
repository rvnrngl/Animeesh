import React, { useEffect, useState } from "react";
import { Cards } from "../components/Cards";
import { META } from "@consumet/extensions";

export const MostPopular = () => {
  const anilist = new META.Anilist();
  const [popularAnime, setPopularAnime] = useState([]);
  const getPopularAnime = async () => {
    await anilist
      .advancedSearch(undefined, "ANIME", 1, 20, undefined, ["POPULARITY_DESC"])
      .then((data) => setPopularAnime(data.results));
  };

  useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <div className="w-screen min-h-screen dark:bg-zinc-900 dark:text-gray-300">
      <div className="w-full h-full pt-5 xs:px-4 flex flex-col gap-10 justify-center items-center">
        {/* Title */}
        <div className="w-full flex justify-center sm:justify-start items-center text-zinc-300 px-4 lg:mt-4">
          <span className="text-xs xs:text-base sm:text-lg md:text-xl lg:text-3xl font-bold">
            Most Popular Anime
          </span>
        </div>
        {/* items */}
        <div className="w-full lg:px-2">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
            <Cards animeList={popularAnime} type={"popular"} />
          </div>
        </div>
      </div>
    </div>
  );
};
