import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card,Button } from 'react-bootstrap';
const StarRating = ({ count }) => {
  const stars = Array.from({ length: count }, (_, index) => (
    <i key={index} className="bi bi-star-fill" style={{color:'rgb(218,165,32)'}}></i>
  ));
  return <span>{stars}</span>;
};

const Menu = () => {
  const [itemData, setitemData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3300/api/v1/items/get/cat');
        
          setitemData(response.data);
      
          
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('itemData:', itemData);
  }, [itemData]);

  const TotalData =()=>{

      for(let x in itemData){
        
      }

  }

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <>
    {/* <Desserts desseretsdata={itemData.Desserts} />
    <Beverages  bevarage={itemData.Beverages}/>
     */}
        
     </>
  );
};



export const Beverages= (props) => {
  
  let beveragesresponsedata=props.bevarage;

  return (
    <div>
        <h3>Desserts</h3>
      <div className='dessserts'>
      {beveragesresponsedata.length > 0 ? (
        beveragesresponsedata.map(({ name, rating, price, image, description }) => (
          <div key={name}>
            <Card style={{ width: '18rem', margin: '1rem' }}>
              <Card.Img variant="top" src={image}  width={150} height={150}/>
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                  Description: {description}
                </Card.Text>
              
                <Card.Subtitle>
                  Rating: <StarRating count={rating} />
                </Card.Subtitle>
                <Container className='d-flex justify-content-between'><b className='pricetag '>&#8377; {price}</b><Button>Add to cart</Button></Container>
                    
                   
               
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <div>No items available</div>
      )}
  
      </div>

    </div>
  )
}





export const Desserts = (props) => {

  let dessertData=props.desseretsdata;

  return (
    <div >
      <h3>Desserts</h3>
      <div className='dessserts'>
      {dessertData.length > 0 ? (
        dessertData.map(({ name, rating, price, image, description }) => (
          <div key={name}>
            <Card style={{ width: '18rem', margin: '1rem' }}>
              <Card.Img variant="top" src={image}  width={150} height={150}/>
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                  Description: {description}
                </Card.Text>
              
                <Card.Subtitle>
                  Rating: <StarRating count={rating} />
                </Card.Subtitle>
                <Container className='d-flex justify-content-between'><b className='pricetag '>&#8377; {price}</b><Button>Add to cart</Button></Container>
                    
                   
               
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <div>No items available</div>
      )}
  
      </div>
    </div>
  )
}






export default Menu;
