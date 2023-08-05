import React from "react";
import { Slider } from "./Slider";

export const Recommendation = ({ animeRecommendation }) => {
  return (
    <>
      <Slider animeList={animeRecommendation} reLoad={true} />
    </>
  );
};
