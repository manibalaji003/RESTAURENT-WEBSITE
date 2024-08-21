/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';

import { MagnifyingGlass } from 'react-loader-spinner';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'

// eslint-disable-next-line react/prop-types
const StarRating = ({ count }) => {
  const stars = Array.from({ length: count }, (_, index) => (
    <span key={index}><i className="bi bi-star-fill" style={{ color: 'rgb(218,165,32)' }}></i>&nbsp;</span>
  ));
  return <span>{stars}</span>;
};

const Menu = () => {

  const navigate=useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useState([]);
  const [itemData, setItemData] = useState({});
  const [loading, setLoading] = useState(true);
  
  const tokenkey=sessionStorage.getItem("Logintoken");
  let key=JSON.parse(tokenkey); 

    // console.log(tokenkey);
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

  const addCart =async (item) => {
   try{
  let respose= await axios.post("http://localhost:3300/api/v1/cart",{"itemName":item.name},{headers:{"Authorization": `Bearer ${key.token}`}})
    if(respose.data.message!=="item already exists"){
      setCart((prevCart) => [...prevCart, item]);
      Swal.fire({
        title: "Success",
        text: "Item added to the cart successfully",
        icon: "success"
      });
    }else{
      Swal.fire({
        title: "Exists",
        text: "Item already exists in the cart ",
        icon: "error"
      });
    }
  }catch{
    {
      Swal.fire({
        title: "please Login to continue",
        text: "unable to add to cart  please login to continue",
        icon: "error"
      
      }); 
      navigate("/loginpage")
    }
  }
  
};
  

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
        <motion.div key={category}    >
          <h2>{category}</h2>
          <div className="menu-category" >
            <hr />
            {itemData[category].map(item => (
              <motion.div   initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 520,
                damping: 40
              }} >
              <Card key={item.id} style={{ width: '18rem'}}>
                <Card.Img variant="top" src={item.image} width={150} height={200} style={{objectFit:"fill"}}/>
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
                        <Button className='btnadd' onClick={() => addCart(item)}>Add to cart</Button>
                      
                    </Container>
                  </Container> 
                </Card.Body>
              </Card>
              </motion.div>
            ))}
          </div>
          <hr />
        </motion.div>
      ))}
    </>
  );
};

export default Menu;
