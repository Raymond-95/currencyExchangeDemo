import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.frankfurter.app',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
