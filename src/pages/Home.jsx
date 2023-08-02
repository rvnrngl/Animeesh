import React from "react";
import { Cards } from "../components/Cards";
import { Carousel } from "../components/Carousel";

export const Home = () => {
  return (
    <div className="w-screen min-h-screen dark:bg-zinc-800">
      <div className="w-full flex flex-col justify-center items-center px-5">
        {/* Slider */}
        <div className="h-[40vh] lg:h-[75vh] w-full mt-[100px] shadow-lg">
          <Carousel />
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
