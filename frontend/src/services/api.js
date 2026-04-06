import axios from 'axios';

const api = axios.create({
  baseURL: "https://hotel-management-hvth.onrender.com"
});

export default api;