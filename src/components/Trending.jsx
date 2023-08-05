import React, { useEffect, useState } from "react";
import { META } from "@consumet/extensions";

import { Slider } from "./Slider";

export const Trending = () => {
  const anilist = new META.Anilist();

  const [trendingAnime, setTrendingAnime] = useState([]);

  const getTrendingAnime = async () => {
    await anilist.fetchTrendingAnime().then((data) => {
      setTrendingAnime(data.results);
    });
  };

  useEffect(() => {
    getTrendingAnime();
  }, []);

  return (
    <>
      <Slider animeList={trendingAnime} reLoad={false} />
    </>
  );
};
