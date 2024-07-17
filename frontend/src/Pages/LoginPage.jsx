import React, { useState } from 'react'
import Header from '../Components/Header'
import { Button, Container ,FloatingLabel,Form} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import UseSessionStorage from '../Hooks/Storage'
import Swal from 'sweetalert2'



const LoginPage = () => {



 // const [sessionStorageValue, setSessionStorageValue] = UseSessionStorage('mySessionStorageKey', 'default');  
    const [Lformdata,setFormData]=useState({
        'email':'',
        'password':""
    });
    const [InValid,setInvalid]=useState(false);
  //  const navigate=useNavigate()



    const Getdata=(e)=>{
       
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
        try{
        let response=await axios.post("http://localhost:3300/api/v1/users/login",Lformdata);
       // setSessionStorageValue(response.data)
      if(response.data.success===true){
       sessionStorage.setItem("Logintoken", JSON.stringify(response.data));
      }
      
     
        }catch(e){
          Swal.fire({
            title: "Error",
            text: "username or password in incorrect",
            icon: "error"
          });
        }

}

  return (
    <div>
         
            <Container className='logincontainer' >
               <center> <h2>LOGIN</h2></center><br/>
               <Form onSubmit={HandleFormData}>
            <FloatingLabel     label="Email address" className="mb-3">
                <Form.Control type="email" name='email'  value ={Lformdata.email} onChange={Getdata}/>
            </FloatingLabel>
           
            <FloatingLabel controlId="floatingPassword" label="Password" >
                <Form.Control type="password" placeholder="Password"  name='password' value={Lformdata.password} onChange={Getdata} />
            </FloatingLabel>
            <Button type='submit'>Enter</Button>
            {InValid && <p style={{color:'red'}}>Invalid Login credentials</p>}
            </Form>
            <center>Need an Account? <Link to={'/signup'}>Create account</Link> </center>
            </Container>
    </div>
  )
}

export default LoginPage