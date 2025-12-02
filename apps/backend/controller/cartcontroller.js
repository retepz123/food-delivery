import Cart from '../model/cartschema.js';

export async function createCart(req, res){
  try {
    const { menuItemId, name, price, image, restaurantId } = req.body;

    const cartItem = new Cart ({
      user: req.user._id,
      menuItem: menuItemId,
      name,
      price,
      image,
      restaurant: restaurantId,
      quantity: 1,
    });

    await cartItem.save();
    return res.status(200).json({ message: 'Item added to Cart', cartItem});

  } catch (error){
    console.error('Cart Add Error:', error);
    return res.status(500).json({ message: 'Failed to add item to cart' });
  }
}

//fetch all user add to cart Items
export async function allItemCart(req, res) {
  try {
    const cartItems = await Cart.find({ user: req.user._id}).populate('menuItem restaurant');
    console.log('Cart Items', cartItems);
  
    return res.status(200).json({ cartItems })

  } catch (error){
    console.error('Error in fetching the cart', error);
    return res.status(500).json({ message: 'Internal Server Error in fetching the cart'});
  }
}

//detele the item
export async function deleteItem(req, res){
    try {
      const deleteOrder = await Cart.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Order Delete'});
    } catch (error){
      console.error('Error', error);
      return res.status(500).json({ message: 'Internal Server Error'});
    }
}