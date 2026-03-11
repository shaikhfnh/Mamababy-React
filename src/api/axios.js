import axios from "axios";

const api = axios.create({
  baseURL: "https://test.mamababyexpo.com/wp-json/wp/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
