import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_USER_PROD
    : import.meta.env.VITE_API_USER_LOCAL;

export const userService = axios.create({
  baseURL: BASE_URL,
});
