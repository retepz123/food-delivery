import Restaurant from '../model/restaurant-schema.js';

export async function createRestaurant(req, res) {
  console.log('Request user Id:', req.user.id);

  try {
    const ownerId = req.user.id;

    const { name, description, address, phone, category, rating, tags } = req.body;

    if (!name || !description || !address || !phone || !category || !rating || !tags) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // CloudinaryStorage sets 'path' as the uploaded URL
    const imageUrl = req.file?.path || '';

    const restaurant = await Restaurant.create({
      name,
      description,
      owner: ownerId,
      address,
      phone,
      category,
      rating,
      tags,
      image: imageUrl
    });

    return res.status(201).json({
      message: `Boss ${req.user.username}, Welcome to your Restaurant!`,
      restaurant
    });

  } catch (error) {
    console.error('Error creating restaurant:', error);
    return res.status(500).json({
      message: 'Internal Server Error in createRestaurant'
    });
  }
}
