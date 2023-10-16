import axios from "axios";

export const removeToWatchlist = async (anime) => {
  const userID = window.localStorage.getItem("userID");
  const { id } = anime;
  const url = import.meta.env.VITE_API;

  try {
    const { data } = await axios.put(`${url}/watch-list/remove`, {
      userID,
      animeID: id,
    });

    return data.message;
  } catch (error) {
    console.log(error);
  }
};
