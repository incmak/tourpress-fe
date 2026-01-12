import Axios from 'axios';

export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  withCredentials: true,
});
