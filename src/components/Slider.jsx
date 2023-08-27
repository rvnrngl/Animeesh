import React from "react";
import { useNavigate } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export const Slider = ({ animeList, type }) => {
  const navigate = useNavigate();
  const handleNavigation = (anime) => {
    window.localStorage.setItem("type", type);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (anime.title?.english !== null) {
      navigate(
        `/watch/${anime.title?.english
          .replace(/[-:]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase()}`,
        { state: { anime } }
      );
    } else {
      navigate(
        `/watch/${anime.title?.userPreferred
          .replace(/[-:]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase()}`,
        { state: { anime } }
      );
    }
  };

  return (
    <>
      <div className="w-full">
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            641: {
              slidesPerView: 3,
            },
            769: {
              slidesPerView: 4,
            },
            1025: {
              slidesPerView: 5,
            },
            1281: {
              slidesPerView: 6,
            },
          }}
          className="mySwiper"
        >
          {animeList.map((anime, index) => {
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
                  onClick={() => handleNavigation(anime)}
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
                      <span className="h-full line-clamp-1">
                        {anime.title?.english === null
                          ? anime.title?.userPreferred
                          : anime.title?.english}
                      </span>
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
