// socket.js (frontend)
import { io } from 'socket.io-client';

const token = localStorage.getItem('token'); // your JWT
export const socket = io('http://localhost:3000', {
  auth: {
    token: token,
  },
  transports: ['websocket'],
  withCredentials: true, // optional if you use cookies
});

export const initSocket = () => {
  const token = localStorage.getItem('token');
  return io('http://localhost:3000', {
    auth: { token: token, },
    transports: ['websocket'],
    withCredentials: true,
  });
};