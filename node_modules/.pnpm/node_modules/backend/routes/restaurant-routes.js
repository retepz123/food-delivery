import express from 'express';
import { createRestaurant, getByIdRestaurant, getMyMenuOwner, getMyRestaurant} from '../controller/restaurant-controller.js';
import { protectedMiddleware } from '../middleware/protected-middleware.js';
import { isAdmin, isOwner } from '../middleware/restaurant-middleware.js';
import { fetchAllMenu, menuItems, removeMenu } from '../controller/menuItems-controller.js';
import { getAllRestaurant } from '../controller/admin-controll.js';
import upload from '../cloudinary/multer-middleware.js';
import { createOrder } from '../controller/order-controller.js';
import { allItemCart, createCart, deleteItem } from '../controller/cartcontroller.js';

const router = express.Router();

//owner
router.post('/restaurant', upload.single('image'), protectedMiddleware, isOwner, createRestaurant);
router.get('/myrestaurant', protectedMiddleware, getMyRestaurant);
router.get('/restaurant/menuItems/:id', getByIdRestaurant);

//menu
router.post('/menuItems', upload.single('image'), protectedMiddleware, isOwner, menuItems);
router.get('/restaurant/menu', protectedMiddleware, getMyMenuOwner);
router.get('/fetchAllMenu', fetchAllMenu);
router.delete('/remove/:id', protectedMiddleware, removeMenu);

//admin only
router.get('/all', protectedMiddleware, isAdmin, getAllRestaurant );

//order
router.post('/createOrder', protectedMiddleware, createOrder);
//cart
router.post('/cart', protectedMiddleware, createCart);
router.get('/allCart', protectedMiddleware, allItemCart);
router.delete('/delete/:id', protectedMiddleware, deleteItem);



export default router;