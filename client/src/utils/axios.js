import axios from 'axios';

const API = axios.create({
  // REPLACE this with your actual Render URL
  baseURL: 'https://Scrubandmore.onrender.com' 
});

export default API;