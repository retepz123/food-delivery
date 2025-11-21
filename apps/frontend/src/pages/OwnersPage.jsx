import { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { initSocket, socket } from '../lib/sokcet';
import { useNavigate } from 'react-router-dom';

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
    console.log("Clicked restaurant:", restaurant);
    console.log("ID:", restaurant._id);
    navigate(`/restaurant/${restaurant._id}/menu`);
  };
  
  return (
  
      <div>
        <nav className='w-full border-b border-gray-300 px-6 py-4 flex justify-between items-center'>
            <h1>Logo</h1>
          <div className='flex justify-evenly w-96'> 
            <span>Home</span>
            <span>Profile</span>
            <span>Logout </span>
            <a href='/createRestaurant'>Register my Restaurant</a>
          </div>
        </nav>
        <div>
          <h1>My Restaurant</h1>
          <section className='w-full h-screen flex justify-center'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
               {restaurant && restaurant.length > 0 ? (
  restaurant.map((r) => (
    <div key={r._id} className="flex flex-col border p-5 w-96 h-96">
      <img src={r.image} alt={r.name} className='' />
      <div className='flex flex-col'>
        <span>{r.name}</span>
        <span>{r.address}</span>
        <span>{r.category}</span>
        <span>{r.rating}</span>
        <span>{r.phone}</span>
        <span>{r.tags}</span>
      </div>
     <button onClick={() => handleViewMenu(r)}>Menu</button>
    </div>
  ))
  ) : (
    <p>No restaurant found</p>
  )}
         
            </div>
          </section>
        </div>
      </div>
 
  );
}

export default OwnersPage;