import { UseFetchUserInfo } from "@/hooks/UseFetchUserInfo";
import React from "react";
import { useNavigate } from "react-router-dom";

export const UserWatchList = () => {
  const navigate = useNavigate();
  const userInfo = UseFetchUserInfo();
  const { watchList } = userInfo;

  const handleNavigation = (id, type) => {
    window.localStorage.setItem("type", type);
    if (id) {
      navigate(`/watch/${id}`);
    } else {
      console.log("No id found!");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-zinc-800 p-4 rounded-md shadow-sm">
      {watchList?.length > 0 ? (
        <div className="w-full grid grid-cols-1">
          {watchList?.map((anime, index) => {
            return (
              <button
                key={index}
                onClick={() => handleNavigation(anime.animeID, "watchlist")}
                className="w-full cursor-pointer flex items-center justify-start bg-zinc-800 gap-3 p-2 hover:brightness-125"
              >
                <div className=" flex-shrink-0 w-[50px] lg:w-[60px] bg-zinc-700">
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex w-full h-full items-start justify-start flex-col">
                  <h1 className="lg:text-lg line-clamp-1 text-zinc-300">
                    {anime.title}
                  </h1>
                  <p className="text-zinc-500 text-sm">
                    Current Epsiode: {anime.currentEpisodeNumber}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-xl text-zinc-500 font-semibold">Empty watchlist.</p>
      )}
    </div>
  );
};
