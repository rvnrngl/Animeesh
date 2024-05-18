import { apiService } from "@/services/apiService";

export const getAnimeDetail = async (id) => {
  try {
    const { data } = await apiService.get(`/meta/anilist/info/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching anime detail: ", error);
    throw error;
  }
};

export const getEpisodeUrl = async (id) => {
  try {
    const { data } = await apiService.get(`/anime/gogoanime/watch/${id}`);

    const defaultSource = data.sources?.find(
      (item) => item.quality === "default"
    );

    // If default source not found, will provide the first source url
    if (!defaultSource) {
      return data.sources[0].url;
    }

    return defaultSource.url;
  } catch (error) {
    console.error("Error fetching episode URL: ", error);
    throw error;
  }
};
