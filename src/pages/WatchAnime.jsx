import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { META } from "@consumet/extensions";
import axios from "axios";

//import vidstack
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";

import { defineCustomElements } from "vidstack/elements";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import { Recommendation } from "../components/Recommendation";

defineCustomElements();

export const WatchAnime = () => {
  const anilist = new META.Anilist(); // initialized provider
  const location = useLocation(); // get state anime data
  const [animeId] = useState(location.state.anime.id); // init anime id from location
  const [animeInfo, setAnimeInfo] = useState({}); // anime info data from api
  const [episode, setEpisode] = useState([]); // get episodes
  const [currentEpisode, setCurrentEpisode] = useState(""); // get current episode url
  const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState(1); //set current episode number
  const [animeRecommendation, setAnimeRecommendation] = useState([]); // get list of anime recommendation

  // get anime info using anime id
  const getAnimeInfo = async () => {
    await anilist.fetchAnimeInfo(animeId).then((data) => {
      setAnimeInfo(data); // get anime info
      setEpisode(data.episodes); // get anime episodes
      setAnimeRecommendation(data.recommendations); // get anime recommendations
    });
  };

  useEffect(() => {
    getAnimeInfo();
  }, [animeId]);

  // get the current episode
  const getCurrentEpisode = async (id) => {
    try {
      const url = `https://api.consumet.org/anime/gogoanime/watch/${id}`;
      const response = await axios.get(url, { params: { server: "gogocdn" } });
      setCurrentEpisode(response.data.sources[4]);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    getCurrentEpisode(episode[episode.length - 1]?.id); // get first episode of the anime
  }, [episode]);

  // get selected episode id
  const handleCurrentLyWatching = (id, number) => {
    // setIsLoading(true);
    setCurrentEpisodeNumber(number);
    getCurrentEpisode(id);
  };

  return (
    <>
      <div className="w-screen min-h-screen dark:bg-zinc-800">
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-5 pt-[95px] px-5 lg:px-10 xl:px-20">
          {/* video wrapper comment */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <div>
              <media-player
                autoplay
                src={currentEpisode.url}
                aspect-ratio="16/9"
                crossorigin
              >
                <media-outlet></media-outlet>
                <media-community-skin></media-community-skin>
              </media-player>
            </div>
            {/* Controls */}
            <div className="w-full flex flex-col justify-center text-gray-300 items-center gap-4 p-2">
              <p className="text-gray-900 dark:text-gray-300">
                Currently Watching: Episode {currentEpisodeNumber}
              </p>
            </div>
          </div>
          {/* List of Episodes */}
          <div className="lg:col-span-1 w-full h-fit dark:bg-zinc-500/20 py-3 pb-5 rounded-md">
            {episode.length > 30 ? (
              <>
                {/* greater than 30 episodes */}
                <div className=" px-3 pb-1">
                  <p className="text-gray-900 dark:text-gray-300">
                    List of episodes:
                  </p>
                </div>
                <div className="w-full grid place-items-center grid-cols-6 py-2 max-h-[295px] lg:max-h-[290px] overflow-y-scroll overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] gap-2 px-3">
                  {episode.toReversed().map((eps, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() =>
                          handleCurrentLyWatching(eps.id, index + 1)
                        }
                        className={`w-full flex items-center justify-center rounded-sm p-2 text-black cursor-pointer ${
                          currentEpisode.id === eps.id
                            ? "bg-orange-500"
                            : "bg-zinc-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                {/* less than 30 episodes */}
                <div className=" px-3 pb-1">
                  <p className="text-gray-900 dark:text-gray-300">
                    List of episodes:
                  </p>
                </div>
                <div className="py-2 max-h-[295px] lg:max-h-[310px] overflow-y-scroll overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  <div className="w-full grid place-items-center">
                    {episode.toReversed().map((eps, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() =>
                            handleCurrentLyWatching(eps.id, index + 1)
                          }
                          className={`w-full flex items-center justify-start py-3 text-gray-900 dark:text-gray-300
                         hover:bg-zinc-500 cursor-pointer px-4 gap-2 flex-nowrap lg:text-sm
                        ${
                          index % 2 === 0 ? "bg-zinc-600/50" : "bg-zinc-500/50"
                        }`}
                        >
                          <span>{index + 1}.</span>
                          <span>{eps.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* anime details comment */}
          <div className="lg:col-span-3 p-3 bg-zinc-500/20 lg:pr-20 dark:text-gray-300 rounded-md text-sm">
            <div className="flex flex-row items-start gap-3 lg:gap-6">
              {/* image section comment */}
              <img
                src={animeInfo.image}
                alt={animeInfo.id}
                className="w-[120px] h-[120px] lg:w-[250px] lg:h-[300px]"
              />
              <div>
                <h1 className="text-xl font-bold mb-2">
                  {animeInfo.title?.english}
                </h1>
                <p className="mb-2 w-full cursor-pointer overflow-y-scroll overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  {animeInfo.description?.length > 180
                    ? animeInfo.description
                        ?.replace(/<\/?i\s*\/?>/g, "")
                        ?.replace(/<\/?br\s*\/?>/g, "")
                        .slice(0, 185) + "...See More"
                    : animeInfo.description
                        ?.replace(/<\/?i\s*\/?>/g, "")
                        ?.replace(/<\/?br\s*\/?>/g, "")}
                </p>
                <ul>
                  <li className=" text-gray-500">
                    Studio:{" "}
                    <span className="text-black dark:text-gray-300">
                      {animeInfo.studios}
                    </span>
                  </li>
                  <li className=" text-gray-500">
                    Release Date:{" "}
                    <span className="text-black dark:text-gray-300">
                      {animeInfo.releaseDate}
                    </span>
                  </li>
                  <li className=" text-gray-500">
                    Status:{" "}
                    <span className="text-black dark:text-gray-300">
                      {animeInfo.status}
                    </span>
                  </li>
                  <li className=" text-gray-500">
                    Total Episode:{" "}
                    <span className="text-black dark:text-gray-300">
                      {animeInfo.totalEpisodes}
                    </span>
                  </li>
                  <li className=" text-gray-500">
                    Type:{" "}
                    <span className="text-black dark:text-gray-300">
                      {animeInfo.type}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* recommendation anime */}
          <div className="lg:col-span-4 w-full mb-10">
            <h1 className="mt-[15px] mb-4 text-lg lg:text-2xl lg:font-semibold dark:text-gray-300">
              Recommendations
            </h1>
            <div className="w-full p-3 rounded-md bg-zinc-500/20">
              <Recommendation animeRecommendation={animeRecommendation} />
            </div>
          </div>
          {/* end */}
        </div>
      </div>
    </>
  );
};
