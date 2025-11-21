import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

function RestaurantMenu() {
  const { id } = useParams(); // restaurantId from URL
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axiosInstance.get(`/restaurant/menuItems/${id}`);
        setMenu(res.data.menu);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenu();
  }, [id]);

  return (
    <div>
     <nav className='border border-red-500 w-full'>
       <div className='flex justify-between p-5 w-[90%]'>
        <h1>Logo</h1>
        <button onClick={() => navigate('/addMenu')} >Add Menu</button>
      </div>
     </nav>
      <h1>Menu for Restaurant</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
         {menu.map(item => (
        <div key={item._id}>
          <div className=''>
            <img src={item.image} alt={item.name} />
          </div>
          <h3>{item.name}</h3>
          <p>{item.category}</p>
          <p>₱{item.price}</p>
         
        </div>
      ))}
      </div>
    </div>
  );
}

export default RestaurantMenu;
