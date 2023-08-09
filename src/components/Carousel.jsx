import { Link, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";

import axios from "axios";

import { PiTelevisionBold } from "react-icons/pi";

import { META } from "@consumet/extensions";

export const Carousel = () => {
  const anilist = new META.Anilist();
  const [popularAnime, setPopularAnime] = useState([]);
  const navigate = useNavigate();

  const getPopularAnime = async () => {
    anilist.fetchPopularAnime().then((data) => {
      setPopularAnime(data.results);
    });
  };

  useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <>
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
        {popularAnime.map((anime, index) => {
          return (
            <SwiperSlide
              key={anime.id}
              className="flex flex-col justify-end items-start text-white transition-all duration-300 cursor-grab"
            >
              {/* image bg */}
              <div className="absolute w-full h-full brightness-75 border-gray-900/10 top-0 left-0 -z-[1]">
                <img
                  src={anime.cover}
                  alt={anime.title.english}
                  className="h-full w-full object-cover object-center hidden lg:block"
                />
                <img
                  src={anime.image}
                  alt={anime.title.english}
                  className="w-full object-cover object-center lg:hidden"
                />
              </div>
              {/* anime description */}
              <div className="w-full flex flex-col px-3 lg:px-9 py-8 bg-gradient-to-b from-transparent to-zinc-900/90">
                <span className="text-orange-400">#{index + 1} Top Anime</span>
                <p className="w-3/4 lg:w-2/4 text-lg font-semibold lg:text-3xl break-words leading-5">
                  {anime.title.english}
                </p>
                <div className="flex items-center gap-2 text-[10px] lg:text-base text-white/90 font-thin">
                  <p>Type: {anime.type}</p>
                  <p>Episodes: {anime.totalEpisodes}</p>
                  <p>
                    Rating:{" "}
                    <span className=" font-semibold">{anime.rating}</span>
                  </p>
                </div>
                <div
                  className="text-[10px] lg:text-base text-white/90 font-thin max-h-[40px] lg:max-h-[75px] 
                w-3/4 lg:w-2/4 break-words leading-3 overflow-hidden mt-1"
                >
                  <p className="lg:hidden">
                    {anime.description
                      .replace(/<\/?i\s*\/?>/g, "")
                      .replace(/<\/?br\s*\/?>/g, "")
                      .slice(0, 140) + "..."}
                  </p>
                  <p className="hidden lg:block">
                    {anime.description
                      .replace(/<\/?i\s*\/?>/g, "")
                      .replace(/<\/?br\s*\/?>/g, "")
                      .slice(0, 250) + "..."}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-900 text-sm lg:text-lg mt-3">
                  <button
                    onClick={() => {
                      navigate("/watch", {
                        state: { anime },
                      });
                    }}
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
    </>
  );
};
