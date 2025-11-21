import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import OwnersPage from './pages/OwnersPage';
import Customer from './pages/Customer';
import CreateRestaurant from './pages/Create-resto';
import RestaurantMenu from './pages/Menu-items';
import AddMenu from './pages/AddMenu';



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<SignUp />} path='/' />
      <Route element={<OwnersPage />} path='/ownersPage' />
      <Route element={<Login/>} path='/login' />
      <Route element={<Customer />} path='/customer' />
      <Route element={<CreateRestaurant />} path='/createRestaurant' />
      <Route element={<RestaurantMenu />} path='/restaurant/:id/menu' />
      <Route element={<AddMenu />} path='/addMenu' />
    </Routes>
    </BrowserRouter>
  );
}

export default App;