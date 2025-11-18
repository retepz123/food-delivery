import User from '../model/user-schema.js';

export async function validateSignUp(req, res, next){
  try{
    const { username, email, password, role } = req.body;

    //validate username and password
    if(!username || !password || !email){
      return res.status(400).json({ message: 'Fields are required'})
    }

    if(password.length < 5){
      return res.status(400).json({ message: 'Password atleast 5 characters'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid E-mail format'});
    }

    const exisitingEmail = await User.findOne({ email });
    if (exisitingEmail) {
      return res.status(400).json({ message: 'E-mail already exist'});
    }

    const existingUser = await User.findOne({ username });
    if(existingUser) {
      console.log('⚠️ Already exist Username');
      return res.status(400).json({ message: 'Username already exist'});
    }

    next();

  } catch (error) {
     console.error('Error in validate Sign Up', error);
    return res.status(500).json({ message: 'Internal Server Error in Sign up middleware'});
    }
  }
