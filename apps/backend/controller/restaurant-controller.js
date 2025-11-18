import Restaurant from '../model/restaurant-schema.js';
import MenuItem from '../model/menu-schema.js';
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

//get all the restaurant of the owner
export async function getMyRestaurant(req, res){
  try {
    const user = req.user;
    const ownerId = req.user._id;

    const restaurant = await Restaurant.findOne({ owner: ownerId });

    if (!restaurant){
      return res.status(400).json({ message: 'You don`t have a Restaurant'});
    }

    return res.status(200).json({ message: `My Restaurant, ${user.username}`, restaurant});

  } catch (error) {
    console.error("Error fetching owner's restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//get the menu of the restaurant
export async function getMyMenuOwner(req, res){
  try{
    const ownerId = req.user._id;

    const restaurant = await Restaurant.findOne({ owner: ownerId });

    if (!restaurant){
      return res.status(400).json({ message: 'You don`t have a Restaurant'});
    }

    const menuItems = await MenuItem.find({ restaurant: restaurant._id });

    if (!menuItems){
      return res.status(400).json({ message: 'You dont have Menu yet'});
    }

    return res.status(200).json({ message: 'Menu Items fetched successfully', menuItems});

  } catch(error) {
    console.error("Error fetching menu items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}