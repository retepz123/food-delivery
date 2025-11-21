import { useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = form;

    try {
      const res = await axiosInstance.post('/auth/login', { username, password });

      if (res.data?.token) {
        // Save token and user
        localStorage.setItem('token', res.data.token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        localStorage.setItem('user', JSON.stringify(res.data.newUser));

        setLoggedIn(true); // trigger redirect
        console.log('Successfully Logged In');
        alert('Successfully Logged In');
      } else {
        alert('Login failed: No token provided');
      }
    } catch (error) {
      console.error('Error Login', error);
      alert('Invalid username or password');
    }
  };

  // Redirect after successful login
  useEffect(() => {
    if (!loggedIn) return; // only run after login
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role === 'owner') navigate('/ownersPage');
    else navigate('/home'); // default redirect for other users
  }, [loggedIn, navigate]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          onChange={handleChange}
          value={form.username}
          name="username"
          type="text"
          placeholder="Username"
        />
        <input
          onChange={handleChange}
          value={form.password}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
