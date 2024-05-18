import { userService } from "@/services/userService";

export const getWatchlist = async () => {
  const userID = window.localStorage.getItem("userID");
  try {
    const { data } = await userService.get(`/watch-list/${userID}`);
    return data;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};
