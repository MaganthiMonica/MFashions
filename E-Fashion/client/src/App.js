import './App.css';
import Login from './components/Login';
import SignUp from './components/Signup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage/Homepage';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import Shop from './components/Shop/Shop';
import Updateaddress from './components/AddAddress';
import Cart from './components/Cart/Cartpage';
import jwt_decode from 'jwt-decode'
import React from 'react';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import Order from './components/Order/Order';

function App() {
  const navigate = useNavigate();
  const [token, setToken] = React.useState(localStorage.getItem('User:Token'));

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const token=Cookies.get('token')
      if (!token) {
        clearInterval(intervalId);
        return;
      }

      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (currentTime > decodedToken.exp) {
        alert('Your session has expired. Please log in again.');
        clearInterval(intervalId);
  
        navigate('/login');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <>
   
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/shop" element={<Shop/>} />
        <Route exact path="/addAddress" element={<Updateaddress/>} />
        <Route exact path="/cartPage" element={<Cart/>} />
        <Route exact path="/order" element={<Order/>} />
      </Routes>
  </>
  );
}

export default App;
