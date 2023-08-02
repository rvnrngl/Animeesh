import React, { useEffect, useState } from "react";
import axios from "axios";

export const Search = () => {
  const [search, setSearch] = useState("");
  const [animeData, setAnimeData] = useState([]);

  const getAnime = async () => {
    try {
      const url = `https://api.jikan.moe/v4/anime?q=${search}&sfw&limit=10`;
      const response = await fetch(url);
      const resData = await response.json();
      setAnimeData(resData.data);
      console.log(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnime();
  }, [search]);

  return (
    <>
      <div className=" w-[500px] h-[70px] bg-gray-600 shadow-lg rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for anime..."
          className="w-full h-full p-5 text-xl text-black"
        />
        <button className="">Search</button>
      </div>
      {/* Display animeData here */}
      {animeData.length ? (
        <ul>
          {animeData.map((anime, index) => (
            <li key={index}>
              <p className="text-white text-lg py-2 w-[500px] text-center bg-gray-600 mb-2">
                {anime.title}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No anime found.</p>
      )}
      <p className="text-white text-lg py-2 w-[500px] text-center bg-gray-600">
        hi
      </p>
    </>
  );
};
