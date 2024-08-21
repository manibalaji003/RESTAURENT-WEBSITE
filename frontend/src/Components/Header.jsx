import  { useState,useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  
  // eslint-disable-next-line no-unused-vars
  const [loggedin, setLoggedin] = useState(() => {

   // console.log( !!sessionStorage.getItem("Logintoken"))
    return !!sessionStorage.getItem("Logintoken");
  });


  useEffect(() => {
    localStorage.setItem(
        "Logintoken",
        JSON.stringify(loggedin)
    );
}, [loggedin]);
  
  return (
    <div>
     
      <Navbar className='navibar d-flex'>
        <Container>
          <Navbar.Brand style={{ color: 'black' }} className='bebas-neue-regular '>FOOD  CORNER</Navbar.Brand>
        </Container>
        <Container className="justify-content-end">
          <Nav className='navicontain'>
          <i className="bi bi-justify threebar"></i>
            <Nav.Link href="" className='navtext' style={{ fontWeight: '600' }}>Home</Nav.Link>
            <Nav.Link href="/menu" className='navtext' style={{ fontWeight: '600' }}>Menu</Nav.Link>
            <Nav.Link href="cart" className='navtext cart' style={{ fontWeight: '600' }}>Cart</Nav.Link>
            <Nav.Link href="/orders" style={{ fontWeight: '600' }}>Orders</Nav.Link>
          
            {(!loggedin)? <Nav.Link href="loginpage" className='navtext' style={{ fontWeight: '600' }}><span className='loginbutton'>Login</span></Nav.Link>: <i className="bi bi-person-circle  dashboard navtext"></i>}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
