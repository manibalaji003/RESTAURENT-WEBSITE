import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const  Homesub= () => {
  return (
    < >
        <Row className='homesub'>
            <Col sm={4}>
                <Container className='homesub1 d-flex justify-content-center'>
               <p> "Your favorite dishes, delivered hot and fresh." <br/>
                <span className='ordernow'><span className='order '>Order</span> <span className='now'>now!</span></span></p>
                </Container>
            </Col>
            <Col sm={8}>
                <Container className='homesub2 d-flex justify-content-center'>hello world</Container>
            </Col>
        </Row>
    </>
  )
}

export default Homesub