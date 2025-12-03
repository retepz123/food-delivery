import MenuItem from '../model/menu-schema.js';
import Restaurant from '../model/restaurant-schema.js';

export async function menuItems(req, res) {
  try{
        const { restaurant, name, price, category, isAvailable } = req.body;

    if(!restaurant){
       return res.status(404).json({ message: "Owner has no restaurant yet" });
    }

     const imageUrl = req.file?.path || '';

     console.log('Form data:', req.body);
console.log('Uploaded file:', req.file);


    const items = await MenuItem.create({
      restaurant,
      name,
      price: Number(price),
      image: imageUrl,
      category,
      isAvailable: isAvailable ?? true
    });

    return res.status(200).json({ message: 'Successfully created a Menu', items});

  } catch (error){
     console.error('Error:', error);
    return res.status(500).json({
      message: 'Internal Server Error in Menu Items'
    });
  }
}

export async function fetchAllMenu(req, res) {
  try {
    const menus = await MenuItem.find().populate('restaurant');
    return res.status(200).json({ message: 'All menu items fetch successfully', menus,})

  } catch (error){
     console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error in Get All Menus" });
  }
}

export async function removeMenu(req, res){
  try {
    const remove = await MenuItem.findByIdAndDelete(req.params.id);
    if (!remove ){
      return res.status(400).json({ message: 'Cannot find the Id'})
    }
    return res.status(200).json({ message: 'Successfully deleted'})

  } catch (error){
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}