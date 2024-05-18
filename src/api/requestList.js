import { apiService } from "@/services/apiService";

export const getRecentAnimeList = async () => {
  try {
    const { data } = await apiService.get("/meta/anilist/recent-episodes");
    return data;
  } catch (error) {
    console.error("Error fetching recent anime list: ", error);
    throw error;
  }
};

export const getTopAnimeList = async (...args) => {
  try {
    const [page, pageNumber] = args;
    const { data } = await apiService.get(
      `/meta/anilist/popular?page=${page}&perPage=${pageNumber}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching top anime list: ", error);
    throw error;
  }
};
