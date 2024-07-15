import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import Menu from './Pages/Menu'
import {Routes,Router, BrowserRouter, Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import Signup from './Pages/Signup'
import Cart from './Pages/Cart'
import Header from './Components/Header'

function App() {
  
const [cart, setCart]=useState([ ]);


  return (
    <>
        
        
<BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element={<Home   />} />
            <Route path='/loginpage' element={<LoginPage />} />
            <Route path='/menu' element={<Menu  cart={cart} setCart={setCart} />} />
            <Route path='cart' element={<Cart  cart={cart}  />} />
            <Route path='/signup' element={<Signup />} />
            
          </Routes>
          </BrowserRouter>   
    
    
  </>
  )
}

export default App
