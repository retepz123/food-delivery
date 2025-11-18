import express from 'express';
import { createRestaurant, getMyMenuOwner, getMyRestaurant} from '../controller/restaurant-controller.js';
import { protectedMiddleware } from '../middleware/protected-middleware.js';
import { isAdmin, isOwner } from '../middleware/restaurant-middleware.js';
import { menuItems } from '../controller/menuItems-controller.js';
import { getAllRestaurant } from '../controller/admin-controll.js';

const router = express.Router();

//owner
router.post('/restaurant', protectedMiddleware, isOwner, createRestaurant);
router.post('/menuItems', protectedMiddleware, isOwner, menuItems);
router.get('/myrestaurant', protectedMiddleware, getMyRestaurant);
router.get('/restaurant/menu', protectedMiddleware, getMyMenuOwner);

//admin only
router.get('/all', protectedMiddleware, isAdmin, getAllRestaurant );



export default router;