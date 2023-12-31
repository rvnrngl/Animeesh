import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSearch = () => {
    if (input.trim() !== "") {
      const searchUrl = `/search?keyword=${encodeURIComponent(input)}&page=1`;
      navigate(searchUrl);
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
        className="w-full dark:text-gray-200 border border-zinc-400/50 
        dark:border-transparent dark:bg-zinc-800 rounded-sm py-1 px-3"
      >
        <input
          ref={inputRef}
          id="search"
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
        className="py-[6px] px-3 text-sm text-gray-900 dark:text-gray-800 bg-orange-400 rounded-sm"
      >
        Search
      </button>
    </div>
  );
};
