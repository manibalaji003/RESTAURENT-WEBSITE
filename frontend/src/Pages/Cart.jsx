import React, { useContext } from 'react';
import { Container, Image } from 'react-bootstrap';
import image from '../assets/poster1.png';


const Cart = ({cart}) => {


   
  console.log(cart);

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <>
      {cart.map((item, index) => (
        <div key={index} className='cartcontainer'>
          <Container className='cartimgcontainer'>
            <Image src={item.image || image} alt={item.name} />
          </Container>
          <Container>
            <h5>{item.name}</h5>
            <p>Price: &#8377; {item.price.toFixed(2)}</p>
          </Container>
        </div>
      ))}
      <div className='totalamount'>
        <h5>Total amount: &#8377; {totalAmount}</h5>
      </div>
    </>
  );
}

export default Cart;
