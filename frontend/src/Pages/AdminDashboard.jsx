import {Container,Form,Button} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'


const AdminDashboard = () => {

  const [admindata,setData]=useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3300/api/v1/items/get/cat');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
},[]);




  return (
    <div>
      
      <AddProducts  admindata1={admindata} />
    
    </div>
  )
}

export default AdminDashboard





 const AddProducts = (props) => {

  const data=props.admindata1;
  return (
    <div>
        <Container >
                <Form > 
                        <Form.Group>
                          <Form.Label>Name</Form.Label>
                          <Form.Select>
                             {Object.keys(data).map(item=>(
                              <option key={item} value={item}>{item}</option>
                             ))}
                          </Form.Select>
                        </Form.Group>
                        <Button style={{float:'right'}}>Select</Button>
                </Form>
        </Container>
    </div>
  )
}
