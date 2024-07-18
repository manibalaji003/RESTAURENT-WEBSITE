import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import LoginPage from './Pages/LoginPage';
import Signup from './Pages/Signup';
import Cart from './Pages/Cart';
import Header from './Components/Header';
import './App.css';
import Order from './Pages/Order';

function App() {
 
  const [loggedin,isLoggedin]=useState(false);

  return (
    <Router>
      <Header  loggedIn={loggedin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginpage" element={<LoginPage  loggedIn={loggedin}  isLoggedin={isLoggedin}/>} />
        <Route path="/menu" element={<Menu  />} />
        <Route path="/cart" element={<Cart  />} />
        <Route path='/orders' element={<Order />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
