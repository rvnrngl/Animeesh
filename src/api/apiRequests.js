// api calls
import axios from "axios";
import { META } from "@consumet/extensions";

const anilist = new META.Anilist();
const url = import.meta.env.VITE_API;

// fetching anime using normal search method
const fetchSearch = async (query, page, perPage) => {
  const response = await anilist.search(query, page, perPage);
  return response;
};

// fetching anime using advanced search method
const fetchAdvancedSearch = async (
  query,
  type,
  page,
  perPage,
  format,
  sort,
  genres,
  id,
  year,
  status,
  season
) => {
  const response = await anilist.advancedSearch(
    query,
    type,
    page,
    perPage,
    format,
    sort,
    genres,
    id,
    year,
    status,
    season
  );
  return response;
};

// fetch recent episode
const fetchRecent = async (provider, pageNumber, itemsPerPage) => {
  const res = await axios.get(
    `${url}/api/recent?provider=${provider}&pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}`
  );

  if (res.data?.hasOwnProperty("retry")) {
    return res.data;
  }

  return res;
};

// fetch trending anime
const fetchTrending = async () => {
  const response = await anilist.fetchTrendingAnime();
  return response;
};

// fetch anime info of anilist and enime api
const fetchAnime = async (id) => {
  const res = await axios.get(`${url}/api/info?id=${id}`);
  return { anime: res.data, episode: res.data.episodes };
};

// fetch episodes's streaming url
const fetchEpisodeUrl = async (episodeId) => {
  const res = await axios.get(`${url}/api/episode?id=${episodeId}`);
  const sources = res.data.sources;
  const [defaultUrl] = sources.filter((source) => source.quality === "default");
  return { data: res.data, url: defaultUrl.url };
};

export {
  fetchSearch,
  fetchAdvancedSearch,
  fetchRecent,
  fetchTrending,
  fetchAnime,
  fetchEpisodeUrl,
};
