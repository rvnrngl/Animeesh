import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { META } from "@consumet/extensions";
import axios from "axios";

//import vidstack
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import { defineCustomElements } from "vidstack/elements";

import { Recommendation } from "../components/Recommendation";

import { GiPreviousButton, GiNextButton } from "react-icons/gi";

defineCustomElements();

export const WatchAnime = () => {
  const anilist = new META.Anilist(); // initialized provider
  const location = useLocation(); // get state anime data
  const [animeId] = useState(location.state.anime.id); // init anime id from location
  const [animeInfo, setAnimeInfo] = useState({}); // anime info data from api
  const [episode, setEpisode] = useState([]); // get episodes
  const [currentEpisode, setCurrentEpisode] = useState(""); // get current episode url
  const [currentEpisodeId, setCurrentEpisodeId] = useState(""); // get current episode id
  const [currentEpisodeTitle, setCurrentEpisodeTitle] = useState("");
  const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState(null); //set current episode number
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
    const getType = window.localStorage.getItem("type"); // get the type of parameter in where the anime data came from "recent/search"
    // note the api episodes array start from last item
    if (getType === "recent") {
      getCurrentEpisode(episode[0]?.id); // get recent episode of the anime
      setCurrentEpisodeId(episode[0]?.id);
      setCurrentEpisodeTitle(episode[0]?.title);
      setCurrentEpisodeNumber(episode.length);
    } else {
      getCurrentEpisode(episode[episode.length - 1]?.id); // get first episode of the anime
      setCurrentEpisodeId(episode[episode.length - 1]?.id);
      setCurrentEpisodeTitle(episode[episode.length - 1]?.title);
      setCurrentEpisodeNumber(episode.length - (episode.length - 1));
    }
  }, [episode]);

  // get selected episode id
  const handleCurrentLyWatching = (eps, number) => {
    // setIsLoading(true);
    getCurrentEpisode(eps.id);
    setCurrentEpisodeNumber(number);
    setCurrentEpisodeId(eps.id);
    setCurrentEpisodeTitle(eps.title);
  };

  return (
    <>
      <div className="w-screen min-h-screen dark:bg-zinc-900">
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-5 pt-5 px-5 lg:px-10 xl:px-20">
          {/* video wrapper comment */}
          <div className="lg:col-span-3 flex flex-col">
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
            <div className="w-full flex justify-between rounded-md items-center text-gray-300 gap-4 p-2">
              <p className="text-gray-900 dark:text-gray-300 text-xs lg:text-lg">
                Episode {currentEpisodeNumber} :{" "}
                {currentEpisodeTitle?.length > 60
                  ? currentEpisodeTitle.slice(0, 60) + "..."
                  : currentEpisodeTitle}
              </p>
              <div className="flex items-center gap-4 text-lg lg:text-2xl text-zinc-600 dark:text-gray-400">
                <button>
                  <GiPreviousButton />
                </button>
                <button>
                  <GiNextButton />
                </button>
              </div>
            </div>
          </div>
          {/* List of Episodes */}
          <div className="lg:col-span-1 w-full h-fit text-sm bg-zinc-100 border dark:border-none dark:bg-zinc-500/20 py-3 pb-5 rounded-md">
            {episode.length > 30 ? (
              <>
                {/* greater than 30 episodes */}
                <div className=" px-3 pb-1">
                  <p className="text-gray-900 font-semibold dark:text-gray-300">
                    List of episodes:
                  </p>
                </div>
                <div
                  className="w-full grid place-items-center grid-cols-6 py-2 max-h-[295px] lg:max-h-[290px] overflow-y-scroll overflow-x-hidden 
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] gap-2 px-3"
                >
                  {episode.toReversed().map((eps, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handleCurrentLyWatching(eps, index + 1)}
                        className={`w-full flex items-center justify-center rounded-sm p-2 hover:text-gray-200 hover:bg-zinc-700 
                        dark:hover:text-gray-900 dark:hover:bg-zinc-300 cursor-pointer ${
                          currentEpisodeId === eps.id
                            ? "bg-zinc-500 dark:bg-zinc-400 text-gray-100 dark:text-gray-900"
                            : "bg-zinc-400 dark:bg-zinc-700 text-black dark:text-gray-400"
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
                            handleCurrentLyWatching(eps, index + 1)
                          }
                          className={`w-full flex items-center justify-start py-3 text-gray-900 dark:text-gray-300
                          hover:bg-zinc-600 hover:text-gray-200 dark:hover:bg-zinc-300 dark:hover:text-gray-900 
                          cursor-pointer px-4 gap-2 flex-nowrap lg:text-sm ${
                            currentEpisodeId === eps.id
                              ? "bg-zinc-500 dark:bg-zinc-400 dark:text-gray-950 text-gray-100"
                              : index % 2 === 0
                              ? "bg-zinc-300 dark:bg-zinc-600"
                              : "bg-zinc-400/90 dark:bg-zinc-700/50"
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
          <div className="lg:col-span-3 p-3 lg:pr-20 dark:text-gray-300 rounded-md text-sm">
            <div className="flex flex-col xs:flex-row items-center xs:items-start gap-3 lg:gap-6">
              {/* image section comment */}
              <img
                src={animeInfo.image}
                alt={animeInfo.id}
                className="w-[150px] h-[180px] xs:w-[100px] xs:h-[120px] sm:w-[160px] sm:h-[200px] 
                lg:w-[250px] lg:h-[300px] object-cover"
              />
              <div className="text-sm text-center xs:text-left">
                <h1 className="text-lg lg:text-2xl uppercase font-bold mb-2">
                  {animeInfo.title?.english === null
                    ? animeInfo.title?.userPreferred
                    : animeInfo.title?.english}
                </h1>
                <p
                  className="md:hidden mb-3 w-full cursor-pointer text-justify overflow-y-scroll overflow-x-hidden 
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                >
                  {animeInfo.description?.length > 180
                    ? animeInfo.description
                        ?.replace(/<\/?i\s*\/?>/g, "")
                        ?.replace(/<\/?br\s*\/?>/g, "")
                        .slice(0, 185) + "...See More"
                    : animeInfo.description
                        ?.replace(/<\/?i\s*\/?>/g, "")
                        ?.replace(/<\/?br\s*\/?>/g, "")}
                </p>
                <p
                  className="hidden md:block mb-3 w-full cursor-pointer text-justify overflow-y-scroll overflow-x-hidden 
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                >
                  {animeInfo.description?.length > 250
                    ? animeInfo.description
                        ?.replace(/<\/?i\s*\/?>/g, "")
                        ?.replace(/<\/?br\s*\/?>/g, "")
                        .slice(0, 250) + "...See More"
                    : animeInfo.description
                        ?.replace(/<\/?i\s*\/?>/g, "")
                        ?.replace(/<\/?br\s*\/?>/g, "")}
                </p>
                <ul className="w-full grid grid-cols-2 gap-1 text-xs lg:text-sm">
                  <div className="flex flex-col items-start">
                    <li className=" text-gray-500">
                      Type:{" "}
                      <span className="text-black dark:text-gray-300">
                        {animeInfo.type}
                      </span>
                    </li>
                    <li className=" text-gray-500">
                      Season:{" "}
                      <span className="text-black dark:text-gray-300">
                        {animeInfo.season}
                      </span>
                    </li>
                    <li className=" text-gray-500">
                      Country:{" "}
                      <span className="text-black dark:text-gray-300">
                        {animeInfo.countryOfOrigin}
                      </span>
                    </li>
                    <li className=" text-gray-500">
                      Status:{" "}
                      <span className="text-black dark:text-gray-300">
                        {animeInfo.status}
                      </span>
                    </li>
                    <li className=" text-gray-500">
                      Release Date:{" "}
                      <span className="text-black dark:text-gray-300">
                        {animeInfo.releaseDate}
                      </span>
                    </li>
                    <li className="text-left text-gray-500">
                      Genre:{" "}
                      <span className="text-black dark:text-gray-300">
                        {animeInfo.genres?.map((genre, index) => (
                          <span key={index}>{genre} </span>
                        ))}
                      </span>
                    </li>
                  </div>
                  <div className="flex flex-col items-start">
                    <li className=" text-gray-500">
                      Sub/Dub:{" "}
                      <span className="text-black dark:text-gray-300">
                        {animeInfo.subOrDub}
                      </span>
                    </li>
                    <li className=" text-gray-500">
                      Episodes:{" "}
                      <span className="text-black dark:text-gray-300">
                        {animeInfo.currentEpisode}
                      </span>
                    </li>
                    <li className=" text-gray-500">
                      Duration:{" "}
                      <span className="text-black dark:text-gray-300">
                        {animeInfo.duration}
                      </span>
                    </li>
                    <li className=" text-gray-500">
                      Rating:{" "}
                      <span className="text-black dark:text-gray-300">
                        {animeInfo.rating}
                      </span>
                    </li>
                    <li className=" text-gray-500">
                      Popularity:{" "}
                      <span className="text-black dark:text-gray-300">
                        {animeInfo.popularity}
                      </span>
                    </li>
                    <li className=" text-gray-500">
                      Studio:{" "}
                      <span className="text-black dark:text-gray-300">
                        {animeInfo.studios}
                      </span>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          {/* recommendation anime */}
          <div className="lg:col-span-4 w-full mb-10">
            <h1 className="mt-[15px] mb-4 text-lg lg:text-2xl lg:font-semibold dark:text-gray-300">
              Recommendations
            </h1>
            <div className="w-full p-3 rounded-md bg-zinc-100 border dark:border-none dark:bg-zinc-500/20">
              <Recommendation animeRecommendation={animeRecommendation} />
            </div>
          </div>
          {/* end */}
        </div>
      </div>
    </>
  );
};
