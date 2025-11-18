import Restaurant from '../model/restaurant-schema.js';

export async function getAllRestaurant(req, res){
  try {
    const restaurants = await Restaurant.find();
    return res.status(200).json({ message: 'All Restaurants', total: restaurants.length, restaurants});

  } catch (error){
     console.error('Error fetching the restaurants:', err);
    return res.status(500).json({ message: 'failed to fetch restaurants'});

  }
}