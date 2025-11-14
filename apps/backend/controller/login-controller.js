import User from '../model/user-schema.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JSONWEB = process.env.KEY_SECRET_JWT

export async function login(req, res) {
  try {
    const user = req.user;

    if(!user) {
      return res.status(400).json({ message: 'User cannot be found'});
    }

       const token = jwt.sign({ id: newUser._id, role: newUser.role},
      process.env.KEY_SECRET_JWT,
      { expiresIn: '7d'}
    );


  } catch (error) {

  }
}