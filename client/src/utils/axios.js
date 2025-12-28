import axios from "axios";

const api = axios.create({
  baseURL: "https://scrubandmore.onrender.com/api",
  withCredentials: true,
});

export default api;
