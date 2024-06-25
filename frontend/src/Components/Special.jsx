import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import poster1 from '../assets/poster1.png'
import poster2 from '../assets/poster2.png'
import poster3 from '../assets/poster3.png'
import poster4 from '../assets/poster4.png'
import poster5 from '../assets/poster5.png'
import poster6 from '../assets/poster6.png'
const Special = () => {
  return (
    <div className='specialdish'>
        <Container className='d-flex justify-content-center'>
        <Row >
            <Col>
                <Image src={poster1}  className='image m-5' alt='poster-1'/>
            </Col>
            <Col>
                <Image src={poster2} className='image m-5' />
            </Col>
            <Col>
            <Image src={poster3} className='image  m-5' />
            </Col>
        </Row>
        </Container>
        <Container className='d-flex justify-content-center'>
        <Row >
        <Col>
                <Image src={poster4}  className='image m-5' alt='poster-1'/>
            </Col>
            <Col>
                <Image src={poster5} className='image m-5' />
            </Col>
            <Col>
            <Image src={poster6} className='image m-5' />
            </Col>
        </Row>
        </Container>
        <hr/>
    </div>
  )
}

export default Special