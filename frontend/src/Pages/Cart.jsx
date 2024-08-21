/* eslint-disable no-unused-vars */
import  { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';


const Cart = () => {
  let tokencartkey = sessionStorage.getItem("Logintoken");
  let key1 = JSON.parse(tokencartkey);
//console.log(key1.token);
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:3300/api/v1/cart', {
          headers: { "Authorization": `Bearer ${key1.token}` }
        });
        console.log(response);
        setCartData(response.data.orderItems);
      } catch (error) {
       // console.error('Error fetching data:', error);
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


  const RemoveCart =async (item) =>{
    setCartData((prevCart) => prevCart.filter((c) => c.name !== item.name));
   await  axios.post("http://localhost:3300/api/v1/cart/remove",{"itemName":item.name},{headers:{"Authorization": `Bearer ${key1.token}`}})
  
  }

  const checkoutcart =async () =>{
    //console.log(cartData);
     let response=await axios.post("http://localhost:3300/api/v1/orders",{"qtyObjArr": cartData},{headers:{"Authorization": `Bearer ${key1.token}`}})
     console.log(response);
  }




  return (
    <Container className='cartmaincontainer'>
      <Container className='cartheading'>
        <Container><h5>Product</h5></Container>
        <Container><h5>Quantity</h5></Container>
        <Container><h5>Price</h5></Container>
        <Container><h5>Remove</h5></Container>
      </Container>
      <hr />
      {cartData.map((item, index) => (
        <div key={index} className='cartcontainer'>

            <Container className='cartimgcontainer'>
              <img className='cartimage' src={item.image} alt={item.name} />
              <h5>{item.name}</h5>
            </Container>

            <Container className='quantitycontainer'>
              <Button className="plus" onClick={() => increment(index)}>+</Button>
              <span className='itemquantity'>{item.qty}</span> 
              <Button className="minus" onClick={() => decrement(index)}>-</Button>
            </Container>

            <Container>
              <p><b> &#8377; {item.price.toFixed(2)}</b></p>
            </Container>
            <Container>
                <Button className='btnremove'  onClick={()=>RemoveCart(item)}>Remove</Button>
            </Container>
            <hr />
        </div>
      ))}
      <Container className='amount'>
      <Container className='totalamount'>
        <h5>Total amount: &#8377; {cartData.totalPrice}</h5>
      </Container>
      <Container className='checkout'>
          <Button  onClick={()=>{checkoutcart()}}><i className="bi bi-bookmark-check-fill"></i>Checkout</Button>
      </Container>
      </Container>
    </Container>
  );
};

export default Cart;
