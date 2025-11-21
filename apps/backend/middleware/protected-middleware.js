import jwt from 'jsonwebtoken';
import User from '../model/user-schema.js';

export async function protectedMiddleware(req, res, next){
  try {
   let token;
  //  console.log('Protected Middleware User:', req.user);

   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]

   } else if (req.cookies && req.cookies.token){
    token = req.cookies.token;
   }
   console.log('Request Token:', token);

   if (!token) {
    return res.status(400).json({ message: 'No token provided'});
   }
       const decoded = jwt.verify(token, process.env.KEY_SECRET_JWT);

    req.user = await User.findById(decoded.id).select('-password')

    if(!req.user) {
       return res.status(404).json({ message: 'User not found' });
    }
    next();

  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error in protected Middlware' });
  }
}