import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import Menu from './Pages/Menu'
import {Routes,Router, BrowserRouter, Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import Signup from './Pages/Signup'

function App() {
  

  return (
    <>
        
        
<BrowserRouter>
        
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/loginpage' element={<LoginPage />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/signup' element={<Signup />} />
            
          </Routes>
          </BrowserRouter>   
    
    
  </>
  )
}

export default App
