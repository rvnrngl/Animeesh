import React, { useState, useEffect } from "react";
import axios from "axios";

export const Cards = () => {
  const [recentAnime, setRecentAnime] = useState([]);

  //get recent anime episodes
  const url = "https://api.consumet.org/anime/gogoanime/recent-episodes";
  const getRecentAnime = async () => {
    try {
      const response = await axios.get(url, { params: { page: 1, type: 1 } });
      setRecentAnime(response.data.results);
      // console.log(response);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    getRecentAnime();
  }, []);

  return (
    <>
      {recentAnime.map((anime) => {
        return (
          <div
            key={anime.id}
            className="flex flex-col items-center text-sm lg:text-base rounded-md overflow-hidden
            lg:hover:brightness-75 duration-300 ease-out"
          >
            <div className="h-[87%] w-full rounded-lg overflow-hidden object-cover relative">
              <img
                src={anime.image}
                alt={anime.title}
                className="h-full w-full object-cover object-center"
              />
              {/* hover details */}
              {/* <div className="absolute w-full h-1/4 bottom-0 left-0 bg-black/50 text-white text-sm">
                <p className="text-lg">Episode: {anime.episodeNumber}</p>
              </div> */}
            </div>

            <p className="h-[13%] w-full text-center dark:text-gray-300">
              {anime.title}
            </p>
          </div>
        );
      })}
    </>
  );
};
