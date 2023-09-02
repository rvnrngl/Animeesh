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

// fetch recent episode
const fetchRecent = async (provider, pageNumber, itemsPerPage) => {
  const response = await anilist.fetchRecentEpisodes(
    provider,
    pageNumber,
    itemsPerPage
  );
  return response;
};

// fetch trending anime
const fetchTrending = async () => {
  const response = await anilist.fetchTrendingAnime();
  return response;
};

// fetch anime info of anilist and enime api
const fetchAnime = async (id) => {
  const anilistRes = await anilist.fetchAnimeInfo(id);
  const enimeRes = await axios.get(
    `https://api.enime.moe/mapping/anilist/${id}`
  );
  return { anilistRes, episode: enimeRes.data.episodes };
};

// fetch episodes's streaming url
const fetchEpisodeUrl = async (epsId) => {
  const urlEps = await axios.get(`https://api.enime.moe/source/${epsId}`);
  return urlEps.data.url;
};

// fetch enime id using anilist id
const fetchEnimeId = async (provider, epsId) => {
  const response = await axios.get(
    `https://api.enime.moe/enime/mapping/${provider}/${epsId}`
  );
  console.log(response.data.episodes);
  return response.data.episodes;
};

export {
  fetchSearch,
  fetchAdvancedSearch,
  fetchRecent,
  fetchTrending,
  fetchAnime,
  fetchEpisodeUrl,
  fetchEnimeId,
};
