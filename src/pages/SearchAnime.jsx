import React, { useEffect, useRef, useState } from "react";
import { Search } from "../components/Search";
import { Skeleton } from "@/components/ui/skeleton";
import { Cards } from "../components/Cards";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { PaginateButtons } from "@/components/PaginateButtons";
import { fetchSearch } from "@/api/apiRequests";

export const SearchAnime = () => {
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const query = queryParams.get("keyword") || "";
  const page = parseInt(queryParams.get("page"));
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    hasNextPage: true,
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    if (query && page) {
      getSearchedAnime(page, 20, "next");
    }
  }, [query, page]);

  useEffect(() => {
    setNextDisabled(pagination.hasNextPage ? false : true);
    setPrevDisabled(pagination.currentPage > 1 ? false : true);
  }, [pagination.hasNextPage, pagination.currentPage]);

  const getSearchedAnime = async (pageNumber, itemsPerPage, action) => {
    setIsLoading(true);
    try {
      const data = await fetchSearch(query, pageNumber, itemsPerPage);
      setSearchedAnime(data.results);
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
      console.error("Error fetching searched anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-zinc-950 text-gray-300">
      <div className="w-full h-full pt-5 px-4 flex flex-col gap-6 lg:gap-10 justify-center items-center">
        {/* search container */}
        <div className="lg:hidden w-full px-4">
          <Search />
        </div>
        <div className="w-full flex justify-center items-center font-semibold lg:font-bold dark:text-zinc-300 px-4 lg:mt-4">
          {query === " " ? (
            <span className="text-xs xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-500">
              Search Anime...
            </span>
          ) : isLoading ? (
            <div className="w-full flex flex-col gap-1 justify-between items-center px-4 lg:mt-4">
              <Skeleton className="w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px] h-3 xs:h-4 sm:h-5 md:h-6 lg:h-7 rounded-sm bg-zinc-200 dark:bg-zinc-800"></Skeleton>
              <Skeleton className="w-[50px] sm:w-[100px] h-3 xs:h-4 sm:h-5 md:h-6 lg:h-7 rounded-sm bg-zinc-200 dark:bg-zinc-800"></Skeleton>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-1 justify-between items-center px-4 lg:mt-4">
              <span className="text-center text-xs xs:text-base sm:text-lg md:text-xl lg:text-2xl">
                Search Results for "{query}"
              </span>
              {searchedAnime.length < 1 ? (
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
        </div>

        {/* items */}
        <div className="w-full flex flex-col gap-5 lg:gap-10 lg:px-2">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
            {isLoading && query !== " " ? (
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
              <Cards animeList={searchedAnime} isRecent={false} />
            )}
          </div>
          {/* paginate */}
          {isLoading ? (
            ""
          ) : query !== " " && !isLoading && searchedAnime.length < 1 ? (
            <span
              className="text-2xl lg:text-4xl font-bold text-center text-gray-600/80 
              col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 xl:col-span-6"
            >
              No Results Found
            </span>
          ) : query && !isLoading && searchedAnime.length > 0 ? (
            <PaginateButtons
              page={pagination.currentPage}
              hasNextPage={pagination.hasNextPage}
              next={nextDisabled}
              prev={prevDisabled}
              route={`/search?keyword=${encodeURIComponent(query)}&`}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
