import React from "react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { NotFound } from "./NotFound";
import { useNavigationById } from "@/hooks/UseNavigationById";

export const Slider = ({ animeList, type }) => {
  const navigate = useNavigationById();
  return (
    <>
      <div className="w-full">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          breakpoints={{
            641: {
              slidesPerView: 4,
            },
            769: {
              slidesPerView: 5,
            },
            1025: {
              slidesPerView: 6,
            },
            1281: {
              slidesPerView: 7,
            },
          }}
          className="mySwiper"
        >
          {animeList?.map((anime, index) => {
            return (
              <SwiperSlide
                key={index}
                className="h-[180px] xs:h-[240px] lg:h-[260px] xl:h-[300px] rounded-md cursor-pointer"
              >
                <div
                  className="h-full relative rounded-bl-md rounded-tr-md"
                  style={{
                    backgroundImage: `url("${anime.image}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  onClick={() => navigate(anime.id)}
                >
                  {/* badge */}
                  <div
                    className="lg:hidden absolute left-0 top-0 w-[30px] h-[30px] bg-orange-500 
                  flex justify-center items-center rounded-br-md text-xs lg:text-lg font-semibold"
                  >
                    {index < 9 ? <p>0{index + 1}</p> : <p>{index + 1}</p>}
                  </div>
                  <div
                    className="hidden lg:flex flex-col gap-2 absolute left-0 top-0 w-[35px] h-full font-bold text-sm 
                  justify-between items-center bg-gradient-to-b from-zinc-500/90 to-zinc-900/90 text-gray-200 pb-2"
                  >
                    {index < 9 ? (
                      <p className="text-2xl">0{index + 1}</p>
                    ) : (
                      <p className="text-2xl">{index + 1}</p>
                    )}
                    <p
                      className="h-full w-full -rotate-180 [writing-mode:vertical-lr] text-left pl-2
                      bg-gradient-to-t from-orange-100 to-orange-500/90 bg-clip-text text-transparent uppercase"
                    >
                      {type === "watchList" ? (
                        <span className="h-full line-clamp-1">
                          {anime.title}
                        </span>
                      ) : (
                        <span className="h-full line-clamp-1">
                          {anime.title?.english === null
                            ? anime.title?.userPreferred
                            : anime.title?.english}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};
