import { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axiosInstance.get('/allCart', { withCredentials: true });
        setCartItems(res.data.cartItems || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  // calcute the price
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.price * (item.quantity || 1);
  }, 0);

  async function handleremoveItem(id){
    try {
      await axiosInstance.delete(`/delete/${id}`, {withCredentials: true });
      setCartItems(cartItems.filter((item) => item._id !== id));

    } catch (error){
      console.error('Error in removing the item', error);
    }
  }

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className='border border-red-500'>
          {cartItems.map((item) => (
            <div className='border border-green-500 grid-cols-4'>
              <div key={item._id} className='border border-blue-500' >
              <img src={item.image} alt={item.name} style={{ width: '80px', marginRight: '1rem' }} />
              <div style={{ flex: 1 }}>
                <p>{item.name}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
              <button onClick={() => handleremoveItem(item._id)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button style={{ padding: '10px 20px', marginTop: '1rem' }}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
