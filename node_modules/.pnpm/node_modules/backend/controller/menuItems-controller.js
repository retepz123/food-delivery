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