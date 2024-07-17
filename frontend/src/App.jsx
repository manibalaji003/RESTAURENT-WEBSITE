import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import LoginPage from './Pages/LoginPage';
import Signup from './Pages/Signup';
import Cart from './Pages/Cart';
import Header from './Components/Header';
import './App.css';

function App() {
 

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/menu" element={<Menu  />} />
        <Route path="/cart" element={<Cart  />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
