import express from 'express';
import { createRestaurant, getByIdRestaurant, getMyMenuOwner, getMyRestaurant} from '../controller/restaurant-controller.js';
import { protectedMiddleware } from '../middleware/protected-middleware.js';
import { isAdmin, isOwner } from '../middleware/restaurant-middleware.js';
import { menuItems } from '../controller/menuItems-controller.js';
import { getAllRestaurant } from '../controller/admin-controll.js';
import upload from '../cloudinary/multer-middleware.js';

const router = express.Router();

//owner
router.post('/restaurant', upload.single('image'), protectedMiddleware, isOwner, createRestaurant);
router.post('/menuItems', upload.single('image'), protectedMiddleware, isOwner, menuItems);
router.get('/myrestaurant', protectedMiddleware, getMyRestaurant);
router.get('/restaurant/menu', protectedMiddleware, getMyMenuOwner);
router.get('/restaurant/menuItems/:id', getByIdRestaurant);

//admin only
router.get('/all', protectedMiddleware, isAdmin, getAllRestaurant );



export default router;