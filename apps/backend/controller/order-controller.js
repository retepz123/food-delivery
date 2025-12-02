import Order from '../model/addToCart-schema.js';


export async function createOrder(req, res) {
  try {
    const { items, total } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      total,
    });

    return res.status(200).json({ message: 'Order Created', order});

  } catch (error){
    console.error('Error in Order', error);
    return res.status(500).json({ message: 'Internal server Error in order'});
  }
}