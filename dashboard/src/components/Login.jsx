import React,{useContext,useState} from 'react'
import {Context} from '../main'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
  const [confirmPassword, setConfirmPassword] =useState("");

  const navigateTo = useNavigate(); // Using useNavigate hook from react-router-dom

  const handleLogin = async (e) => {
    e.preventDefault();

      if (!email || !password || !confirmPassword) {
    toast.error("Please fill full form");
    return;
  }
  if (password !== confirmPassword) {
    toast.error("Password and Confirm Password do not match");
    return;
  }

    try{
      const  response = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        {email,password,confirmPassword,role:"Admin"},
        {withCredentials: true,
          headers:{"Content-Type":"application/json"},
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/"); // Navigate to the home page after successful login
    }catch(error){
      toast.error(error.response.data.message);
    }
  };
  if(isAuthenticated){
    return<Navigate to={"/"} />;

  }  
 

  return (
    <>
    <div className='container form-component'>
      {/* <img src="/logo.png" alt="logo" className='logo'/> */}
      <h1 className='form-title'> WELCOME TO AV-CARE </h1>
      <p>Only Admin Are Allowed TO Access These Resources!</p>
    <form onSubmit={handleLogin}>
      <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    autoComplete="email"
  />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    autoComplete="current-password"
  />

  <input
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    autoComplete="new-password"
  />
      
      <div style={{justifyContent:"center", alignItems:"center"}}>
        <button type="submit">Login</button>

      </div>
    </form>
    </div>
    </>
  );
};

export default Login;