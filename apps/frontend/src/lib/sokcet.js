// socket.js (frontend)
import { io } from 'socket.io-client';

const token = localStorage.getItem('token'); // your JWT
export const socket = io('https://backend-food-delivery-5jnh.onrender.com', {
  auth: {
    token: token,
  },
  transports: ['websocket'],
  withCredentials: true, // optional if you use cookies
});

export const initSocket = () => {
  const token = localStorage.getItem('token');
  return io('https://backend-food-delivery-5jnh.onrender.com', {
    auth: { token: token, },
    transports: ['websocket'],
    withCredentials: true,
  });
};