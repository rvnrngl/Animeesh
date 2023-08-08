import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { META } from "@consumet/extensions";

export const Search = ({ onSearchedData }) => {
  const anilist = new META.Anilist();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getAnime = async (input) => {
    setIsLoading(true);
    await anilist
      .search(input)
      .then((data) => {
        onSearchedData(data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearch = () => {
    if (input.trim() !== "") {
      localStorage.setItem("inputValue", input);
      getAnime(input);
      window.location.reload();
    } else {
      console.log("Enter any keyword");
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="w-full flex items-center gap-2">
      <div
        className="w-full dark:text-gray-200 border border-gray-500 
        dark:border-none dark:bg-zinc-700/90 rounded-sm py-1 px-3"
      >
        <input
          type="text"
          value={input}
          placeholder="Search anime..."
          className="w-full text-sm bg-transparent outline-none"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnterKeyPress}
        />
      </div>
      <button
        onClick={handleSearch}
        className="py-[6px] px-3 text-sm bg-zinc-600 rounded-sm"
      >
        Search
      </button>
    </div>
  );
};
