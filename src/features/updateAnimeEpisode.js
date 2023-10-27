import axios from "axios";

export const updateAnimeEpisode = async (
  userID,
  animeID,
  currentEpisodeNumber
) => {
  const url = import.meta.env.VITE_API;

  try {
    const { data } = await axios.put(`${url}/watch-list/update`, {
      userID,
      animeID,
      currentEpisodeNumber,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
