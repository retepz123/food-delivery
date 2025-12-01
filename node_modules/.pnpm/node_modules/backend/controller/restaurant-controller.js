import Restaurant from '../model/restaurant-schema.js';
import MenuItem from '../model/menu-schema.js';

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


//get all the restaurant of the owner
export async function getMyRestaurant(req, res){
  try {
    const user = req.user;
    const ownerId = req.user._id;

      // console.log("REQ.FILE >>>", req.file); // ← IMPORTANT
      //  console.log("REQ.BODY >>>", req.body);

    const restaurant = await Restaurant.find({ owner: ownerId });

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

export async function getByIdRestaurant(req, res) {
  try {
    const { id } = req.params;
    const menu = await MenuItem.find({ restaurant: id});

    if (!menu || menu.length === 0) {
      return res.status(400).json({ message: 'Cannot find the Menu Id'});
    }

    return res.status(200).json({ message: 'Menu Found:', menu});

  } catch (error) {
     console.error('Error fetching ID:', error);
    return res.status(500).json({ message: 'Internal cannot found' });
  }
}