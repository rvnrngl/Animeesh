import React, { useState } from "react";
import { Search } from "../components/Search";
import { useNavigate } from "react-router-dom";

// react icons
import { FaPlay } from "react-icons/fa";

export const SearchAnime = () => {
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const navigate = useNavigate();

  const handleSearchedData = (data) => {
    if (data.length > 0) {
      setIsFetched(true);
      setSearchedAnime(data);
    } else {
      setIsFetched(false);
    }
  };

  const handleNavigation = (anime) => {
    navigate("/watch", { state: { anime } });
  };

  return (
    <div className="w-screen min-h-screen dark:bg-zinc-800 dark:text-gray-300">
      <div className="w-full h-full pt-[90px] px-4 flex flex-col gap-4 justify-center items-center">
        {/* search container */}
        <Search onSearchedData={handleSearchedData} />
        {/* items to be search */}
        <div className="w-full px-4">
          <div
            className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
          lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {searchedAnime.map((anime, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleNavigation(anime)}
                  className="w-full h-full flex flex-col cursor-pointer group rounded-sm overflow-hidden"
                >
                  <div className="w-full h-full relative overflow-hidden">
                    <img
                      src={anime.image}
                      alt={anime.title?.english}
                      className="w-full h-full object-cover"
                    />
                    {/* details */}
                    <div className="w-full absolute bottom-0 left-0 z-[2]">
                      <div className="relative">
                        <div className="h-[40px] w-full bg-gradient-to-b from-transparent to-zinc-700"></div>
                        <div className="text-sm p-2 flex items-center justify-between bg-zinc-700">
                          <span>
                            <span className="text-orange-400/90">EPS:</span>{" "}
                            {anime.totalEpisodes}
                          </span>
                          <span>{anime.type}</span>
                        </div>
                      </div>
                    </div>
                    {/* hover */}
                    <div
                      className="absolute w-full h-full top-[100%] left-0 flex justify-center items-center group-hover:top-0 
                  bg-gradient-to-b from-zinc-700/10 to-zinc-700 pointer-events-none ease-in-out duration-300 z-[1]"
                    >
                      <FaPlay
                        size={30}
                        className="text-orange-500 drop-shadow-lg"
                      />
                    </div>
                  </div>
                  {/* Title */}
                  <div className="lg:hidden w-full h-[50px] text-center">
                    {anime.title?.english === null
                      ? anime.title?.userPreferred?.length > 35
                        ? anime.title?.userPreferred.slice(0, 30) + "..."
                        : anime.title?.userPreferred
                      : anime.title?.english?.length > 35
                      ? anime.title?.english.slice(0, 30) + "..."
                      : anime.title?.english}
                  </div>
                  <div className="hidden lg:block w-full h-[50px] text-center">
                    {anime.title?.english === null
                      ? anime.title?.userPreferred?.length > 45
                        ? anime.title?.userPreferred.slice(0, 40) + "..."
                        : anime.title?.userPreferred
                      : anime.title?.english?.length > 45
                      ? anime.title?.english.slice(0, 40) + "..."
                      : anime.title?.english}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
