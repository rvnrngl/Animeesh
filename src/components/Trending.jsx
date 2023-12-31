import React, { useEffect, useState } from "react";
import { META } from "@consumet/extensions";

import { Slider } from "./Slider";

import { Skeleton } from "@/components/ui/skeleton";
import { fetchTrending } from "@/api/apiRequests";

export const Trending = () => {
  const anilist = new META.Anilist();

  const [trendingAnime, setTrendingAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTrendingAnime = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTrending();
      setTrendingAnime(data.results);
    } catch (error) {
      console.error("Error fetching trending anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrendingAnime();
  }, []);

  return (
    <>
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
        <Slider animeList={trendingAnime} type={"home"} />
      )}
    </>
  );
};
