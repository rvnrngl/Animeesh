import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_PROD
    : import.meta.env.VITE_API_LOCAL;

export const apiService = axios.create({
  baseURL: BASE_URL,
});
