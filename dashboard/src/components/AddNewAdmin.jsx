import React, { useContext } from 'react'
import {Context} from "../main";
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const AddNewAdmin = () => {

    const {isAuthenticated} = useContext(Context);

  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setphone]=useState("");
  const [nic,setNic]=useState("");
  const [dob,setDob]=useState("");
  const [gender,setGender]=useState("");
  const [password,setPassword]=useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
     try{
      const  response = await axios.post(
        "http://localhost:5000/api/v1/user/admin/addnew",
        {firstName,lastName,email,phone,nic,dob,gender,password},
        {withCredentials: true,
          headers:{"Content-Type":"application/json"},
        }
      );
      toast.success(response.data.message);
      // setIsAuthenticated(true);
      navigateTo("/"); // Navigate to the home page after successful login
    }catch(error){
      toast.error(error.response.data.message);
    }
  }
  
    if(!isAuthenticated){
      return <Navigate to="/login" />;
    }

  return (
    <>
    <section className='page'>
          <div className='container form-component add-admin-form'>
      {/* <img src="" alt="" /> */}
      <h1>ADD NEW ADMIN</h1>
      
      <form onSubmit={handleAddNewAdmin}>
        <div>
          <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
          <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
        </div>
        <div>
          <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="number" placeholder='Phone Number' value={phone} onChange={(e)=>setphone(e.target.value)} />
        </div>
        <div> 
           <input type="number" placeholder='NIC' value={nic} onChange={(e)=>setNic(e.target.value)} />
            <input type="date" placeholder='Date of Birth' value={dob} onChange={(e)=>setDob(e.target.value)} />
        </div>
        <div>
            <select value={gender} onChange={(e)=>setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
              <input type="text" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        
      <div style={{justifyContent:"center", alignItems:"center"}}>
        <button type="submit">ADD NEW ADMIN</button>

      </div>
       
        </form>
    </div>
    </section>
    </>
  )
}

export default AddNewAdmin