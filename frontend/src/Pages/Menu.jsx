import React, { useEffect, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';
import Header from '../Components/Header';
import { MagnifyingGlass } from 'react-loader-spinner';

const StarRating = ({ count }) => {
  const stars = Array.from({ length: count }, (_, index) => (
    <span key={index}><i className="bi bi-star-fill" style={{ color: 'rgb(218,165,32)' }}></i>&nbsp;</span>
  ));
  return <span>{stars}</span>;
};

const Menu = ({cart,setCart}) => {
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
        setTimeout(() => { setLoading(false); }, 3000);
      }
    };
    fetchData();
  }, []);

  const addCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };
  console.log(cart);

  const removeCart = (item) => {
    setCart((prevCart) => prevCart.filter((c) => c.name !== item.name));
  }

  if (loading) {
    return (
      <div className='loader'>
        <MagnifyingGlass
          visible={true}
          height="100"
          width="100"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#026d30"
          color="#05843"
        />
      </div>
    );
  }

  return (
    <>
      {Object.keys(itemData).map(category => (
        <div key={category}>
          <h2>{category}</h2>
          <div className="menu-category">
            <hr />
            {itemData[category].map(item => (
              <Card key={item.id} style={{ width: '18rem'}}>
                <Card.Img variant="top" src={item.image} width={150} height={150} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    <Container className='item-description'>
                      Description:<br /> {item.description}
                    </Container>
                  </Card.Text>

                  <Card.Subtitle className='m-3'>
                    Rating: <StarRating count={item.rating} />
                  </Card.Subtitle>
                  <Container className='d-flex justify-content-end'>
                    <Container className='d-flex justify-content-between ' style={{ marginBottom: '0px' }}>
                      <b className='pricetag'>&#8377; {item.price.toFixed(2)}</b>

                      {cart.includes(item) ?
                        <Button className='btnremove' onClick={() => removeCart(item)}>Remove</Button> :
                        <Button className='btnadd' onClick={() => addCart(item)}>Add to cart</Button>
                      }
                    </Container>
                  </Container>
                </Card.Body>
              </Card>
            ))}
          </div>
          <hr />
        </div>
      ))}
    </>
  );
};

export default Menu;
