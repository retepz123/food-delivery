import express from 'express';
import process from 'node:process';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import authenticateRoute from './routes/authenticate-routes.js';
import restaurantRoutes from './routes/restaurant-routes.js';
import validateUsername from './routes/validateUsername-routes.js';
import cloudinaryRoutes from './routes/cloudinary-routes.js';
import User from './model/user-schema.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//connect to mongoDB
async function connectDB (){
  try {
    await mongoose.connect(process.env.URL_DB);
    console.log('✅ Connected Succesfully');
  } catch (error){
    console.error('😓✖️ Unable to connect')
  }
}
connectDB();

//cors connect to frontend
app.use(cors({
  origin: ['http://localhost:5173', 'https://backend-food-delivery-5jnh.onrender.com'],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.set('port', PORT);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

//routes
app.use('/api/auth', authenticateRoute);
app.use('/api', validateUsername);
app.use('/api', restaurantRoutes );
app.use('/api', cloudinaryRoutes);

//create server and socket io server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token; // from frontend
    if (!token) return next(new Error('Authentication error'));

    const decoded = jwt.verify(token, process.env.KEY_SECRET_JWT);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return next(new Error('User not found'));

    socket.user = user; // attach user to socket
    next();
  } catch (err) {
    console.error(err);
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('User Connected:', socket.user.username);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.user.username);
  });
});


server.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
