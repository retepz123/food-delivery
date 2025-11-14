import express from 'express';
import { validateSignUp } from '../middleware/signup-middleware.js';
import { signUp } from '../controller/signup-controller.js';
import { validateLogin } from '../middleware/login-middleware.js';
import { login } from '../controller/login-controller.js';

const router = express.Router();

router.post('/register', validateSignUp, signUp);
router.post('/login', validateLogin, login);


export default router;