import express from 'express';
import { createRestaurant } from '../controller/restaurant-controller.js';
import { protectedMiddleware } from '../middleware/protected-middleware.js';
import { isOwner } from '../middleware/restaurant-middleware.js';

const router = express.Router();

router.post('/restaurant', protectedMiddleware, isOwner, createRestaurant);


export default router;