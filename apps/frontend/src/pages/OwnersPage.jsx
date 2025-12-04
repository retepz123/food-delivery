import { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { initSocket, socket } from '../lib/sokcet';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Images/foodlogo.png';

function OwnersPage() {
  const [restaurant, setRestaurant] = useState(null);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try{
        const res = await axiosInstance.get('/myrestaurant', {withCredentials: true});
        setRestaurant(res.data.restaurant);
      } catch (error){
        console.error(error);
      }
    };
    fetchRestaurants();
  }, [] )

   useEffect(() => {
    const newSocket = initSocket();
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to Socket.IO', newSocket.id);
    });
    newSocket.on('newOrder', (order) => {
       console.log('New order received:', order);
    });
    return ()=>{
      newSocket.disconnect();
    };
   }, []);

   const handleViewMenu = (restaurant) => {
    navigate(`/restaurant/${restaurant._id}/menu`);
  };
  
  return (
  
      <div>
        <nav className='bg-[#E6614D] w-full px-6 py-4 flex justify-between items-center'>
            <img src={logo} alt='logo' className='w-25 h-25 rounded-md' />
           
          <div className='flex justify-evenly w-96 text-white'> 
            <span>Home</span>
            <span>Profile</span>
            <span>Logout </span>
            <Link to={'/createRestaurant'} >Register</Link>
          </div>
        </nav>
        
        <div className='bg-[#E6614D]'>
          <h1 className='text-center h-20 pt-5 text-3xl text-white font-bold'>My Restaurant</h1>
        <div className='flex justify-center '>
            <section className='w-[85%] h-auto p-5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
               {restaurant && restaurant.length > 0 ? (
  restaurant.map((r) => (
    <div key={r._id} className="flex flex-col bg-[#E5E4E2] p-5 w-96 h-auto rounded-sm">
      <img src={r.image} alt={r.name} className='rounded-sm' />
      <div className='flex flex-col pt-5'>
        <span className='font-bold'>{r.name}</span>
        <span>{r.address}</span>
        <span>{r.category}</span>
        <span>{r.rating}</span>
        <span>{r.phone}</span>
        <span className='bg-blue-200 w-32'>#{r.tags}</span>
      </div>
     <button className='cursor-pointer' onClick={() => handleViewMenu(r)}>Menu</button>
    </div>
  ))
  ) : (
    <p>No restaurant found</p>
  )}
         
            </div>
          </section>
        </div>
        </div>
      </div>
 
  );
}

export default OwnersPage;