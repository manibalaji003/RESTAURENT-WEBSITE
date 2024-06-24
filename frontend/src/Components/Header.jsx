import React from 'react'
import {Container,Nav,Navbar} from 'react-bootstrap'

const Header = () => {
  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">
            
                <Navbar.Brand>Restaurent</Navbar.Brand>
               
            <Nav className="justify-content-end">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#home">Menu</Nav.Link>
            <Nav.Link href="#home">cart</Nav.Link>
            <Nav.Link href="#features">About us</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
            
          </Nav>
           
        </Navbar>
    </div>
  )
}

export default Header