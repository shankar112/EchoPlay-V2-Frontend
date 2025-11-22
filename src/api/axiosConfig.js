// src/api/axiosConfig.js
import axios from 'axios';

// This is your LIVE backend URL
const API_BASE_URL = 'https://echoplay-v2-backend.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;