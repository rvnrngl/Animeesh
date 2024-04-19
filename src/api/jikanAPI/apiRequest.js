import apiService from "@/services/apiService";

export const fetchTopTenAnimeAiring = async () => {
  const res = await apiService.get(`/top/anime?filter=airing&limit=10`);
  return res.data;
};
