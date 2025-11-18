import Restaurant from '../model/restaurant-schema.js';
import User from '../model/user-schema.js';

export async function createRestaurant(req, res) {
  console.log('Request user Id:', req.user.id);

  try {
    const user = req.user;
    const ownerId = req.user.id;

    const {
      name,
      description,
      image,
      address,
      phone,
      category,
      deliveryFee,
      rating,
      isOpen,
      tags
    } = req.body;

    const restaurant = await Restaurant.create({
      name,
      description,
      image,
      owner: ownerId,  // secure owner
      address,
      phone,
      category,
      deliveryFee,
      rating,
      isOpen,
      tags
    });

    return res.status(201).json({
      message: `Boss ${user.username}, Welcome to your Restaurant!`,
      restaurant
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'Internal Server Error in createRestaurant'
    });
  }
}
