import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { META } from "@consumet/extensions";

export const Search = ({ onSearchedData }) => {
  const anilist = new META.Anilist();
  const [input, setInput] = useState("");
  const [anime, setAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAnime = async (input) => {
    setIsLoading(true);
    await anilist
      .search(input)
      .then((data) => {
        setAnime(data.results);
        onSearchedData(data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearch = () => {
    if (input.trim() !== "") {
      getAnime(input);
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      <div className="w-full max-w-[640px] p-2 px-10 flex justify-center items-center gap-2">
        <input
          type="text"
          value={input}
          placeholder="Search anime..."
          className="w-full text-gray-900 text-sm lg:text-base py-2 px-5 border border-gray-500 dark:border-none outline-none rounded-full"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnterKeyPress}
        />
        <button
          onClick={handleSearch}
          className="p-2 lg:p-3 text-xl lg:text-lg rounded-full bg-gray-600"
        >
          <ImSearch />
        </button>
      </div>
      {/* <span className="mb-3 lg:text-lg">
        Search Results Found: <span>{anime.length}</span> items
      </span> */}
    </>
  );
};
