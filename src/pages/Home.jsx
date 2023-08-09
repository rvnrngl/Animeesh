import React, { useState, useEffect } from "react";
import { Cards } from "../components/Cards";
import { Carousel } from "../components/Carousel";
import { Trending } from "../components/Trending";

import { META } from "@consumet/extensions";

export const Home = () => {
  const anilist = new META.Anilist();
  const [recentAnime, setRecentAnime] = useState([]);

  //get recent anime episodes
  const getRecentAnime = async () => {
    await anilist.fetchRecentEpisodes("gogoanime", 1, 20).then((data) => {
      setRecentAnime(data.results);
    });
  };

  useEffect(() => {
    getRecentAnime();
  }, []);

  return (
    <div className="w-screen min-h-screen dark:bg-zinc-900">
      <div className="w-full flex flex-col justify-center items-center gap-3 px-3 lg:px-5">
        {/* Slider */}
        <div className="h-[300px] md:h-[400px] lg:h-[75vh] mt-3 lg:mt-5 w-full shadow-lg">
          <Carousel />
        </div>
        {/* Trending Animes container */}
        <div className="w-full flex flex-col items-start">
          <h1 className="mt-[15px] mb-4 text-lg lg:text-2xl lg:font-semibold dark:text-gray-300">
            Trending Anime
          </h1>
          <Trending />
        </div>
        {/* Recent Updated Animes container */}
        <div className="mt-[15px]">
          <h1 className="mb-4 text-lg lg:text-2xl lg:font-semibold dark:text-gray-300">
            Recent Updated
          </h1>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
            <Cards animeList={recentAnime} type={"recent"} />
          </div>
        </div>
      </div>
    </div>
  );
};
