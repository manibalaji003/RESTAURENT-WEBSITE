import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import UseSessionStorage from '../Hooks/Storage';

const Header = ({loggedIn}) => {
  


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
          <Navbar.Brand style={{ color: 'black' }} className='bebas-neue-regular '>FOOD  CORNER</Navbar.Brand>
        </Container>
        <Container className="justify-content-end">
          <Nav>
            <Nav.Link href="" className='navtext' style={{ fontWeight: '600' }}>Home</Nav.Link>
            <Nav.Link href="/menu" className='navtext' style={{ fontWeight: '600' }}>Menu</Nav.Link>
            <Nav.Link href="cart" className='navtext cart' style={{ fontWeight: '600' }}>Cart</Nav.Link>
            <Nav.Link href="/orders" style={{ fontWeight: '600' }}>Orders</Nav.Link>
            {(!loggedIn)? <Nav.Link href="loginpage" className='navtext' style={{ fontWeight: '600' }}><span className='loginbutton'>Login</span></Nav.Link>: <i className="bi bi-person-circle  dashboard navtext"></i>}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
