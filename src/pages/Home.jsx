import React from "react";
import { Cards } from "../components/Cards";
import { Carousel } from "../components/Carousel";
import { Trending } from "../components/Trending";

export const Home = () => {
  return (
    <div className="w-screen min-h-screen dark:bg-zinc-800">
      <div className="w-full flex flex-col justify-center items-center gap-3 px-3 lg:px-5">
        {/* Slider */}
        <div className="h-[300px] md:h-[400px] lg:h-[75vh] w-full mt-[100px] shadow-lg">
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
        <div>
          <h1 className="mt-[15px] mb-4 text-lg lg:text-2xl lg:font-semibold dark:text-gray-300">
            Recent Updated
          </h1>
          <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-5">
            <Cards />
          </div>
        </div>
      </div>
    </div>
  );
};
