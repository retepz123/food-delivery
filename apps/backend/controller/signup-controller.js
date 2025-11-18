import User from '../model/user-schema.js';
import jwt from 'jsonwebtoken';

export async function signUp(req, res){
  try {
    const { username, email, password, role } = req.body;

    //only customer and owner
    let userRole = role;
    if (!['customer', 'owner'].includes(role)){
      userRole = 'customer';
    }

    const newUser = await User.create({ username, email, password, role: userRole});
    return res.status(200).json({ message: 'Successfully Created',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      },
    })

  } catch (error){
    console.error('creating account failed', error);
    return res.status(500).json({ message: 'Internal server error in sign up'})
  }
}