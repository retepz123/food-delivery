import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema ({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  role: {
    type: String,
    enum: ['customer', 'owner', 'admin'],
    default: 'customer',
  },
   phone: {
      type: String,
    },
    addresses: [
      {
        label: String,
        street: String,
        city: String,
        province: String,
        zip: String,
      },
    ],
}, {timestamps: true} );

const User = mongoose.model('User', userSchema);

export default User;