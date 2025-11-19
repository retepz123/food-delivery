import express from 'express';
import User from '../model/user-schema.js';

const router = express.Router();

router.post('/check-username', async (req, res ) => {
  try{
    const { username } = req.body;
     const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
  } catch (err){
     console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
})

export default router;