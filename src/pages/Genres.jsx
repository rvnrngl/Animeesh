import React, { useEffect, useState } from "react";
import { Cards } from "../components/Cards";

import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { PaginateButtons } from "@/components/PaginateButtons";
import { fetchAdvancedSearch } from "@/api/apiRequests";

export const Genres = () => {
  const location = useLocation();
  const genreParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const queryGenre = genreParams.get("filter") || "";
  const encodedGenres = JSON.parse(decodeURIComponent(queryGenre)); // convert to array
  const page = genreParams.get("page");
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    hasNextPage: true,
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    if (queryGenre && page) {
      getAnimeList(page, 30, ["POPULARITY_DESC"], encodedGenres, "next");
    }
  }, [queryGenre, page]);

  useEffect(() => {
    setNextDisabled(pagination.hasNextPage ? false : true);
    setPrevDisabled(pagination.currentPage > 1 ? false : true);
  }, [pagination.hasNextPage, pagination.currentPage]);

  const getAnimeList = async (
    pageNumber,
    itemsPerPage,
    sort,
    genres,
    action
  ) => {
    setIsLoading(true);
    try {
      const data = await fetchAdvancedSearch(
        undefined,
        "ANIME",
        pageNumber,
        itemsPerPage,
        undefined,
        sort,
        genres,
        undefined,
        undefined,
        undefined,
        undefined
      );
      setAnimeList(data.results);
      if (action === "next") {
        setPagination({
          currentPage: data.currentPage,
          hasNextPage: data.hasNextPage,
        });
      } else {
        setPagination({
          currentPage: data.currentPage,
          hasNextPage: data.hasNextPage,
        });
      }
    } catch (error) {
      console.error("Error fetching anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-zinc-950 text-gray-300">
      <div className="w-full h-full pt-5 px-4 flex flex-col gap-8 justify-center items-center">
        {/* Title */}
        {isLoading === true ? (
          <div className="w-full flex flex-col gap-1 justify-between items-center px-4 lg:mt-4">
            <Skeleton className="w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px] h-3 xs:h-4 sm:h-5 md:h-6 lg:h-7 rounded-sm bg-zinc-200 dark:bg-zinc-800"></Skeleton>
            <Skeleton className="w-[50px] sm:w-[100px] h-3 xs:h-4 sm:h-5 md:h-6 lg:h-7 rounded-sm bg-zinc-200 dark:bg-zinc-800"></Skeleton>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-1 justify-between items-center px-4 lg:mt-4">
            <span className="text-center text-xs xs:text-base sm:text-lg md:text-xl lg:text-2xl font-semibold lg:font-bold">
              Genre:{" "}
              {encodedGenres.map((genre, index) => (
                <span key={index}>
                  {genre}
                  {index !== encodedGenres.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
            {animeList.length < 1 ? (
              ""
            ) : (
              <span className="text-gray-600 dark:text-gray-400 text-[10px] xs:text-xs sm:text-sm lg:text-base font-thin">
                Page:{" "}
                {pagination.currentPage < 10
                  ? "0" + pagination.currentPage
                  : pagination.currentPage}
              </span>
            )}
          </div>
        )}
        {/* items */}
        <div className="w-full flex flex-col gap-5 lg:gap-10 lg:px-2">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
            {isLoading === true ? (
              Array.from({ length: 12 }, (_, index) => {
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
              <Cards animeList={animeList} isRecent={false} />
            )}
          </div>
          {/* paginate */}
          {!isLoading && animeList.length > 0 ? (
            <PaginateButtons
              page={pagination.currentPage}
              hasNextPage={pagination.hasNextPage}
              next={nextDisabled}
              prev={prevDisabled}
              route={`/genres?filter=${encodeURIComponent(
                JSON.stringify(encodedGenres)
              )}&`}
            />
          ) : !isLoading && animeList.length < 1 ? (
            <span
              className="text-2xl lg:text-4xl font-bold text-center text-gray-600/80 
              col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 xl:col-span-6"
            >
              No Results Found
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
