import mongoose, { Schema } from "mongoose";

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  image: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  address: {
    type: String,
  },

  phone: {
    type: String,
  },

  category: [String], // "Filipino", "Fast Food", etc.

  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
    }
  ],

  deliveryFee: {
    type: Number,
    default: 0,
  },

  minimumOrder: {
    type: Number,
    default: 0,
  },

  rating: {
    type: Number
  },

  schedule: {
    mon: { open: { type: String }, close: { type: String }, closed: { type: Boolean } },
    tue: { open: { type: String }, close: { type: String }, closed: { type: Boolean } },
    wed: { open: { type: String }, close: { type: String }, closed: { type: Boolean } },
    thu: { open: { type: String }, close: { type: String }, closed: { type: Boolean } },
    fri: { open: { type: String }, close: { type: String }, closed: { type: Boolean } },
    sat: { open: { type: String }, close: { type: String }, closed: { type: Boolean } },
    sun: { open: { type: String }, close: { type: String }, closed: { type: Boolean } },
  },

  isOpen: {
    type: Boolean,
    default: true,
  },

  tags: [String], // "popular", "promo", etc.

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
