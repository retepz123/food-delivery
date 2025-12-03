import { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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
      <div className='flex justify-between p-5'>
          <h2>Checkout</h2>
      <button onClick={() => navigate('/customerPage')} className='cursor-pointer p-2 w-24 rounded-lg text-white bg-blue-500'>Back</button>
      </div>
    <div className='border border-black w-full h-screen flex justify-center'>
        {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className='border border-red-500 w-[50%]  grid grid-cols-[auto_auto_auto] gap-4 pt-10 font-sans'>
          {cartItems.map((item) => (
            
              <div key={item._id} className='border border-blue-500 w-48 text-center h-64 pt-10 bg'>
                <div className='flex justify-center'>
                   <img src={item.image} alt={item.name} style={{ width: '110px', marginRight: '1rem' }} />
                </div>
              <div className='pt-2' style={{ flex: 1 }}>
                <p className='font-bold'>{item.name}</p>
                <p className='text-gray-100'>Price: ₱{item.price}</p>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
              <button onClick={() => handleremoveItem(item._id)} className='bg-yellow-200 cursor-pointer w-32'>Remove</button>
              </div>
            
          ))}
        </div>
      )}
    </div>
      <div className='flex flex-col items-center text-lg h-40'>
           <h3>Total: ₱{totalPrice.toFixed(2)}</h3>
           <div className='pt-5'>
            <button className='bg-yellow-200 w-32'>Checkout</button>
           </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
