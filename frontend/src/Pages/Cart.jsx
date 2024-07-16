import React, { useContext, useEffect, useState } from 'react';
import { Container, Image,Button } from 'react-bootstrap';
import image from '../assets/poster1.png';
import axios from 'axios'

const Cart = () => {

    let tokencartkey=sessionStorage.getItem("Logintoken");
    let key1=JSON.parse(tokencartkey);

  const [cartData,setCartData]=useState([ ]);
  const [totalAmount,setTotalAmount]=useState(0);
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:3300/api/v1/cart',{headers:{"Authorization": `Bearer ${key1.token}`}});
        setCartData(response.data.orderItems);
        setTotalAmount(response.data.totalPrice);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCartData();
  }, []);

   
  console.log(cartData);

  //const totalAmount = cartData.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <>
    <Container  className='cartmaincontainer'>
      <Container className='cartcontainer'>
        <Container><h5>Name</h5></Container>
        <Container><h5>Quantity</h5></Container>
        <Container><h5>Price</h5></Container>
      </Container>
      {cartData.map((item, index) => (
        <div key={index} className='cartcontainer'>
          <Container className='cartimgcontainer'>
            <Image src={item.image || image} alt={item.name} />
            <h5>{item.name}</h5>
          </Container>
          <Container>
              <Button className="plus">+</Button>
                <span>1</span>
              <Button className="minus">-</Button>
          </Container>
          <Container> <p> &#8377; {item.price.toFixed(2)}</p></Container>
        </div>
      ))}
      <div className='totalamount'>
        <h5>Total amount: &#8377; {totalAmount}</h5>
      </div>
      </Container>
    </>
  );
}

export default Cart;
