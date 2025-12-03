import { useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import kusina from '../Images/last.webp'

function CreateRestaurant() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    category: '',
    rating: '',
    tags: '',
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { name, description, address, phone, category, rating, tags, image } = form;

    if (!name || !description || !address || !phone || !category || !rating || !tags || !image) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('category', category);
    formData.append('rating', rating);
    formData.append('tags', tags);
    formData.append('image', image);

    try {
      const res = await axiosInstance.post('/restaurant', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Successfully Created a Restaurant');
      console.log(res.data);
      navigate('/ownersPage');
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'Failed to create restaurant');
    }
  }

  return (
    <main className='flex flex-col justify-center items-center gap-y-5 h-screen w-full 'style={{ backgroundImage: `url(${kusina})`}}>
      <h1 className='text-white font-sans text-3xl font-bold'>Create Restaurant</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-y-3 backdrop-blur-md w-[30%] h-[70%] items-center rounded-md ">
        <input  className='bg-gray-300 rounded-md h-[30px] p-2' type="text" name="name" placeholder="Restaurant Name" onChange={handleChange} />
        <input  className='bg-gray-300 rounded-md h-[30px] p-2' type="text" name="description" placeholder="Description" onChange={handleChange} />
        <input className='bg-gray-300 rounded-md h-[30px] p-2' type="text" name="address" placeholder="Address" onChange={handleChange} />
        <input className='bg-gray-300 rounded-md h-[30px] p-2' type="tel" name="phone" placeholder="Phone" onChange={handleChange} />
        <input  className='bg-gray-300 rounded-md h-[30px] p-2' type="text" name="category" placeholder="Category" onChange={handleChange} />
        <input  className='bg-gray-300 rounded-md h-[30px] p-2' type="number" name="rating" placeholder="Rating" onChange={handleChange} />
        <input  className='bg-gray-300 rounded-md h-[30px] p-2' type="text" name="tags" placeholder="Tags" onChange={handleChange} />

        <input  className='bg-gray-300 rounded-md h-[30px] p-2' id="upload-file" type="file" accept="image/*" name="image" onChange={handleFileChange} />
        <label htmlFor="upload-file">Upload Image</label>

        <button className='cursor-pointer p-2 w-24 rounded-lg hover:text-white hover:bg-blue-500' type="submit">Submit</button>
      </form>

      <button
        onClick={() => navigate('/ownersPage')}
        className="cursor-pointer p-2 w-24 rounded-lg hover:text-white hover:bg-blue-500"
      >
        Back
      </button>
    </main>
  );
}

export default CreateRestaurant;
