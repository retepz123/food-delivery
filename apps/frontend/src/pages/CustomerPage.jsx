  import { useEffect, useState } from 'react';
  import { axiosInstance } from '../lib/axios';
  import { useCart } from '../components/CartContext';
  import { Link } from 'react-router-dom';
  import logo from '../Images/foodlogo.png';

  function CustomerPage() {
    const [fetchAllMenu, setFetchAllMenu] = useState([]);
    const { addToCart, cart } = useCart();
    // console.log("Cart:", cart);

    useEffect(() => {
      const fetchAll = async () => {
        try {
          const res = await axiosInstance.get('/fetchAllMenu', {
            withCredentials: true,
          });
          setFetchAllMenu(res.data.menus || []);
        } catch (error) {
          console.error(error);
        }
      };

      fetchAll();
    }, []);

    async function HandleAddToCart(menuItem){
      try {
        const res = await axiosInstance.post('/cart', {
           menuItemId: menuItem._id,
          name: menuItem.name,
          price: menuItem.price,
          image: menuItem.image,
          restaurantId: menuItem.restaurant._id,
        },
        { withCredentials: true }
      );

      console.log('Added to cart:', res.data);
      alert('Item added to cart!');

      } catch (error){
        console.error('Failed to add to cart:', error.response?.data || error);
      alert('Failed to add item to cart.');
      }
    }

    return (
      <div className='bg-[#E6614D]'>
        <div className=' flex justify-between p-5'>
          <img src={logo} alt='logo' className='w-25 h-25 rounded-md' />
          <Link to='/checkout' className='text-white text-xl font-bold cursor-pointer'>Checkout</Link>

        </div>
        <div className='grid grid-cols-4 gap-y-7 gap-x-5 p-5 place-content-center'>
          {fetchAllMenu.length > 0 ? (
            fetchAllMenu.map((menu) => (
              <div className='flex justify-center bg-[#E5E4E2] rounded-sm'>
                <div key={menu._id}  className='w-[70%] flex flex-col items-center h-auto p-5 '>
                <img 
                  src={menu.image} 
                  alt={menu.name}
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />

                <div className='pt-5 '>
                  <span><strong>{menu.name}</strong></span><br />
                  <span>Category: {menu.category}</span><br />
                  <span>₱{menu.price}</span><br></br>
                  <button type='submit'className='bg-yellow-400 cursor-pointer w-full' onClick={() => HandleAddToCart(menu)}>Add to Cart</button>
                </div>
              </div>
                </div>
            ))
          ) : (
            <p>No menu items available</p>
          )}
        </div>
      </div>
    );
  }

  export default CustomerPage;
