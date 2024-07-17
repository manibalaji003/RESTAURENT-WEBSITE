import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import UseSessionStorage from '../Hooks/Storage';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(true);


 // const [sesionvalue] = UseSessionStorage('mySessionStorageKey');

  // useEffect(() => {
  //   if (sesionvalue && sesionvalue.success === true) {
  //     setLoggedIn(false);
  //   } else if(sesionvalue===undefined) {
  //     setLoggedIn(false );
  //   }else{
  //     setLoggedIn(true);
  //   }
  // }, [sesionvalue]);

  return (
    <div>
      <Navbar className='navibar d-flex'>
        <Container>
          <Navbar.Brand style={{ color: 'black', fontWeight: '600' }}>Restaurant</Navbar.Brand>
        </Container>
        <Container className="justify-content-end">
          <Nav>
            <Nav.Link href="" className='navtext' style={{ fontWeight: '600' }}>Home</Nav.Link>
            <Nav.Link href="/menu" className='navtext' style={{ fontWeight: '600' }}>Menu</Nav.Link>
            <Nav.Link href="cart" className='navtext cart' style={{ fontWeight: '600' }}>Cart</Nav.Link>
            <Nav.Link href="/" style={{ fontWeight: '600' }}>About us</Nav.Link>
            {loggedIn && <Nav.Link href="loginpage" className='navtext' style={{ fontWeight: '600' }}><span className='loginbutton'>Login</span></Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
