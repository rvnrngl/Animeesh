import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiFillLike, AiFillStar } from "react-icons/ai";
import { PiTelevisionBold } from "react-icons/pi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { NotFound } from "./NotFound";

export const Cards = ({ animeList, isRecent }) => {
  const navigate = useNavigate();

  const handleNavigationWithRecent = (id) => {
    if (!id) {
      return <NotFound />;
    }

    navigate(`/watch/${id}`, { state: { isIdRecent: isRecent } });
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      {animeList.map((anime, index) => {
        return (
          <HoverCard key={index} openDelay={600} closeDelay={100}>
            <HoverCardTrigger asChild>
              <div
                onClick={() => {
                  if (isRecent) {
                    if (
                      anime.status === "Completed" ||
                      anime.status === "Ongoing"
                    ) {
                      handleNavigationWithRecent(anime.id);
                    }
                  } else {
                    handleNavigationWithRecent(anime.id);
                  }
                }}
                className={`flex flex-col items-center text-sm lg:text-base rounded-sm overflow-hidden group ${
                  isRecent
                    ? "cursor-pointer"
                    : anime.status === "Completed" || anime.status === "Ongoing"
                    ? " cursor-pointer"
                    : " cursor-not-allowed"
                }`}
              >
                <div className="h-full w-full rounded-sm overflow-hidden relative">
                  <img
                    src={anime.image}
                    alt={anime.title?.english}
                    className="h-full w-full object-cover object-center group-hover:scale-105 ease-in-out duration-300"
                  />
                  {/* hover */}
                  <div
                    className="hidden bg-transparent group-hover:bg-zinc-900/70 absolute top-0 left-0 w-full h-full 
                    lg:flex justify-center items-center transition-all duration-200"
                  >
                    <FaPlay
                      className=" text-transparent group-hover:text-orange-500 text-3xl lg:text-4xl group-hover:block 
                transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="w-full text-left dark:text-gray-300 py-2 flex flex-col group-hover:brightness-75">
                  <span className="dark:text-white text-sm font-semibold line-clamp-1">
                    {anime.title?.english === null
                      ? anime.title?.userPreferred
                      : anime.title?.english}
                  </span>
                  <div className=" flex gap-2 text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                    <span>{anime.type}</span>
                    <span>•</span>
                    {isRecent ? (
                      <span>
                        {!isNaN(anime.currentEpisode)
                          ? `Episode: ${anime.currentEpisode}`
                          : "Not Available"}
                      </span>
                    ) : (
                      <span>
                        {anime.status === "Completed" ||
                        anime.status === "Ongoing"
                          ? `EPS: ${anime.totalEpisodes}`
                          : anime.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </HoverCardTrigger>
            {isRecent ? (
              <HoverCardContent
                side="right"
                align="end"
                className="bg-zinc-100/90 dark:bg-zinc-800/90 border dark:border-none w-[300px]"
              >
                <div className="w-full flex justify-between space-x-4 text-gray-900 dark:text-gray-200">
                  <div className="space-y-1 flex flex-col gap-2 text-sm">
                    <h1 className="text-base font-semibold text-orange-400 leading-5 line-clamp-2">
                      {anime.title?.english === null
                        ? anime.title?.userPreferred
                        : anime.title?.english}
                    </h1>
                    <div className="flex items-center justify-between text-sm">
                      <div className="inline-flex items-center gap-2">
                        <span className="inline-flex items-center gap-[2px]">
                          <AiFillLike className=" text-blue-500" />
                          {anime.rating === null ? 0 : anime.rating}
                        </span>
                        <span className="bg-gray-400 text-gray-100 dark:bg-zinc-200 dark:text-gray-900 text-xs px-2 rounded-sm">
                          HD
                        </span>
                      </div>
                      <span className="bg-gray-400 text-gray-100 dark:bg-zinc-200 dark:text-gray-900 text-xs px-2 rounded-sm">
                        {anime.type}
                      </span>
                    </div>
                    {/* description */}
                    <p className="text-xs w-full text-gray-500 dark:text-gray-400 leading-4 line-clamp-3">
                      {anime.episodeTitle === null
                        ? `Episode: ${anime.episodeNumber}`
                        : anime.episodeTitle
                            ?.replace(/<\/?i\s*\/?>/g, "")
                            .replace(/<\/?br\s*\/?>/g, "")}
                    </p>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          Other Name:{" "}
                        </span>
                        {anime.title?.native}, {anime.title?.romaji}
                        {", "}
                        {anime.title.userPreferred}
                      </span>
                      <span className="text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          Latest Episode:{" "}
                        </span>
                        {anime.episodeNumber || anime.currentEpisode}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Genres:{" "}
                        {anime.genres.map((genre, index) => (
                          <span
                            key={index}
                            className="text-gray-900 dark:text-gray-200"
                          >
                            {genre}
                            {index !== anime.genres?.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </span>
                    </div>
                    <button
                      onClick={() => handleNavigation(anime)}
                      className={`py-2 rounded-full font-semibold flex justify-center items-center gap-2 bg-orange-400/90 text-gray-800 hover:bg-orange-400 ease-in-out duration-200`}
                    >
                      <PiTelevisionBold size={20} />
                      <span>WATCH NOW</span>
                    </button>
                  </div>
                </div>
              </HoverCardContent>
            ) : (
              <HoverCardContent
                side="right"
                align="end"
                className="bg-zinc-100/90 dark:bg-zinc-800/90 border dark:border-none w-[300px]"
              >
                <div className="w-full flex justify-between space-x-4 text-gray-900 dark:text-gray-200">
                  <div className="space-y-1 flex flex-col gap-2 text-sm">
                    <h1 className="text-base font-semibold text-orange-400 leading-5 line-clamp-2">
                      {anime.title?.english === null
                        ? anime.title?.userPreferred
                        : anime.title?.english}
                    </h1>
                    <div className="flex items-center justify-between text-sm">
                      <div className="inline-flex items-center gap-2">
                        <span className="inline-flex items-center gap-[2px]">
                          <AiFillLike className=" text-blue-500" />
                          {anime.rating}
                        </span>
                        <span className="inline-flex items-center gap-[2px]">
                          <AiFillStar className=" text-yellow-500" />
                          {anime.popularity}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="bg-gray-400 text-gray-100 dark:bg-zinc-200 dark:text-gray-900 text-xs px-2 rounded-sm">
                          HD
                        </span>
                        <span className="bg-gray-400 text-gray-100 dark:bg-zinc-200 dark:text-gray-900 text-xs px-2 rounded-sm">
                          {anime.type}
                        </span>
                      </div>
                    </div>
                    {/* description */}
                    <p className="text-xs w-full text-gray-500 dark:text-gray-400 leading-4 line-clamp-3">
                      {anime.description
                        ?.replace(/<\/?i\s*\/?>/g, "")
                        .replace(/<\/?br\s*\/?>/g, "")}
                    </p>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          Other Name:{" "}
                        </span>
                        {anime.title?.native}, {anime.title?.romaji}
                        {", "}
                        {anime.title.userPreferred}
                      </span>
                      <span className="text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          Release Date:{" "}
                        </span>
                        {anime.releaseDate}
                      </span>
                      <span className="text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          Status:{" "}
                        </span>
                        {anime.status}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Genres:{" "}
                        {anime.genres.map((genre, index) => (
                          <span
                            key={index}
                            className="text-gray-900 dark:text-gray-200"
                          >
                            {genre}
                            {index !== anime.genres?.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (
                          anime.status === "Completed" ||
                          anime.status === "Ongoing"
                        ) {
                          handleNavigation(anime);
                        }
                      }}
                      className={`py-2 rounded-full font-semibold flex justify-center items-center gap-2 ${
                        anime.status === "Completed" ||
                        anime.status === "Ongoing"
                          ? "bg-orange-400/90 text-gray-800 hover:bg-orange-400 ease-in-out duration-200"
                          : "bg-zinc-300 dark:bg-zinc-700 cursor-not-allowed"
                      }`}
                    >
                      <PiTelevisionBold size={20} />
                      <span>WATCH NOW</span>
                    </button>
                  </div>
                </div>
              </HoverCardContent>
            )}
          </HoverCard>
        );
      })}
    </>
  );
};
