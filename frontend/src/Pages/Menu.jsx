import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';
import Header from '../Components/Header';
import {ThreeCircles} from 'react-loader-spinner'

const StarRating = ({ count }) => {
  const stars = Array.from({ length: count }, (_, index) => (
    <i key={index} className="bi bi-star-fill" style={{ color: 'rgb(218,165,32)' }}></i>
  ));
  return <span>{stars}</span>;
};

const Menu = () => {
  const [itemData, setItemData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3300/api/v1/items/get/cat');
        setItemData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(()=>{setLoading(false)},3000);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('itemData:', itemData);
  }, [itemData]);

  if (loading) {
    return( 
    <div className='loader'>
        <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>);
  }

  return (
    <>
      <Header /> <br/> <br />
      {Object.keys(itemData).map(category => (
        <div key={category} > 
          <h2>{category}</h2>
          <div className="menu-category ">
              <hr />
          {itemData[category].map(item => (
            
            <Card key={item.id} style={{ width: '18rem', margin: '1rem' }}>
              <Card.Img variant="top" src={item.image} width={150} height={150} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <Container className='item-description'>
                  Description:<br/> {item.description}
                </Container>
                </Card.Text>
                
                <Card.Subtitle className='m-3'>
                  Rating: <StarRating count={item.rating} />
                </Card.Subtitle>
                <Container className='d-flex justify-content-end'>
                <Container className='d-flex justify-content-between ' style={{marginBottom:'0px'}}>
                  <b className='pricetag'>&#8377; {item.price.toFixed(2)}</b>
                  <Button>Add to cart</Button>
                </Container>
                </Container>
              </Card.Body>
            </Card>
            
          ))}
          </div>
            <hr/>
        </div>
      ))}
    </>
  );
};


export default Menu;
