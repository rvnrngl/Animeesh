import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import {
  MediaCommunitySkin,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
} from "@vidstack/react";
import { Recommendation } from "../components/Recommendation";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";
import { BsPlayFill } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAnime, fetchEpisodeUrl } from "@/api/apiRequests";

export const WatchAnime = () => {
  const location = useLocation(); // get state anime data
  const fetchAnimeId = location.state.anime.id; // init anime id from location
  const [animeId, setAnimeId] = useState(fetchAnimeId);
  const [animeInfo, setAnimeInfo] = useState({}); // anime info data from api
  const [episode, setEpisode] = useState([]); // get episodes
  const [currentEpisode, setCurrentEpisode] = useState(""); // get current episode url
  const [currentEpisodeId, setCurrentEpisodeId] = useState(""); // get current episode id
  const [currentEpisodeTitle, setCurrentEpisodeTitle] = useState("");
  const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState(null); //set current episode number
  const [animeRecommendation, setAnimeRecommendation] = useState([]); // get list of anime recommendation
  const [isLoading, setIsLoading] = useState(false);
  const { title } = useParams();

  useEffect(() => {
    setAnimeId(fetchAnimeId);
  }, [title]);

  useEffect(() => {
    getAnimeInfo();
  }, [animeId]);

  // get anime info using anime id
  const getAnimeInfo = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAnime(animeId);
      setAnimeInfo(data); // get anime info
      setEpisode(data.episodes); // get anime episodes
      setAnimeRecommendation(data.recommendations); // get anime recommendations
    } catch (error) {
      console.error("Error fetching anime info:", error);
    }
  };

  // get the current episode
  const getCurrentEpisode = async (epsId) => {
    if (epsId !== undefined) {
      try {
        const data = await fetchEpisodeUrl(epsId);
        setCurrentEpisode(data.url);
      } catch (err) {
        throw new Error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const getType = window.localStorage.getItem("type"); // get the type of parameter in where the anime data came from "recent/other"
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
    const player = document.querySelector("media-player");
    player.pause();
    setCurrentEpisodeNumber(number);
    setCurrentEpisodeId(eps.id);
    setCurrentEpisodeTitle(eps.title);
    getCurrentEpisode(eps.id);
  };

  return (
    <>
      <div className="w-screen min-h-screen dark:bg-zinc-900">
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-5 pt-4 px-4 md:px-5 lg:px-10 xl:px-20">
          {/* media player */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            {isLoading === true ? (
              <Skeleton className="aspect-video bg-zinc-200 dark:bg-zinc-800"></Skeleton>
            ) : (
              <MediaPlayer
                autoplay={true}
                src={currentEpisode}
                aspectRatio={16 / 9}
                crossorigin=""
              >
                <MediaOutlet></MediaOutlet>
                <MediaCommunitySkin />
              </MediaPlayer>
            )}
            {/* Controls */}
            {isLoading === true ? (
              <Skeleton className="w-full bg-zinc-200 dark:bg-zinc-800 h-6 xs:h-7 lg:h-10 p-2"></Skeleton>
            ) : (
              <div className="w-full flex justify-between rounded-md items-center text-gray-300 gap-4 p-2">
                <p className="text-gray-900 dark:text-gray-300 text-xs lg:text-base line-clamp-1">
                  Episode {currentEpisodeNumber} : {currentEpisodeTitle}
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
            )}
          </div>
          {/* List of Episodes */}
          {isLoading === true ? (
            <div className="lg:col-span-1 w-full pb-5 overflow-hidden rounded-md">
              <Skeleton className="w-full px-3 py-2 pb-2 rounded-none bg-zinc-200 dark:bg-zinc-800">
                <Skeleton className="w-2/4 mt-3 h-6 bg-zinc-400/50 dark:bg-zinc-700/50"></Skeleton>
              </Skeleton>
              <Skeleton
                className="py-3 h-[295px] lg:max-h-[310px] overflow-y-scroll overflow-x-hidden rounded-none 
                rounded-b-md bg-zinc-200 dark:bg-zinc-800 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
              >
                <div className="w-full grid place-items-center gap-2 px-3">
                  {Array.from({ length: 6 }, (_, index) => {
                    return (
                      <Skeleton
                        key={index}
                        className="w-full h-[35px] bg-zinc-400/50 dark:bg-zinc-700/50"
                      ></Skeleton>
                    );
                  })}
                </div>
              </Skeleton>
            </div>
          ) : (
            <div
              className="lg:col-span-1 w-full h-fit text-xs sm:text-sm bg-zinc-100 border dark:border-none 
            dark:bg-zinc-800/30 py-3 pb-5 rounded-sm"
            >
              {episode.length > 30 ? (
                <>
                  {/* greater than 30 episodes */}
                  <div className="px-3 pb-2">
                    <p className="text-gray-950 dark:text-gray-400">
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
                          onClick={() =>
                            handleCurrentLyWatching(eps, index + 1)
                          }
                          className={`w-full flex items-center justify-center rounded-sm p-2 cursor-pointer ${
                            currentEpisodeId === eps.id
                              ? "bg-orange-400/80 dark:bg-orange-400/80 dark:text-gray-950 font-semibold"
                              : `bg-zinc-200 dark:bg-zinc-800 text-gray-950 dark:text-gray-400 
                              lg:hover:bg-zinc-300 lg:dark:hover:bg-zinc-700`
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
                  <div className=" px-3 pb-2">
                    <p className="text-gray-500 dark:text-gray-400">
                      List of episodes:
                    </p>
                  </div>
                  <div
                    className="w-full py-2 max-h-[295px] lg:max-h-[310px] overflow-y-scroll overflow-x-hidden 
                  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                  >
                    <div className="w-full grid place-items-center">
                      {episode.toReversed().map((eps, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() =>
                              handleCurrentLyWatching(eps, index + 1)
                            }
                            className={`relative w-full flex items-center px-3 pr-10 py-2 gap-2 cursor-pointer lg:text-sm ${
                              currentEpisodeId === eps.id
                                ? "bg-orange-400/80 dark:bg-orange-400/80 text-gray-950 font-semibold"
                                : `odd:bg-zinc-200 dark:odd:bg-zinc-800 text-gray-900 dark:text-gray-400 even:bg-transparent dark:even:bg-transparent 
                                lg:hover:bg-zinc-300 hover:text-gray-950 dark:lg:hover:bg-zinc-700 dark:hover:text-gray-100`
                            }`}
                          >
                            <span>{index + 1}.</span>
                            <span className="line-clamp-1">{eps.title}</span>
                            {currentEpisodeId === eps.id ? (
                              <BsPlayFill className="absolute right-2 top-1/2 transform -translate-y-1/2 text-base xs:text-xl" />
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {/* anime details comment */}
          <div className="lg:col-span-3 py-3 lg:pr-20 bg-zinc-100 border dark:border-none dark:bg-transparent dark:text-gray-300 rounded-md text-sm">
            <div className="flex flex-col xs:flex-row items-center xs:items-start gap-3 lg:gap-6">
              {/* image section comment */}
              {isLoading === true ? (
                <Skeleton
                  className="w-[150px] h-[180px] xs:w-[100px] xs:h-[120px] sm:w-[160px] sm:h-[200px] 
                lg:w-[250px] lg:h-[300px] bg-zinc-200 dark:bg-zinc-800"
                ></Skeleton>
              ) : (
                <img
                  src={animeInfo.image}
                  alt={animeInfo.id}
                  className="w-[150px] h-[180px] xs:w-[100px] xs:h-[120px] sm:w-[160px] sm:h-[200px] 
                  lg:w-[250px] lg:h-[300px] object-cover"
                />
              )}
              {/* description */}
              {isLoading === true ? (
                <div className="w-full flex flex-col items-center xs:items-start gap-3 px-3">
                  <Skeleton className="w-3/4 h-[20px] lg:h-[30px] bg-zinc-200 dark:bg-zinc-800"></Skeleton>
                  <Skeleton className="w-full h-[30px] lg:h-[40px] bg-zinc-200 dark:bg-zinc-800"></Skeleton>
                  <Skeleton className="w-full h-[90px] lg:h-[200px] bg-zinc-200 dark:bg-zinc-800"></Skeleton>
                </div>
              ) : (
                <div className="text-sm text-center xs:text-left">
                  <h1 className="text-lg lg:text-2xl uppercase font-bold leading-5 mb-2">
                    {animeInfo.title?.english === null
                      ? animeInfo.title?.userPreferred !== undefined
                        ? animeInfo.title?.userPreferred
                        : animeInfo.title?.romaji
                      : animeInfo.title?.english}
                  </h1>
                  {animeInfo.synonyms?.length > 0 ? (
                    <h1 className=" text-xs sm:text-sm mb-2 text-gray-500 line-clamp-2">
                      {" "}
                      Synonyms:{" "}
                      {animeInfo.synonyms.map((synonym, index) => {
                        return (
                          <span
                            key={index}
                            className="text-black dark:text-gray-300"
                          >
                            {synonym}
                            {index !== animeInfo.synonyms.length - 1
                              ? ", "
                              : ""}
                          </span>
                        );
                      })}
                    </h1>
                  ) : (
                    ""
                  )}
                  <p
                    className="mb-3 w-full text-xs lg:text-sm cursor-pointer text-justify line-clamp-3 overflow-y-scroll 
                    overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                  >
                    {animeInfo.description
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
                            <span key={index}>
                              {genre}
                              {index !== animeInfo.genres.length - 1
                                ? ", "
                                : ""}
                            </span>
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
              )}
            </div>
          </div>
          {/* recommendation anime */}
          <div className="lg:col-span-4 w-full">
            <h1 className="mt-[15px] mb-4 text-lg lg:text-2xl lg:font-semibold dark:text-gray-300">
              Recommendations
            </h1>
            {isLoading === true ? (
              <div
                className="w-full h-[180px] xs:h-[240px] lg:h-[260px] xl:h-[300px] 
                grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2"
              >
                <Skeleton className="w-full relative bg-zinc-200 dark:bg-zinc-800"></Skeleton>
                <Skeleton className="w-full relative bg-zinc-200 dark:bg-zinc-800"></Skeleton>
                <Skeleton className="w-full relative bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></Skeleton>
                <Skeleton className="w-full relative bg-zinc-200 dark:bg-zinc-800 hidden md:block "></Skeleton>
                <Skeleton className="w-full relative bg-zinc-200 dark:bg-zinc-800 hidden lg:block "></Skeleton>
                <Skeleton className="w-full relative bg-zinc-200 dark:bg-zinc-800 hidden xl:block "></Skeleton>
              </div>
            ) : (
              <Recommendation animeRecommendation={animeRecommendation} />
            )}
          </div>
          {/* end */}
        </div>
      </div>
    </>
  );
};
