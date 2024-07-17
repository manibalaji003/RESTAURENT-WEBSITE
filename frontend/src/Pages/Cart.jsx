import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import image from '../assets/poster1.png';
import axios from 'axios';

const Cart = () => {
  let tokencartkey = sessionStorage.getItem("Logintoken");
  let key1 = JSON.parse(tokencartkey);

  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:3300/api/v1/cart', {
          headers: { "Authorization": `Bearer ${key1.token}` }
        });
        setCartData(response.data.orderItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCartData();
  }, []);

  const increment = (index) => {
    const newCartData = [...cartData];
    newCartData[index].qty += 1;
    setCartData(newCartData);
    updateTotalAmount(newCartData);
  };

  const decrement = (index) => {
    const newCartData = [...cartData];
    if (newCartData[index].qty > 1) {
      newCartData[index].qty -= 1;
      setCartData(newCartData);
      updateTotalAmount(newCartData);
    }
  };
  const updateTotalAmount = (cartData) => {
    const total = cartData.reduce((acc, item) => acc + item.qty * item.price, 0);
    setTotalAmount(total.toFixed(2));
  };


  const RemoveCart =(item) =>{
    setCartData((prevCart) => prevCart.filter((c) => c.name !== item.name));
    //let respose= axios.delete("http://localhost:3300/api/v1/cart",{"itemName":item.name},{headers:{"Authorization": `Bearer ${key1.token}`}})
    console.log(cartData);
  }

  const checkoutcart =async () =>{
    let response=await axios.post("http://localhost:3300/api/v1/cart",{"cartData": cartData},{headers:{"Authorization": `Bearer ${key1.token}`}})
    console.log(response);
  }




  return (
    <Container className='cartmaincontainer'>
      <Container className='cartheading'>
        <Container><h5>Name</h5></Container>
        <Container><h5>Quantity</h5></Container>
        <Container><h5>Price</h5></Container>
        <Container><h5>Remove</h5></Container>
      </Container>
      <hr />
      {cartData.map((item, index) => (
        <div key={index} className='cartcontainer'>
          <Container className='cartimgcontainer'>
            <Container className='cartimage'>
              {/* <img src={item.image || image} alt={item.name} /> */}
            </Container>
            <Container className='imagename'>
              <h5>{item.name}</h5>
            </Container>
          </Container>
          <Container className='quantitycontainer'>
            <Button className="plus" onClick={() => increment(index)}>+</Button>
           <span className='itemquantity'>{item.qty}</span> 
            <Button className="minus" onClick={() => decrement(index)}>-</Button>
          </Container>
          <Container>
            <p> &#8377; {item.price.toFixed(2)}</p>
          </Container>
          <Container>
              <Button className='btnremove'  onClick={()=>RemoveCart(item)}>Remove</Button>
          </Container>
          <hr />
        </div>
      ))}
      <Container className='amount'>
      <Container className='totalamount'>
        <h5>Total amount: &#8377; {CalTotalAmount(item.totalPrice)}</h5>
        
      </Container>
      <Container className='checkout'>
          <Button  onClick={()=>{checkoutcart}}><i className="bi bi-bookmark-check-fill"></i>View Checkout</Button>
      </Container>
      </Container>
    </Container>
  );
};

export default Cart;
