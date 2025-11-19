import express from 'express';
import process from 'node:process';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import authenticateRoute from './routes/authenticate-routes.js'
import restaurantRoutes from './routes/restaurant-routes.js';

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
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
}));

app.set('port', PORT);
app.use(express.json());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

//routes
app.use('/api/auth', authenticateRoute);
app.use('/api', restaurantRoutes );


app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
