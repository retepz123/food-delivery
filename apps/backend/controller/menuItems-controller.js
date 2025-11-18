import MenuItem from '../model/menu-schema.js';
import Restaurant from '../model/restaurant-schema.js';

export async function menuItems(req, res) {
  try{
    const ownerId = req.user._id;

    const restaurant = await Restaurant.findOne({ owner: ownerId});
    if(!restaurant){
       return res.status(404).json({ message: "Owner has no restaurant yet" });
    }

    const { name, price, image, category, isAvailable } = req.body;

    const items = await MenuItem.create({
      restaurant: restaurant._id,
      name,
      price,
      image,
      category,
      isAvailable,
    });

    return res.status(200).json({ message: 'Successfully created a Menu', items});

  } catch (error){
     console.error('Error:', error);
    return res.status(500).json({
      message: 'Internal Server Error in Menu Items'
    });
  }
}