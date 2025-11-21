import { useState } from 'react';
import {axiosInstance} from '../lib/axios';
import { Link, useNavigate } from 'react-router-dom';

// const SIGN_UP_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`;

function SignUp() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const navigate = useNavigate();

  function handleChange(e){
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e){
    e.preventDefault();

    const username = form.username.trim();
    const email = form.email.trim();
    const password = form.password;
    const role = form.role;

     console.log('Form Data:', { username, email, password, role: form.role });

    if (!username || !email || !password){
      alert('Plese fill in the fields');
      return;
    }

    try{
     const res = await axiosInstance.post('/auth/register', form);
     alert('Succesfully Created');

     setTimeout(() => 
      navigate('/login'), 1000
     );

    } catch (error) {
  if (error.response && error.response.data.error) {
    alert(error.response.data.error); 
  } else if (error.response && error.response.data.message) {
    alert(error.response.data.message); 
  } else {
    console.error('Error in signup', error);
    alert('Internal Server Error');
      }
      
    }
  }


  return (
    <>
    <h1>Sign Up</h1>
    <div>
      <form onSubmit={handleSubmit}>
         <input onChange={handleChange} value={form.username} name='username' type='text' placeholder='Username' />
 <input onChange={handleChange} value={form.email} name='email' type='email' placeholder='E-mail' />
 <input onChange={handleChange} value={form.password} name='password' type='password' placeholder='Password' />
 <select name="role" value={form.role} onChange={handleChange}>
    <option value="customer">Customer</option>
    <option value="owner">Owner</option>
  </select>
 <button type='submit'>Sign Up</button>
      </form>
     <Link to='/login'>Login</Link>
    </div>
    </>
  );
}

export default SignUp;