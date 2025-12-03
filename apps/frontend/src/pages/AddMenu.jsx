import { useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { useNavigate, useParams } from 'react-router-dom';
import kusina from '../Images/last.webp';

function AddMenu() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: null,
  });
    const navigate = useNavigate();
    const { id } = useParams();

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value});
  };

  function handleFileChange(e){
      setForm({...form, image: e.target.files[0]});
  };

  async function handleSubmit (e){
    e.preventDefault();

    const { name, price, category, image} = form;

    // console.log('Form data:', form);

    if(!name || !price || !category || !image){
      alert('Please the blanks');
    };

    const formData = new FormData();
    formData.append("restaurant", id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", form.image);

    try{
      const res = await axiosInstance.post('/menuItems', formData, {
         headers: { "Content-Type": "multipart/form-data" }
      })

      alert('New Menu Added to your list');
     console.log(res.data);

    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.error || "Failed to Add Menu");
    }

  }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center' style={{ backgroundImage: `url(${kusina})`}}>
      <div className='flex '>
        <h1 className='text-white font-serif text-3xl'>Create Menu</h1>
      </div>
      <form className='flex flex-col gap-y-5 border border-white items-center h-[45%] pt-5 backdrop-blur-md' onSubmit={handleSubmit}>
        <input className='bg-gray-300 rounded-md h-[30px] p-2' type='text' placeholder='Food Name' name='name' onChange={handleChange}/>
        <input className='bg-gray-300 rounded-md h-[30px] p-2' type='Number' placeholder='Price' name='price' onChange={handleChange}/>
        <input className='bg-gray-300 rounded-md h-[30px] p-2' type='text' placeholder='category' name='category' onChange={handleChange}/>
        <input className='bg-gray-300 rounded-md h-[30px] p-2' id='upload-menu' type='file' accept='image/*' name='image' onChange={handleFileChange}/>
        <label htmlFor='upload-menu' name='upload' >Upload</label>
        <button className='cursor-pointer p-2 w-24 rounded-lg hover:text-white hover:bg-blue-500' type='submit'>Submit</button>
      </form>
             <button onClick={() => navigate('/ownersPage')} className='cursor-pointer p-2 w-24 rounded-lg text-white bg-blue-500' >Back</button>

    </div>
  );
}

export default AddMenu;