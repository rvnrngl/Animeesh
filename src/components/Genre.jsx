import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const genreList = [
  "Action",
  "Adventure",
  "Cars",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

export const Genre = ({ closeMenu, type }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const handleSelectedGenres = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((index) => index !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleFilter = () => {
    sessionStorage.setItem("genreList", JSON.stringify(selectedGenres));
    closeMenu();
    setSelectedGenres([]);
    if (window.location.hash === "#/genres") {
      window.location.reload();
      window.scrollTo({ top: 0 });
    } else {
      navigate("/genres");
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      {/* mobile breakpoint */}
      <ul
        className="lg:hidden w-full grid grid-cols-2 gap-2 text-gray-500 
    dark:text-gray-500 text-sm"
      >
        {genreList.map((genre, index) => {
          return (
            <li
              key={index}
              onClick={() => handleSelectedGenres(genre)}
              className={
                selectedGenres.includes(genre)
                  ? "text-orange-400 font-semibold"
                  : "text-gray-900 dark:text-gray-500"
              }
            >
              {genre}
            </li>
          );
        })}
      </ul>
      <button
        disabled={selectedGenres.length < 1 ? true : false}
        onClick={handleFilter}
        className={`lg:hidden flex items-center justify-center gap-1 border p-[3px] px-3 rounded-sm ${
          selectedGenres.length < 1
            ? "bg-zinc-300 text-gray-500 dark:bg-zinc-800 dark:text-gray-600"
            : "bg-orange-400 text-gray-900"
        }`}
      >
        <FiFilter />
        <span>Filter</span>
      </button>
      {/* laptop/pc breakpoint */}
      <ul
        className="hidden w-full lg:grid grid-cols-6 gap-1 text-gray-500 
    dark:text-gray-500 text-sm"
      >
        {genreList.map((genre, index) => {
          return (
            <li
              key={index}
              onClick={() => handleSelectedGenres(genre)}
              className={`flex items-center gap-1 cursor-pointer ${
                selectedGenres.includes(genre)
                  ? "text-orange-400 font-semibold"
                  : "text-gray-900 dark:text-gray-500"
              }`}
            >
              <input
                id={type === "laptop" ? genre : genre + index}
                type="checkbox"
                className="accent-orange-400"
                checked={selectedGenres.includes(genre) ? true : false}
                readOnly
              />
              <span>{genre}</span>
            </li>
          );
        })}
      </ul>
      <button
        disabled={selectedGenres.length < 1 ? true : false}
        onClick={handleFilter}
        className={`hidden lg:flex items-center justify-center text-xs gap-1 border p-2 rounded-sm ${
          selectedGenres.length < 1
            ? "bg-zinc-300 text-gray-500 dark:bg-zinc-700 dark:text-gray-600 cursor-not-allowed"
            : "bg-orange-400 text-gray-900"
        }`}
      >
        <FiFilter size={10} />
        <span>Filter</span>
      </button>
    </>
  );
};
