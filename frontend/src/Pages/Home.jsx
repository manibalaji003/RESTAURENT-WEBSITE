import React from 'react'
import Header from '../Components/Header'
import { Container, Image } from 'react-bootstrap'
import Footer from '../Components/Footer'
import Special from '../Components/Special'
import Review from '../Components/Review'
import HImage from '../assets/homepagefood.png'


const Home = () => {
  return (
    <>
         
       
       <Header /> 

       
       
       <Image src={HImage} className='imagecontainer'/>
      
       
      
       <div>
          <center><h3>Why you'll love - - - - - - -  </h3></center>
       </div>
       <div>
       <center><h3>Today's Special Dish</h3></center>
          <Special />
       </div>
       <div>
       <center><h3>Offer</h3></center>
       </div>
       <div>
       <center><h3>Review</h3></center>
       <Review />
       </div>
       <hr />
       <div className='aboutcontact'>
        <Container className='aboutus'>
        <h4>About Us</h4>
       

Welcome to [Your Restaurant Name], a culinary gem in the heart of [City/Location]. Founded in [Year], we are dedicated to creating exquisite dishes using the finest, freshest ingredients. Our menu blends classic favorites with innovative creations, celebrating local produce and suppliers.

Step into [Your Restaurant Name] and enjoy an elegant yet comfortable atmosphere, perfect for any occasion. Our talented chefs and friendly staff are committed to providing an exceptional dining experience, making every guest feel like family.

Join us at [Your Restaurant Name] and discover a dining experience that delights the senses and nourishes the soul. Your table is waiting!
       </Container>
       
       
            <Container className='address'>
          <h4>Contact us</h4>
                <p>EMAIL:  <span>manibalaji22003@gmail.com</span></p>
                <p>PHONE NO:  <span>123467890</span></p>
                <p>ADDRESS:  <address>1/3 vivekanda street, dubai main road Dubai </address></p>
            </Container>
       </div>
       <Footer />
       </>
  )
}

export default Home