import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
import { Relations } from "@/components/Relations";

export const WatchAnime = () => {
  const location = useLocation(); // get state anime data
  const fetchAnimeId = location.state.anime.id; // init anime id from location
  const [animeId, setAnimeId] = useState(fetchAnimeId);
  const [animeInfo, setAnimeInfo] = useState({}); // anime info data from api
  const [episode, setEpisode] = useState([]); // get episodes
  const [currentEpisode, setCurrentEpisode] = useState(""); // get current episode url
  const [currentEpisodeTitle, setCurrentEpisodeTitle] = useState("");
  const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState(null); //set current episode number
  const [relations, setRelations] = useState([]);
  const [animeRecommendation, setAnimeRecommendation] = useState([]); // get list of anime recommendation
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(true);
  const { title } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setAnimeId(fetchAnimeId);
  }, [title]);

  useEffect(() => {
    getAnimeInfo();
  }, [animeId]);

  /*--------------------Check if episode list has episode 0------------------------*/
  useEffect(() => {
    const hasZero = episode.some((eps) => eps.number === 0);
    const epsLengthNext = hasZero ? episode.length - 1 : episode.length;
    const epsLengthPrev = hasZero ? 0 : 1;
    setNext(currentEpisodeNumber < epsLengthNext ? false : true);
    setPrev(currentEpisodeNumber > epsLengthPrev ? false : true);
  }, [currentEpisodeNumber]);

  /*--------------------Check if props came from recent or other types------------------------*/
  useEffect(() => {
    if (episode.length > 0 && isLoading === false) {
      const getType = window.localStorage.getItem("type");
      if (getType === "recent") {
        // if type is recent get recent episode instead
        const hasZero = episode.some((eps) => eps.number === 0);
        const recent = hasZero ? episode.length - 1 : episode.length;
        const recentEp = episode.find((eps) => eps.number === recent);
        const source = recentEp?.sources[0];
        getCurrentEpisode(source.id);
        setCurrentEpisodeTitle(recentEp.title);
        setCurrentEpisodeNumber(recentEp.number);
      } else {
        // get first episode
        const hasZero = episode.some((eps) => eps.number === 0);
        const first = hasZero ? 0 : 1;
        const eps1 = episode.find((eps) => eps.number === first);
        const source = eps1.sources[0];
        getCurrentEpisode(source.id);
        setCurrentEpisodeTitle(eps1.title);
        setCurrentEpisodeNumber(eps1.number);
      }
    }
  }, [episode]);

  /*--------------------get anime info using anime id from location state------------------------*/
  const getAnimeInfo = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAnime(animeId);
      setAnimeInfo(data.anilistRes); // get anime info
      const sortedEpisode = data.episode?.sort((a, b) => a.number - b.number); // sort episodes asc
      const filteredRelations = data.anilistRes.relations?.filter(
        (item) =>
          (item.relationType === "PREQUEL" || item.relationType === "SEQUEL") &&
          (item.status === "Completed" || item.status === "Ongoing")
      ); // filter relations
      setEpisode(sortedEpisode); // get anime episodes
      setRelations(filteredRelations); // get anime relations
      setAnimeRecommendation(data.anilistRes.recommendations); // get anime recommendations
    } catch (error) {
      console.error("Error fetching anime info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /*--------------------Get the current episode url------------------------*/
  const getCurrentEpisode = async (epsId) => {
    setIsVideoLoading(true);
    if (epsId !== undefined) {
      try {
        const data = await fetchEpisodeUrl(epsId);
        if (data.includes("https://ec.netmagcdn.com:2228")) {
          setCurrentEpisode(
            data.replace("https://ec.netmagcdn.com:2228", "/source")
          );
        } else {
          setCurrentEpisode(data);
        }
      } catch (err) {
        throw new Error(err.message);
      } finally {
        setIsVideoLoading(false);
      }
    }
  };

  const handleCurrentLyWatching = (eps, number) => {
    if (currentEpisodeNumber !== number) {
      const episode = eps.sources[0];
      setCurrentEpisodeNumber(number);
      setCurrentEpisodeTitle(eps.title);
      getCurrentEpisode(episode.id);
    }
  };

  const handleEpisodes = (action) => {
    const hasZero = episode.some((eps) => eps.number === 0);
    const epsLengthNext = hasZero ? episode.length - 1 : episode.length;
    const epsLengthPrev = hasZero ? 0 : 1;
    if (action === "next") {
      if (currentEpisodeNumber < epsLengthNext) {
        const currentEpisode = episode.find(
          (eps) => eps.number === currentEpisodeNumber + 1
        );
        handleCurrentLyWatching(currentEpisode, currentEpisodeNumber + 1);
      }
    } else {
      if (currentEpisodeNumber > epsLengthPrev) {
        const currentEpisode = episode.find(
          (eps) => eps.number === currentEpisodeNumber - 1
        );
        handleCurrentLyWatching(currentEpisode, currentEpisodeNumber - 1);
      }
    }
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
                src={isVideoLoading === false ? currentEpisode : ""}
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
                  {currentEpisodeTitle === null
                    ? `Episode ${currentEpisodeNumber}`
                    : `Episode ${currentEpisodeNumber} : ${currentEpisodeTitle}`}
                </p>
                <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-4 text-zinc-600 dark:text-gray-300">
                  <button
                    disabled={prev}
                    onClick={() => handleEpisodes("prev")}
                    className="flex items-center gap-1 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:dark:text-zinc-500 enabled:hover:text-orange-400"
                  >
                    <GiPreviousButton className="text-lg lg:text-xl" />
                    <span className="hidden sm:block uppercase text-xs md:text-base">
                      prev
                    </span>
                  </button>
                  <span className="cursor-default text-xs lg:text-base">|</span>
                  <button
                    disabled={next}
                    onClick={() => handleEpisodes("next")}
                    className="flex items-center gap-2 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:dark:text-zinc-500 enabled:hover:text-orange-400"
                  >
                    <span className="hidden sm:block uppercase text-xs md:text-base">
                      next
                    </span>
                    <GiNextButton className="text-lg lg:text-xl" />
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
                    {episode.map((eps, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() =>
                            handleCurrentLyWatching(eps, eps.number)
                          }
                          className={`w-full flex items-center justify-center rounded-sm p-2 cursor-pointer ${
                            currentEpisodeNumber === eps.number
                              ? "bg-orange-400/80 dark:bg-orange-400/80 dark:text-gray-950 font-semibold"
                              : `bg-zinc-200 dark:bg-zinc-800 text-gray-950 dark:text-gray-400 
                              lg:hover:bg-zinc-300 lg:dark:hover:bg-zinc-700`
                          }`}
                        >
                          {eps.number}
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
                      {episode.map((eps, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() =>
                              handleCurrentLyWatching(eps, eps.number)
                            }
                            className={`relative w-full flex items-center px-3 pr-10 py-2 gap-2 cursor-pointer lg:text-sm ${
                              currentEpisodeNumber === eps.number
                                ? "bg-orange-400/80 dark:bg-orange-400/80 text-gray-950 font-semibold"
                                : `odd:bg-zinc-200 dark:odd:bg-zinc-800 text-gray-900 dark:text-gray-400 even:bg-transparent dark:even:bg-transparent 
                                lg:hover:bg-zinc-300 hover:text-gray-950 dark:lg:hover:bg-zinc-700 dark:hover:text-gray-100`
                            }`}
                          >
                            <span>{eps.number}.</span>
                            <span className="line-clamp-1">
                              {eps.title === null
                                ? `Episode ${eps.number}`
                                : eps.title}
                            </span>
                            {currentEpisodeNumber === eps.number ? (
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
          <div className="lg:col-span-3 px-2 dark:px-0 py-3 lg:pr-20 bg-zinc-100 border dark:border-none dark:bg-transparent dark:text-gray-300 rounded-md text-sm">
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
                        Current Episodes:{" "}
                        <span className="text-black dark:text-gray-300">
                          {animeInfo.currentEpisode}
                        </span>
                      </li>
                      <li className=" text-gray-500">
                        Total Episodes:{" "}
                        <span className="text-black dark:text-gray-300">
                          {animeInfo.totalEpisodes}
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
          {/* relations */}
          {relations.length > 0 ? (
            <div className="lg:col-span-3 px-2 dark:px-0 py-3 lg:pr-20 bg-zinc-100 border dark:border-none dark:bg-transparent dark:text-gray-300 rounded-md text-sm">
              {isLoading ? (
                <>
                  <Skeleton className="mb-4 h-8 w-20 lg:font-semibold dark:text-gray-300" />
                  <Skeleton className="h-20 w-full lg:font-semibold dark:text-gray-300" />
                </>
              ) : (
                <>
                  <h1 className="mb-4 text-lg lg:text-2xl lg:font-semibold dark:text-gray-300">
                    Related
                  </h1>
                  <div className="w-full grid gap-2">
                    <Relations relations={relations} type={"relation"} />
                  </div>
                </>
              )}
            </div>
          ) : (
            ""
          )}
          {/* recommendation anime */}
          <div className="lg:col-span-4 w-full">
            {animeRecommendation.length > 0 ? (
              <h1 className="mt-[15px] mb-4 text-lg lg:text-2xl lg:font-semibold dark:text-gray-300">
                Recommendations
              </h1>
            ) : (
              ""
            )}
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
            ) : animeRecommendation.length > 0 ? (
              <Recommendation animeRecommendation={animeRecommendation} />
            ) : (
              ""
            )}
          </div>
          {/* end */}
        </div>
      </div>
    </>
  );
};
