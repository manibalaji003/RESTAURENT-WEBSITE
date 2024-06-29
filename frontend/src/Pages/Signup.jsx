import React, { useState } from 'react'
import Header from '../Components/Header'
import { Button, Container ,Row,Col,FloatingLabel,Form} from 'react-bootstrap'


const Signup = () => {

  const [userData,setUserData]=useState(
    {
      'email':"",
      "password":"",
      "Apartment":"",
      "Street":"",
        "phone":"",
        "pincode":"",
        "city":'',

    }
  );
    

  return (
    <div>
            <Header />

            <Container  className='signupcontainer'>
                <center><h2>SIGN UP</h2></center>
              <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>UserName<super>*</super></Form.Label>
          <Form.Control type="text" placeholder="Enter username . . ." />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridText">
          <Form.Label>Email<super>*</super></Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Password<super>*</super></Form.Label>
          <Form.Control type="password" placeholder="Enter Password" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Confirm Password<super>*</super></Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Apartment<super>*</super></Form.Label>
        <Form.Control type='text' placeholder='Apartment . . . . '/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Street<super>*</super></Form.Label>
        <Form.Control  type='text' />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City<super>*</super></Form.Label>
          <Form.Control type='text' />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Phone<super>*</super></Form.Label>
            <Form.Control type='phone' />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Pincode<super>*</super></Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      
      <Container className='d-flex justify-content-end'> <Button variant="primary" type="submit">
        Create Account
      </Button></Container>
    
    </Form>
          
            </Container>
    </div>
  )
}

export default Signup