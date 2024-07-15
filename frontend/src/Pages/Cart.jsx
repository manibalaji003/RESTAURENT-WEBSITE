import React from 'react'
import { Container, Image } from 'react-bootstrap'
import image from '../assets/poster1.png'

const Cart = ({cart}) => {
  return (
    <>

        <div className='cartcontainer'>
            <Container  className='cartimgcontainer'>
                <Image src={image} alt='image' />
            </Container>
            <Container>
                <h5>hello world</h5>
                <p>Price: &#8377; 40</p>
            </Container>    
        </div>
        Total amount:  &#8377; 
    </>
  )
}

export default Cart