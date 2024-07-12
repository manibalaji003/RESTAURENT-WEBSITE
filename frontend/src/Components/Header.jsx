import React from 'react'
import {Container,Nav,Button,Navbar} from 'react-bootstrap'

const Header = () => {
  return (
    <div>
        <Navbar  className='navibar d-flex'>
            <Container>
                <Navbar.Brand style={{color:'black',fontWeight:'600'}}>Restaurent</Navbar.Brand>
               </Container>
               <Container className="justify-content-end " >
            <Nav >
            <Nav.Link href="" className='navtext' style={{ fontWeight:'600'}}>Home</Nav.Link>
            <Nav.Link href="/menu" className='navtext' style={{ fontWeight:'600'}}>Menu</Nav.Link>
           <Nav.Link href="/" className='navtext cart' style={{ fontWeight:'600'}} >cart</Nav.Link>
            <Nav.Link href="/" style={{ fontWeight:'600'}}>About us</Nav.Link>
            <Nav.Link href="loginpage" className='navtext' style={{ fontWeight:'600'}}><span className='loginbutton'>Login</span></Nav.Link>
          </Nav> 
           </Container>
        </Navbar>
    </div>
  )
}

export default Header