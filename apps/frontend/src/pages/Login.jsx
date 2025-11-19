import { useState } from 'react';
import { axiosInstance } from '../lib/axios';


function Login() {
  const [form, setForm] = useState({ username: '', password:'', });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = async (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = form;

    console.log('Form Data', {username, password, role: form.role});

    try {
      const res = await axiosInstance.post('/auth/login', {username, password});

      if (res.data?.token){
        localStorage.setItem('user', JSON.stringify(res.data.user))
        setLoggedIn(true);
        console.log('Succesfully Logged In');
        alert('Succesfully Logged In');
      } else {
        alert ('Login failed: No token provided');
      }

    } catch (error) {
       console.error('Error Login', error);
      alert('Invalid username and password')
    }
  }

  return (
    <div>
      <h1>
        Login
      </h1>
      <form onSubmit={handleLogin}>
        <input onChange={handleChange} value={form.username} name='username' type='text' placeholder='Username' />
        <input onChange={handleChange} value={form.password} name='password' type='password' placeholder='password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;