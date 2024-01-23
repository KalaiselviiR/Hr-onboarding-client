import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { CiExport, CiCalendar } from 'react-icons/ci';
import { InputGroup, Row, Col, Button, Dropdown,Form } from 'react-bootstrap';
import { MdOutlineMail } from "react-icons/md";

import email_icon from '../../assets/gmail.jpg'
import password_icon from '../../assets/password.png'
import Logo from '../../assets/techjays.png'
import { loginHr } from '../../service/allapi';

function Login() {
  

  
  //create an object to store datas from input
  const [userData, setUser] = useState({
    email: "",
    password: ""

  })
    //object for useNavigate
const navigate=useNavigate()
   // a function to update userdata when user enter the input in html
const userDetails = (e) => {
  //prevent the event
  e.preventDefault()
  //access value to update in userData
  const { value } = e.target
  //access key to update in userData
  const key = e.target.name
  //update the data with existing data
  setUser({ ...userData, [key]: value })

}


const handleChange = async (e) => {
  e.preventDefault();

  const { email, password } = userData;

  // Email validation
  const emailRegex = /\b@techjays\.com$/;
  if (!emailRegex.test(email)) {
    toast.error('Invalid email address');
    return;
  }

  // Password validation
  if (password.length < 8) {
    toast.error('Password must be at least 8 characters long');
    return;
  }

  // API call
  try {
    const response = await loginHr(userData);
    console.log(response.data);

    if (response.status === 200) {
      if (response.data.message === "Login successful") {
        console.log(response.data.message);
        localStorage.setItem("email", email);
        toast.success(response.data.message);

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);

        let userId = response.data.session.userId;
        let userToken = response.data.session.token;
        localStorage.setItem("userId", userId);
        localStorage.setItem("userToken", userToken);
      } else {
        toast.error(response.data.message);
      }

      // Reset all states data
      setUser({
        email: "",
        password: ""
      });

      // Redirection to home
    } else {
      toast.error('Unexpected error occurred');
    }
  } catch (error) {
    console.error('API call failed', error);
    toast.error('Failed to login. Please try again later.');
  }
};


  return (
    <div className='header1'>
    <div className='Logo  '>
      
      <img className='logo-img' src={Logo} alt="Logo" />
     
    
    </div>
     <div className='header2'>
      
        <div className="subhead "><b>Log in to HR Portal</b>
        </div>
       
      
      <div  >
      <Form.Group className="mb-3" controlId="officialEmailAddress">
            <Form.Label className='labelss'>Email</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <MdOutlineMail  />
                </InputGroup.Text>
              <Form.Control onChange={userDetails} name='email' className='input-field' type="email" placeholder="Enter your email" />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="officialEmailAddress" >
            <Form.Label className='labelss'>Password</Form.Label>
            <InputGroup>
            
              <Form.Control onChange={userDetails} name='password' className='input-field' type="password" placeholder="Enter your password" />
            </InputGroup>
          </Form.Group>
          
       
      </div>
      <div className="forgot-password">
        <div className='password'>
        <a className='Frgtpass' href="/verify" >Forgot password?</a>
        </div>
       
        </div>
      <div className="submit-box">
      <Button
            style={{ backgroundColor: '#7F56D9', border: '10px' }}
            className='btn-login' onClick={handleChange}
          >
            Login
          </Button>
      </div>
      </div>
      
      <ToastContainer autoClose={800}  position="top-center" />
      </div>

  )
}
export default Login