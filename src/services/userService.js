import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_USER_PROD;

export const userService = axios.create({
  baseURL: BASE_URL,
});
