import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { PiTelevisionBold } from "react-icons/pi";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAdvancedSearch } from "@/api/apiRequests";
import { UseLoading } from "@/hooks/UseLoading";
import { fetchTopTenAnimeAiring } from "@/api/jikanAPI/apiRequest";

export const Carousel = () => {
  const [topAnime, setTopAnime] = useState([]);
  const { isLoading, startLoading, stopLoading } = UseLoading();
  const navigate = useNavigate();

  // get top 10 popular anime of this season
  // const getPopularAnime = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await fetchAdvancedSearch(
  //       undefined,
  //       "ANIME",
  //       1,
  //       10,
  //       undefined,
  //       ["POPULARITY_DESC"],
  //       undefined,
  //       undefined,
  //       year,
  //       undefined
  //     );
  //     setPopularAnime(data.results);
  //   } catch (error) {
  //     console.error("Error fetching popular anime:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const getTopAnime = async () => {
    startLoading();
    try {
      const response = await fetchTopTenAnimeAiring();
      setTopAnime(response.data);
    } catch (error) {
      stopLoading();
      console.error("Error fetching in fetchTopAnime:", error);
    } finally {
      stopLoading();
    }
  };

  const handleNavigate = (id) => {
    if (id) {
      navigate(`/watch/${id}`);
    } else {
      console.log("No id found!");
    }
  };

  useEffect(() => {
    // getPopularAnime();
    getTopAnime();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <Skeleton className="w-full bg-zinc-200 dark:bg-zinc-800 h-full flex flex-col justify-end items-start">
          <div className="w-full flex flex-col gap-3 px-3 lg:px-9 py-8">
            <Skeleton className="w-[50px] lg:w-[100px] h-3 lg:h-5 bg-zinc-400/50 dark:bg-zinc-700/50" />
            <Skeleton className="w-3/4 lg:w-2/4 h-4 lg:h-6 bg-zinc-400/50 dark:bg-zinc-700/50" />
            <Skeleton className="w-[150px] lg:w-[200px] h-3 lg:h-5 bg-zinc-400/50 dark:bg-zinc-700/50" />
            <Skeleton className="w-3/4 lg:w-2/4 h-10 lg:h-12 bg-zinc-400/50 dark:bg-zinc-700/50" />
            <Skeleton className="w-[40px] lg:w-[100px] h-3 lg:h-5 bg-zinc-400/50 dark:bg-zinc-700/50" />
          </div>
        </Skeleton>
      ) : (
        <Swiper
          loop="true"
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper w-full h-full text-sm lg:text-base rounded-lg"
        >
          {topAnime.map((anime, index) => {
            return (
              <SwiperSlide
                key={anime.mal_id}
                className="flex flex-col justify-end items-start text-white transition-all duration-300 cursor-grab"
              >
                {/* image bg */}
                <div className="absolute w-full h-full brightness-75 border-gray-900/10 top-0 left-0 -z-[1]">
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                {/* anime description */}
                <div className="w-full flex flex-col px-3 lg:px-9 py-8 bg-gradient-to-b from-transparent to-zinc-900/90">
                  <span className="text-orange-400">
                    #{index + 1} Top Anime
                  </span>
                  <p className="w-3/4 lg:w-2/4 text-lg font-semibold lg:text-3xl break-words leading-5">
                    {anime.title}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] lg:text-base text-white/90 font-thin">
                    <p>
                      Type: <span className=" font-semibold">{anime.type}</span>
                    </p>
                    <p>
                      Episodes:{" "}
                      <span className=" font-semibold">{anime.episodes}</span>
                    </p>
                    <p>
                      Rating:{" "}
                      <span className=" font-semibold">{anime.rating}</span>
                    </p>
                  </div>
                  <div
                    className="text-[10px] lg:text-base text-white/90 font-thin max-h-[40px] lg:max-h-[75px] 
              w-3/4 sm:w-2/4 break-words leading-3 overflow-hidden mt-1"
                  >
                    <p className="line-clamp-3">
                      {anime.synopsis
                        .replace(/<\/?i\s*\/?>/g, "")
                        .replace(/<\/?br\s*\/?>/g, "")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-900 text-sm lg:text-lg mt-3">
                    <button
                      onClick={() => handleNavigate(anime.mal_id)}
                      className="w-fit flex items-center gap-1 py-px px-2 font-semibold shadow-md 
              uppercase rounded-sm bg-orange-400 border-b border-orange-400 hover:text-gray-200
              duration-200 ease-out"
                    >
                      <PiTelevisionBold />
                      Play
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};
