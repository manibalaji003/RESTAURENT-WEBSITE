import React from 'react'
import Header from '../Components/Header'
import { Button, Container ,Row,Col,FloatingLabel,Form} from 'react-bootstrap'


const Signup = () => {

    

  return (
    <div>
            <Header />

            <Container  className='signupcontainer'>
                <center><h2>SIGN UP</h2></center>
              <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Apartment</Form.Label>
        <Form.Control type='text'/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Street</Form.Label>
        <Form.Control  type='text' />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control type='text' />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Phone</Form.Label>
            <Form.Control type='phone' />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      

      <Button variant="primary" type="submit">
        Create Account
      </Button>
    </Form>
          
            </Container>
    </div>
  )
}

export default Signup