import User from '../model/user-schema.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JSONWEB = process.env.KEY_SECRET_JWT;

export async function login(req, res) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ message: 'User cannot be found' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.KEY_SECRET_JWT,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      samSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: `Welcome Boss ${user.username}`,
      token,
      newUser: {
        _id: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error fetching the data', error);
    return res.status(500).json({ message: 'Internal server Error in login' });
  }
}
