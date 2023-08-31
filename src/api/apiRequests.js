// api calls
import axios from "axios";
import { META } from "@consumet/extensions";

const anilist = new META.Anilist();

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

// fetch trending anime
const fetchTrending = async () => {
  const response = await anilist.fetchTrendingAnime();
  return response;
};

// fetch anime info
const fetchAnime = async (id) => {
  const response = await anilist.fetchAnimeInfo(id);
  return response;
};

// fetch episodes's streaming url
const fetchEpisodeUrl = async (epsId) => {
  const url = `https://api.consumet.org/anime/gogoanime/watch/${epsId}`;
  // const responseType = await anilist.fetchEpisodeSources(epsId);
  // console.log(responseType);
  const response = await axios.get(url, {
    params: { server: "gogocdn" },
  });
  const sources = response.data.sources;
  let defaultSource = null;
  const hasDefaultQuality = sources.some(
    (source) => source.quality === "default"
  );
  if (hasDefaultQuality) {
    defaultSource = sources.find((source) => source.quality === "default");
  } else {
    defaultSource = sources.find((source) => source.quality === "backup");
  }
  return defaultSource;
};

export {
  fetchSearch,
  fetchAdvancedSearch,
  fetchTrending,
  fetchAnime,
  fetchEpisodeUrl,
};
