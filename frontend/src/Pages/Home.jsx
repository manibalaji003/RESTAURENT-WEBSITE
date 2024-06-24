import React from 'react'
import Header from '../Components/Header'
import { Container, Image } from 'react-bootstrap'
import image from '../assets/bg.webp'

const Home = () => {
  return (
    <>
       <Header />
       <Container className='imgtextcontainer'>
       <Image src={image}  className='image'/>
       <Container className='imgtext'>
        Hello world
        </Container>
        </Container>    
       </>
  )
}

export default Home