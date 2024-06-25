import React from 'react'
import {Container,Nav,Navbar} from 'react-bootstrap'

const Header = () => {
  return (
    <div>
        <Navbar  className='navibar'>
            <Container>
                <Navbar.Brand style={{color:'white',fontWeight:'600'}}>Restaurent</Navbar.Brand>
               </Container>
               <Container className="justify-content-end " >
            <Nav >
            <Nav.Link href="#home" style={{color:'white', fontWeight:'600'}}>Home</Nav.Link>
            <Nav.Link href="#home" style={{color:'white', fontWeight:'600'}}>Menu</Nav.Link>
            <Nav.Link href="#home" style={{color:'white', fontWeight:'600'}}>cart</Nav.Link>
            <Nav.Link href="#features"style={{color:'white', fontWeight:'600'}}>About us</Nav.Link>
            <Nav.Link href="#pricing" style={{color:'white', fontWeight:'600'}}>Contact</Nav.Link>
          </Nav>
           </Container>
        </Navbar>
    </div>
  )
}

export default Header