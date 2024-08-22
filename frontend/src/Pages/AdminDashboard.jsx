import { Container, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [admindata, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3300/api/v1/items/get/cat');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <AddProducts admindata1={admindata} />
    </div>
  );
};

export default AdminDashboard;

const AddProducts = (props) => {
  const data = props.admindata1;
  const [categoryitem, setCategory] = useState(Object.keys(data)[0] || '');
  const [item,setitem]=useState()

  const dropdown = (e) => {
    setCategory(e.target.value);
  };
  const dropdown2 = (e) => {
   
  };

  return (
    <div>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select value={categoryitem} onChange={dropdown}>
            <option>Select</option>
              {Object.keys(data).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Container>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Food Name</Form.Label>
            <Form.Select placeholder='- - select- -' onchange={dropdown2}>
              
              {data[categoryitem] &&
                data[categoryitem].map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Container>
      <Container style={{backgroundColor:'grey'}}>
                
      </Container>
    </div>
  );
};
