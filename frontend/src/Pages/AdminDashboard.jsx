import { Container, Form, Button,Row} from 'react-bootstrap';
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [disable,setdisable]=useState(false);

  const dropdown = (e) => {
    setCategory(e.target.value);
    setSelectedItem(null); // Reset selected item when category changes
  };

  const dropdown2 = (e) => {
    const selectedItemName = e.target.value;
    const selectedItemData = data[categoryitem].find(item => item.name === selectedItemName);
    setSelectedItem(selectedItemData);
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
            <Form.Select value={selectedItem?.name || ''} onChange={dropdown2}>
              <option>Select</option>
              {data[categoryitem] &&
                data[categoryitem].map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Container>
      {selectedItem && (
        <Container style={{ backgroundColor: 'grey', padding: '10px', marginTop: '10px' }}>
         
          <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100px', height: '100px' }} />
          <Form>
              <Form.Group as={Row}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={selectedItem.name} disabled={disable}/>
              </Form.Group>
              <Form.Group as={Row}>
                  <Form.Label>description</Form.Label>
                  <Form.Control type="text" value={selectedItem.description} disabled={disable}/>
              </Form.Group>
          </Form>
        </Container>
      )}
    </div>
  );
};
