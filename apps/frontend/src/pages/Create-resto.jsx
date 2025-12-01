import { useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';

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
    formData.append('phone', phone);      // backend expects 'phone'
    formData.append('category', category);
    formData.append('rating', rating);    // backend expects 'rating'
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
    <main>
      <h1>Create Restaurant</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <input type="text" name="name" placeholder="Restaurant Name" onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} />
        <input type="number" name="rating" placeholder="Rating" onChange={handleChange} />
        <input type="text" name="tags" placeholder="Tags" onChange={handleChange} />

        <input id="upload-file" type="file" accept="image/*" name="image" onChange={handleFileChange} />
        <label htmlFor="upload-file">Upload Image</label>

        <button type="submit">Submit</button>
      </form>

      <button
        onClick={() => navigate('/ownersPage')}
        className="cursor-pointer p-2 w-24 rounded-lg text-white bg-blue-500"
      >
        Back
      </button>
    </main>
  );
}

export default CreateRestaurant;
