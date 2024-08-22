
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import LoginPage from './Pages/LoginPage';
import Signup from './Pages/Signup';
import Cart from './Pages/Cart';
import Header from './Components/Header';
import './App.css';
import Order from './Pages/Order';
import AdminDashboard from './Pages/AdminDashboard';

function App() {



  return (
    <Router>
      <Header  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginpage" element={<LoginPage   />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/menu" element={<Menu  />} />
        <Route path="/cart" element={<Cart  />} />
        <Route path='/orders' element={<Order />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
