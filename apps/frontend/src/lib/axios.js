import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://backend-food-delivery-5jnh.onrender.com/api',
  withCredentials: true,
});