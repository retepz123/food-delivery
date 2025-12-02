import mongoose, { Schema, Types } from 'mongoose';

const orderSchema = new Schema ({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [{
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
    },
    quantity: Number,
  }],
  total: Number,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;