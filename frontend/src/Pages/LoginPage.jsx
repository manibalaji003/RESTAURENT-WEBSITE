import React, { useState } from 'react'
import Header from '../Components/Header'
import { Button, Container ,FloatingLabel,Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {

    const [Lformdata,setFormData]=useState({
        'email':'',
        'password':""
    });
    const [emailstatus ,setEmailstatus]=useState(false);
  //  const navigate=useNavigate()



    const Getdata=(e)=>{
        setEmailstatus(false);
        const {name,value}=e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
        //  console.log("hii");
    }

const HandleFormData = async (e) =>{
  //  console.log("aaa");
        e.preventDefault();
        if(!Lformdata.email || !Lformdata.password){
            
            console.log("input field must no be empty");
            return ;
        }

        let response=await axios.post("http://localhost:3300/api/user/login",Lformdata);
        
       
        console.log(response.data);


}

  return (
    <div>
            <Header />
            <Container className='logincontainer' >
               <center> <h2>LOGIN</h2></center><br/>
               <Form onSubmit={HandleFormData}>
            <FloatingLabel     label="Email address" className="mb-3">
                <Form.Control type="email" name='email'  value ={Lformdata.email} onChange={Getdata}/>
            </FloatingLabel>
            {emailstatus && <p style={{color:'red'}}>Invalid Email</p>}
            <FloatingLabel controlId="floatingPassword" label="Password" >
                <Form.Control type="password" placeholder="Password"  name='password' value={Lformdata.password} onChange={Getdata} />
            </FloatingLabel>
            <Button type='submit'>Enter</Button>
            </Form>
            <center>Need an Account? Create account </center>
            </Container>
    </div>
  )
}

export default LoginPage