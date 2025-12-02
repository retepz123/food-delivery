import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import OwnersPage from './pages/OwnersPage';
import CreateRestaurant from './pages/Create-resto';
import RestaurantMenu from './pages/Menu-items';
import AddMenu from './pages/AddMenu';
import CustomerPage from './pages/CustomerPage';
import CheckoutPage from './pages/CheckoutPage';



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<SignUp />} path='/' />
      <Route element={<OwnersPage />} path='/ownersPage' />
      <Route element={<Login/>} path='/login' />
      <Route element={<CreateRestaurant />} path='/createRestaurant' />
      <Route element={<RestaurantMenu />} path='/restaurant/:id/menu' />
      <Route element={<AddMenu />} path='/addMenu/:id' />
      <Route element={<CustomerPage />} path='/customerPage' />
      <Route element={<CheckoutPage />} path='/checkout' />
    </Routes>
    </BrowserRouter>
  );
}

export default App;