import axios from "axios";

const apiService = axios.create({
  baseURL: import.meta.env.VITE_JIKAN_BASED_URL,
  timeout: 10000, // specify timeout if needed
});

export default apiService;
