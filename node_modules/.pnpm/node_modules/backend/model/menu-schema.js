import mongoose, { Schema } from 'mongoose';

const menuItemSchema = new Schema ({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },

  isAvalaible: {
    type: Boolean,
    default: true,
  },
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;