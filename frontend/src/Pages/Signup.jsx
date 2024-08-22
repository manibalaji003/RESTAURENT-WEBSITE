import  { useState } from 'react'
import { Button, Container ,Row,Col,Form} from 'react-bootstrap'
import axios from 'axios'

const Signup = () => {

  const [userData,setUserData]=useState(
    {
      'name':'',
      'email':"",
      "password":"",
      "Apartment":"",
      "Street":"",
        "phone":"",
        "pincode":"",
        "city":'',

    }
  );

  const [confirmpass, setConfirmPass]=useState({'confirmpass':""});

const Alert =(a,b,c)=>{

      return (
        // eslint-disable-next-line no-undef
        Swal.fire({
          icon: a,
          title: b,
          text: c
        })
      );
};



  const Getnewdata=(e)=>{
       
    const {name,value}=e.target;
    setUserData(prevState => ({
        ...prevState,
        [name]: value
      }));
}

const Getconfirmpassword=(e)=>{
       
  const {name,value}=e.target;
  setConfirmPass(prevState => ({
      ...prevState,
      [name]: value
    }));
}





const checkpin=(data)=>{
  const param=new RegExp(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/);
  return param.test(data);
}

const checkphone = (data)=>{
  const param=new RegExp(/^[6-9]\d{9}$/);
  return param.test(data);
}

const handlingForm = async (e) =>{
  e.preventDefault();

  if(!userData.email || !userData.name || !userData.Apartment || !userData.Street || !userData.password || !userData.phone || !userData.pincode || !confirmpass.confirmpass){

    if(!userData.email){
        alert("Email must not be empty");
        return;
    }
    if(!userData.name){
      alert("name must not be empty")
      return;
  }
  if(!userData.password){
    alert("password must not be empty");
    return;
}
if(!confirmpass.confirmpass){
  alert("Confirm password must not be empty");
  return ;
}
if(userData.password != confirmpass.confirmpass){
  alert("password and confirm password must be same");
  return;
}

if(!userData.Apartment){
  alert("Apartment must not be empty");
  return;
}
if(!userData.Street){
  alert("street must not be empty");
  return;
}
if(!userData.city){
  alert("city must not be empty");
  return;
}
if(!userData.phone){
  alert("phone must not be empty");
  return;
}
if(!userData.pincode){
  alert("pincode must not be empty");
  return;
}


return;
  }


  if(!checkpin(userData.pincode)){
      alert("invalid pin");
      return ;
  }
  if(!checkphone(userData.phone)){
    alert("invalid phone number");
    return;
  }

  try{
    let response=await axios.post("http://localhost:3300/api/v1/users/register",userData);
    if(response.data.message=="User creation successful"){
    Alert("success",response.data.message,"Account is created successfully");
    }
    console.log(response.data);
    }catch(e){
      console.error(e);
    }
  
}

  return (
    <div>
            <Container  className='signupcontainer'>
                <center><h2>SIGN UP</h2></center>
              <Form onSubmit={handlingForm}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Username<super>*</super></Form.Label>
          <Form.Control type="text" placeholder="Enter name . . ."  name='name' value={userData.name}  onChange={Getnewdata}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridText">
          <Form.Label>Email<super>*</super></Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={userData.email} onChange={Getnewdata}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Password<super>*</super></Form.Label>
          <Form.Control type="password" placeholder="Enter Password" name='password' value={userData.password} onChange={Getnewdata}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Confirm Password<super>*</super></Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" name='confirmpass' value={confirmpass.confirmpass} onChange={Getconfirmpassword}/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Apartment<super>*</super></Form.Label>
        <Form.Control type='text' placeholder='Apartment . . . . ' name='Apartment' value={userData.Apartment} onChange={Getnewdata}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Street<super>*</super></Form.Label>
        <Form.Control  type='text' name="Street" value={userData.Street} onChange={Getnewdata}/>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City<super>*</super></Form.Label>
          <Form.Control type='text'  name='city' value={userData.city} onChange={Getnewdata}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Phone<super>*</super></Form.Label>
            <Form.Control type='phone' name='phone' value={userData.phone} onChange={Getnewdata}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Pincode<super>*</super></Form.Label>
          <Form.Control type='text' name='pincode' value={userData.pincode} onChange={Getnewdata}/>
        </Form.Group>
      </Row>

      
      <Container className='d-flex justify-content-end'> <Button variant="primary" type="submit">
        Create Account
      </Button></Container>
    
    </Form>
          
            </Container>
    </div>
  )
}

export default Signup