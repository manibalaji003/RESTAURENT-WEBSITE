import React from 'react'
import {Container,Nav,Navbar} from 'react-bootstrap'

const Header = () => {
  return (
    <div>
        <Navbar  className='navibar'>
            <Container>
                <Navbar.Brand style={{color:'black',fontWeight:'600'}}>Restaurent</Navbar.Brand>
               </Container>
               <Container className="justify-content-end " >
            <Nav >
            <Nav.Link href="/" style={{color:'#018224', fontWeight:'600'}}>Home</Nav.Link>
            <Nav.Link href="/menu" style={{color:'#018224', fontWeight:'600'}}>Menu</Nav.Link>
            <Nav.Link href="/" style={{color:'#018224', fontWeight:'600'}} className='cart'>cart</Nav.Link>
            <Nav.Link href="#features"style={{color:'#018224', fontWeight:'600'}}>About us</Nav.Link>
            <Nav.Link href="loginpage" style={{color:'#018224', fontWeight:'600'}}>Login</Nav.Link>
          </Nav>
           </Container>
        </Navbar>
    </div>
  )
}

export default Header