import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_PROD;

export const apiService = axios.create({
  baseURL: BASE_URL,
});
