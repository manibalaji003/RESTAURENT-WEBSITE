import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap';


const Order = () => {

    let tokencartkey = sessionStorage.getItem("Logintoken");
  let key2 = JSON.parse(tokencartkey);

  const [orderData,getOrderItems]=useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get('http://localhost:3300/api/v1/orders', {
          headers: { "Authorization": `Bearer ${key2.token}` }
        });
        console.log("respomse data is ",response.data);
       getOrderItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchOrderData();
  }, []);

 console.log("use state is",orderData);
  return (
    <>
    <div>
        {orderData.map((order,index)=>(
            <Container className='orderitem' key={index}>
         {order.orderItems.map((items) => (
            <p>{items.name}</p>
         ))}
           {order.dateOrdered}

           {order.dateOrdered}
           {order.totalPrice}
            </Container>
        ))}
        </div>
        
    </>
  )
}

export default Order