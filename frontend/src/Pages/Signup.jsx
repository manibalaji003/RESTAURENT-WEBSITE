import React from 'react'
import Header from '../Components/Header'
import { Button, Container ,FloatingLabel,Form} from 'react-bootstrap'


const Signup = () => {

    function isValidEmail(email) {
        // Define a regular expression pattern for email validation.
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
      }
      
  return (
    <div>
            <Header />
            <Container className='logincontainer' >
               <center> <h2>LOGIN</h2></center><br/>
            <FloatingLabel    controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
            <Button>Create Account</Button>
          
            </Container>
    </div>
  )
}

export default Signup