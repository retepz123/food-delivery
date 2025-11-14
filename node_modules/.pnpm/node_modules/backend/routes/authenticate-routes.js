import express from 'express';
import { validateSignUp } from '../middleware/signup-middleware.js';
import { signUp } from '../controller/signup-controller.js';

const router = express.Router();

router.post('/register', validateSignUp, signUp);


export default router;