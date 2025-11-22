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
     <nav className='w-full'>
       <div className='bg-[#FF4F00] flex justify-between p-5 w-full'>
        <h1 className='pl-10'>Logo</h1>
        <div className='pr-10'>
        <button className='text-white cursor-pointer text-xl bg-blue-500 w-32' onClick={() => navigate(`/addMenu/${id}`)} >Add Menu</button>

        </div>
      </div>
     </nav>
     <div className='w-full flex justify-center'>
      <h1 className='text-2xl pt-5'>Menu for Restaurant</h1>

     </div>
        <div className='w-full h-screen pt-20'>
          <div className='flex justify-center'>
               <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-[90%]'>
         {menu.map(item => (
        <div key={item._id} className=' flex flex-col justify-center p-6'>
          <div className=''>
            <img src={item.image} alt={item.name} className='w-auto'/>
          </div>
          <div className='pt-5 items-center'>
             <h3 className='font-bold text-base'>{item.name}</h3>
          <p>{item.category}</p>
          <p>₱{item.price}</p>
          </div>
         
        </div>
      ))}
      </div>
          </div>
        </div>
    </div>
  );
}

export default RestaurantMenu;
