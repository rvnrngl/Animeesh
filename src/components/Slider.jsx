import React from "react";
import { useNavigate } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export const Slider = ({ animeList, reLoad, type }) => {
  const navigate = useNavigate();
  const handleNavigation = (anime) => {
    if (reLoad) {
      window.localStorage.setItem("type", type);
      navigate(window.location.reload(), { state: { anime } });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.localStorage.setItem("type", type);
      navigate("/watch", { state: { anime } });
      window.scrollTo({ top: 0, behavior: "smooth" });
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
                    className="hidden lg:flex absolute left-0 top-0 w-[35px] h-full font-bold text-lg 
                  justify-center bg-gradient-to-b from-zinc-500/90 to-zinc-900/90 text-gray-200"
                  >
                    {index < 9 ? <p>0{index + 1}</p> : <p>{index + 1}</p>}
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
