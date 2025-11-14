import User from '../model/user-schema.js';

export async function validateLogin(req, res, next) {
  try {
    const { username, password } = req.body;

    //find user
    const user = await User.findOne({ username });
    if(!user){
      return res.status(400).json({ message: 'Username cannot find'});
    }

    if(password !== user.password){
      return res.status(400).json({ message: 'Invalid Credentials'});
    }

    req.user = user;
    next();

  } catch (error) {
      console.error('Error in fetching data', error);
    return res.status(500).json({ message: 'Internal Server Error in login Middleware'});
  }
}