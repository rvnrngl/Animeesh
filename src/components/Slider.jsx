import React from "react";
import { useNavigate } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";

export const Slider = ({ animeList }) => {
  const navigate = useNavigate();
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
                key={anime.id}
                className="h-[180px] xs:h-[240px] lg:h-[260px] xl:h-[300px] rounded-md cursor-pointer"
                onClick={() => {
                  navigate("/watch", {
                    state: { anime },
                  });
                }}
              >
                <div
                  className="h-full relative rounded-bl-md rounded-tr-md"
                  style={{
                    backgroundImage: `url("${anime.image}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* badge */}
                  <div
                    className="absolute left-0 top-0 w-[30px] h-[30px] bg-orange-500 
                  flex justify-center items-center rounded-br-md text-xs lg:text-lg font-semibold"
                  >
                    {index > 9 ? <p>0{index + 1}</p> : <p>{index + 1}</p>}
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
