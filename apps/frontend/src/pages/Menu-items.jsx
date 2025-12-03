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

  async function handleRemove(id) {
    try {
      const res = await axiosInstance.delete(`/remove/${id}`, 
       { withCredentials: true},
       setMenu(menu.filter((item) => item._id !== id))
      ) 
    }catch (error) {
      console.error('Error in removing the item', error);
    }
  }

  return (
    <div className='bg-[#E6614D] w-full min-h-screen'>
     <nav className='w-full'>
       <div className='bg-[#E6614D] flex justify-between p-5 w-full'>
        <h1 className='pl-10'>Logo</h1>
        <div className='pr-10'>
        <button className='text-white cursor-pointer text-xl bg-blue-400 w-32 rounded-sm' onClick={() => navigate(`/addMenu/${id}`)} >Add Menu</button>

        </div>
      </div>
     </nav>
     <div className='w-full flex justify-center'>
      <h1 className='text-2xl pt-5 text-white'>Menu for Restaurant</h1>

     </div>
        <div className='pt-10'>
          <div className='w-full h-[100%] flex justify-center'>
               <div className=' grid grid-cols-3 gap-y-7 w-[80%]'>
         {menu.map(item => (
        <div key={item._id} className=' bg-[#E5E4E2] w-80 p-5 rounded-sm '>
          <div className=''>
            <img src={item.image} alt={item.name} className='w-auto h-64'/>
          </div>
          <div className='pt-5 items-center'>
             <h3 className='font-bold text-base'>{item.name}</h3>
          <p>{item.category}</p>
          <div className='flex justify-between'>
            <p>₱{item.price}</p>
            <button onClick={() => handleRemove(item._id)} type='submit'>❌</button>

          </div>
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
