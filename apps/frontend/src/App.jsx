import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<SignUp />} path='/' />
      <Route element={<Home />} path='/home' />
      <Route element={<Login/>} path='/Login' />
    </Routes>
    </BrowserRouter>
  );
}

export default App;