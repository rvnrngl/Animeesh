import React, { useState, useEffect } from "react";
import { Cards } from "../components/Cards";
import { Carousel } from "../components/Carousel";
import { Trending } from "../components/Trending";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAdvancedSearch } from "@/api/apiRequests";
import { getWatchlist } from "@/features/getWatchlist";

export const Home = () => {
  const [recentAnime, setRecentAnime] = useState([]);
  const [userWatchList, setUserWatchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  useEffect(() => {
    getRecentAnime(1, 50, year);
  }, []);

  //get recent anime episodes
  const getRecentAnime = async (pageNumber, itemsPerPage, year) => {
    try {
      const { results } = await fetchAdvancedSearch(
        undefined,
        "ANIME",
        pageNumber,
        itemsPerPage,
        undefined,
        ["UPDATED_AT_DESC"],
        undefined,
        undefined,
        year,
        "RELEASING",
        undefined
      );
      const filteredAnime = results?.filter(
        (anime) =>
          anime.type === "TV" ||
          anime.type === "TV_SHORT" ||
          anime.type === "MOVIE" ||
          anime.type === "OVA" ||
          anime.type === "SPECIAL"
      );
      setRecentAnime(filteredAnime);
      setIsLoading(false);

      const watchList = await getWatchlist();
      setUserWatchList(watchList);
    } catch (error) {
      console.log(error);
    }
  };

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
        {/* UserWatchlist Animes container */}
        {userWatchList.length > 0 ? (
          <div className="w-full mt-[15px]">
            <div className="w-full flex items-center justify-between mb-4  dark:text-gray-300">
              <span className="text-lg lg:text-2xl lg:font-semibold">
                My Favourites
              </span>
              <Link
                to={`/user/watch-list`}
                className="text-[10px] xs:text-xs md:text-base lg:text-base text-gray-500 dark:text-gray-400 flex items-center gap-1 
            hover:text-gray-900 dark:hover:text-gray-100 ease-in-out duration-200"
              >
                <span className="uppercase">View more</span>
                <MdNavigateNext />
              </Link>
            </div>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
              <Cards animeList={userWatchList} type={"watchlist"} />
            </div>
          </div>
        ) : (
          ""
        )}
        {/* Recent Updated Animes container */}
        <div className="w-full mt-[15px]">
          <div className="w-full flex items-center justify-between mb-4  dark:text-gray-300">
            <span className="text-lg lg:text-2xl lg:font-semibold">
              Recent Updated
            </span>
            <Link
              to={`/recent/page/${1}`}
              className="text-[10px] xs:text-xs md:text-base lg:text-base text-gray-500 dark:text-gray-400 flex items-center gap-1 
            hover:text-gray-900 dark:hover:text-gray-100 ease-in-out duration-200"
            >
              <span className="uppercase">View more</span>
              <MdNavigateNext />
            </Link>
          </div>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
            {isLoading ? (
              Array.from({ length: 10 }, (_, index) => {
                return (
                  <div
                    key={index}
                    className="h-[300px] flex flex-col items-start gap-1"
                  >
                    <Skeleton className="w-full h-full rounded-sm bg-zinc-200 dark:bg-zinc-800"></Skeleton>
                    <Skeleton className="w-2/4 h-3 rounded-none bg-zinc-200 dark:bg-zinc-800"></Skeleton>
                    <Skeleton className="w-3/4 h-3 rounded-none bg-zinc-200 dark:bg-zinc-800"></Skeleton>
                  </div>
                );
              })
            ) : (
              <Cards animeList={recentAnime} type={"recent"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
