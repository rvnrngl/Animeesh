import React, { useEffect, useState } from "react";
import { Cards } from "../components/Cards";
import { META } from "@consumet/extensions";
import ReactPaginate from "react-paginate";

import { Skeleton } from "@/components/ui/skeleton";

export const RecentAnime = () => {
  const anilist = new META.Anilist();
  const [recentAnime, setRecentAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    hasNextPage: false,
    totalPages: 0,
    totalResults: 0,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getRecentAnime("gogoanime", 1, 30);
  }, []);

  const getRecentAnime = async (provider, pageNumber, itemsPerPage) => {
    setIsLoading(true);
    try {
      const data = await anilist.fetchRecentEpisodes(
        provider,
        pageNumber,
        itemsPerPage
      );
      setRecentAnime(data.results);
      const limit = 250;
      const dataTotalResults = data.totalResults;
      if (dataTotalResults > limit) {
        // limit total results to 100 items
        setPagination({
          currentPage: data.currentPage,
          hasNextPage: data.hasNextPage,
          totalPages: Math.ceil(
            (data.totalResults - (data.totalResults - limit)) / 30
          ),
          totalResults: data.totalResults - (data.totalResults - limit),
        });
      } else {
        setPagination({
          currentPage: data.currentPage,
          hasNextPage: data.hasNextPage,
          totalPages: data.totalPages,
          totalResults: data.totalResults,
        });
      }
    } catch (error) {
      console.error("Error fetching recent anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (data) => {
    if (data.selected + 1 !== pagination.currentPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getRecentAnime("gogoanime", data.selected + 1, 30);
    }
  };

  return (
    <div className="w-screen min-h-screen dark:bg-zinc-900 dark:text-gray-300">
      <div className="w-full h-full pt-5 px-4 flex flex-col gap-8 justify-center items-center">
        {/* Title */}
        {isLoading === true ? (
          <div className="w-full flex flex-col xs:flex-row gap-1 justify-between items-center px-4 lg:mt-4">
            <Skeleton className="w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px] h-3 xs:h-4 sm:h-5 md:h-6 lg:h-7 rounded-sm"></Skeleton>
            <Skeleton className="w-[50px] sm:w-[100px] h-3 xs:h-4 sm:h-5 md:h-6 lg:h-7 rounded-sm"></Skeleton>
          </div>
        ) : (
          <div className="w-full flex flex-col xs:flex-row gap-1 justify-between items-center px-4 lg:mt-4">
            <span className="text-xs xs:text-base sm:text-lg md:text-xl lg:text-3xl font-semibold lg:font-bold">
              Recent Updated Anime
            </span>
            <span className="text-gray-600 dark:text-gray-400 text-[10px] xs:text-xs sm:text-sm lg:text-base font-thin">
              {pagination.totalResults} Total Results
            </span>
          </div>
        )}
        {/* items */}
        <div className="w-full flex flex-col gap-5 lg:gap-10 lg:px-2">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
            {isLoading === true ? (
              Array.from({ length: 20 }, (_, index) => {
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
          {/* paginate */}
          <ReactPaginate
            breakLabel="..."
            nextLabel="next"
            previousLabel="prev"
            pageCount={pagination.totalPages}
            pageRangeDisplayed={3}
            marginPagesDisplayed={3}
            renderOnZeroPageCount={null}
            onPageChange={handlePageChange}
            className="w-full text-xs xs:text-sm dark:text-gray-300 flex justify-center items-center gap-1 xs:gap-2 md:gap-3 lg:gap-4 p-2 mb-20"
            pageClassName="border border-zinc-300 dark:border-zinc-600 rounded-sm group overflow-hidden"
            previousClassName="mr-2 border border-zinc-300 dark:border-zinc-600 rounded-sm group uppercase"
            nextClassName="ml-2 border border-zinc-300 dark:border-zinc-600 rounded-sm group uppercase"
            pageLinkClassName="w-[15px] h-[15px] xs:w-[20px] xs:h-[20px] sm:w-[35px] sm:h-[35px] 
            flex justify-center items-center h-full group-hover:font-semibold group-hover:bg-gradient-to-b from-transparent to-slate-800/10 
            dark:group-hover:bg-gradient-to-b from-transparent to-slate-400/40 ease-in-out duration-200"
            previousLinkClassName="w-[30px] h-[15px] xs:w-[35px] xs:h-[20px] sm:w-[50px] sm:h-[35px] 
            flex justify-center items-center h-full group-hover:font-semibold group-hover:bg-gradient-to-b from-transparent to-slate-800/10 
            dark:group-hover:bg-gradient-to-b from-transparent to-slate-400/40 ease-in-out duration-200"
            nextLinkClassName="w-[30px] h-[15px] xs:w-[35px] xs:h-[20px] sm:w-[50px] sm:h-[35px] 
            flex justify-center items-center h-full group-hover:font-semibold group-hover:bg-gradient-to-b from-transparent to-slate-800/10 
            dark:group-hover:bg-gradient-to-b from-transparent to-slate-400/40 ease-in-out duration-200"
            activeClassName="bg-zinc-700 dark:bg-zinc-400"
            activeLinkClassName="text-gray-100 dark:text-gray-900"
          />
        </div>
      </div>
    </div>
  );
};
