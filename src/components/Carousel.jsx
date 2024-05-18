import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { Autoplay, EffectCards, Pagination } from "swiper/modules";

import { useQuery } from "@tanstack/react-query";
import { getTopAnimeList } from "@/api/requestList";
import { useNavigationById } from "@/hooks/UseNavigationById";
import { CarouselLoader } from "@/Loaders/CarouselLoader";
import { removeTags } from "@/utils/removeTags";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

export const Carousel = () => {
  const navigate = useNavigationById();
  const [anime, setAnime] = useState(null);

  const { isPending, isError, data } = useQuery({
    queryKey: ["top-anime"],
    queryFn: async () => {
      const res = await getTopAnimeList(1, 10);
      return res.results;
    },
  });

  const defaultAnime = data ? data[0] : null;

  const handleSlideChange = (swiper) => {
    const currentAnime = data[swiper.activeIndex];
    setAnime(currentAnime);
  };

  if (isPending) {
    return <CarouselLoader />;
  }

  return (
    <>
      <div className="h-full w-full grid grid-cols-4 relative overflow-hidden rounded-sm shadow-lg">
        <div className="h-full hidden col-span-2 lg:flex flex-col gap-y-4 items-start justify-center px-5 z-10">
          <h1 className="text-6xl text-zinc-200 font-mono font-bold line-clamp-2">
            {anime ? anime.title?.english : defaultAnime.title?.english}
          </h1>
          <div className="inline-flex gap-x-2">
            <span className="px-2 bg-zinc-500 font-bold rounded-sm text-zinc-800 uppercase text-[8px] text-xs cursor-default">
              {anime ? anime.status : defaultAnime.status}
            </span>
            <span className="px-2 bg-zinc-500 font-bold rounded-sm text-zinc-800 uppercase text-[8px] text-xs cursor-default">
              {anime ? anime.type : defaultAnime.type}
            </span>
            <span className="px-2 bg-zinc-500 font-bold rounded-sm text-zinc-800 uppercase text-[8px] text-xs cursor-default">
              EPS {anime ? anime.totalEpisodes : defaultAnime.totalEpisodes}
            </span>
          </div>
          <p className="text-zinc-400 line-clamp-4 text-justify">
            {removeTags(anime ? anime.description : defaultAnime.description)}
          </p>
          <Link
            to={`/watch/${anime ? anime.id : defaultAnime.id}`}
            className="bg-orange-400/90 py-3 px-10 uppercase text-2xl font-mono font-bold rounded-md text-gray-800 flex items-center justify-center gap-x-3 hover:bg-orange-400"
          >
            <FaPlay />
            Play Now
          </Link>
        </div>
        <div className="col-span-full lg:col-span-2 z-10">
          <div className="w-full h-full flex items-center justify-center p-5 relative">
            <Swiper
              effect={"cards"}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, EffectCards, Pagination]}
              onSlideChange={handleSlideChange}
              className="mySwiper w-[230px] lg:w-[320px] h-full"
            >
              {data.map((anime, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    onClick={() => navigate(anime.id)}
                    className="flex items-center justify-center rounded-md text-lg font-bold text-white brightness-75"
                  >
                    <img
                      src={anime.image}
                      alt={anime.id}
                      className="w-full h-full"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <img
          src={anime ? anime.cover : defaultAnime.cover}
          alt={anime ? anime.id : defaultAnime.id}
          className="absolute hidden lg:block w-full h-full top-0 left-0 bg-cover opacity-20 z-0"
        />
      </div>
    </>
  );
};
