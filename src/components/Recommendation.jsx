import React from "react";
import { Slider } from "./Slider";

export const Recommendation = ({ recommendations }) => {
  const filteredAnime = recommendations?.filter(
    (anime) =>
      anime.type === "TV" ||
      anime.type === "TV_SHORT" ||
      anime.type === "MOVIE" ||
      anime.type === "OVA" ||
      anime.type === "SPECIAL"
  );
  return (
    <>
      <Slider animeList={filteredAnime} type="recommendation" />
    </>
  );
};
