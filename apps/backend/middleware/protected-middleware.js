import jwt from 'jsonwebtoken';
import User from '../model/user-schema.js';

export async function protectedMiddleware(req, res, next){
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: 'No token provided'});
    }

    const decoded = jwt.verify(token, process.env.KEY_SECRET_JWT);

    req.user = await User.findById(decoded.id).select('-password')
    next();

  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error in protected Middlware' });
  }
}