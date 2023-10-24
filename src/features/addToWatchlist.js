import axios from "axios";

export const addToWatchlist = async (anime) => {
  const userID = window.localStorage.getItem("userID");
  const { id, title, image } = anime;
  const url = import.meta.env.VITE_API;
  const animeTitle =
    title.english === null ? title.userPreferred : title.english;

  try {
    const { data } = await axios.put(`${url}/watch-list/add`, {
      userID,
      animeID: id,
      title: animeTitle,
      image: image,
      currentEpisodeNumber: 1,
    });

    return data.message;
  } catch (error) {
    console.log(error);
  }
};
