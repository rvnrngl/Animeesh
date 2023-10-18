import axios from "axios";

export const getWatchlist = async () => {
  const userID = window.localStorage.getItem("userID");
  const url = import.meta.env.VITE_API;
  try {
    const { data } = await axios.get(`${url}/watch-list/infos/${userID}`);
    return data;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};
