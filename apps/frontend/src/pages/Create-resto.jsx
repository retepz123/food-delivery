import { useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';

function CreateRestaurant() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    contact: '',
    category: '',
    ratings: '',
    tags: '',
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleFileChange = (e) => {
    setForm({...form, image: e.target.files[0]});
  };

  async function handleSubmit(e){
    e.preventDefault();

   const { name, description, address, contact, category, ratings, tags, image } = form;

    if (!name.trim() || !description.trim() || !address.trim() || !contact.trim() || !category.trim() || !ratings || !tags.trim() || !image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("contact", contact);
    formData.append("category", category);
    formData.append("ratings", ratings);
    formData.append("tags", tags);
    formData.append('image', form.image);


    try {
      const res = await axiosInstance.post("/restaurant", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // console.log(req.file);


      alert("Successfully Created a Restaurant");
      console.log(res.data);

    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.error || "Failed to create restaurant");
    }
  }

  return (  
    <main>
      <h1>Create Restaurant</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
        <input type='text' placeholder='Restaurant`s Name' name='name' onChange={handleChange} />
        <input type='text' placeholder='Description' name='description' onChange={handleChange}/>
        <input type='text' placeholder='Address' name='address' onChange={handleChange} />
        <input type='tel' placeholder='Contanct Number' name='contact' onChange={handleChange}/>
        <input type='text' placeholder='Category' name='category' onChange={handleChange}/>
        <input type='number' placeholder='Ratings' name='ratings' onChange={handleChange}/>
        <input type='text' placeholder='Tags' name='tags' onChange={handleChange}/>

        <input id='upload-file' type='file' accept='image/*' name='image' onChange={handleFileChange}/>
        <label htmlFor='upload-file' name='upload'>Upload Image</label>
        <button type='submit'>Submit</button>
      </form>
      <div>
       <button onClick={() => navigate('/ownersPage')} className='cursor-pointer p-2 w-24 rounded-lg text-white bg-blue-500' >Back</button>
      </div>
    </main>
  );
}

export default CreateRestaurant;